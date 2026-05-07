import { CommonModule } from '@angular/common';
import { Component, computed, forwardRef, Input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UploadImageCropperDialogComponent } from '../upload-image-cropper-dialog/upload-image-cropper-dialog.component';

export type ImageValue = File | string;

interface ImageItem {
    id: string;
    type: 'NEW' | 'EXISTING';
    previewUrl: SafeUrl | string;
    originalFile?: File;
    finalFile?: File;
}

@Component({
    selector: 'app-upload-image',
    standalone: true,
    imports: [CommonModule, MatTooltipModule, MatDialogModule],
    templateUrl: './upload-image.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UploadImageComponent),
            multi: true,
        },
    ],
})
export class UploadImageComponent implements ControlValueAccessor {
    // aDefine la cantidad de fotos que puede recibir si es 0 es ilimitado
    @Input() maxFiles: number = 0;

    images = signal<ImageItem[]>([]);

    onChange = (value: ImageValue[]) => {};
    onTouched = () => {};
    isDisabled = false;

    constructor(
        private dialog: MatDialog,
        private sanitizer: DomSanitizer
    ) {}

    writeValue(value: ImageValue[]): void {
        if (!value || !Array.isArray(value)) {
            this.images.set([]);
            return;
        }

        const initialItems: ImageItem[] = value
            .map((item) => {
                if (item instanceof File) {
                    return {
                        id: this.generateId(),
                        type: 'NEW',
                        previewUrl: this.sanitizer.bypassSecurityTrustUrl(
                            URL.createObjectURL(item)
                        ),
                        originalFile: item,
                        finalFile: item,
                    };
                } else if (typeof item === 'string') {
                    return {
                        id: this.generateId(),
                        type: 'EXISTING',
                        previewUrl: item,
                    };
                }
                return null;
            })
            .filter((i) => i !== null) as ImageItem[];

        this.images.set(initialItems);
    }

    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouched = fn; }
    setDisabledState?(isDisabled: boolean): void { this.isDisabled = isDisabled; }

    isFull = computed(() => {
        if (this.maxFiles === 0) return false;
        return this.images().length >= this.maxFiles;
    });

    fileChangeEvent(event: any): void {
        if (this.isDisabled) return;

        if (this.isFull()) {
            event.target.value = '';
            return;
        }

        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const element = event.currentTarget as HTMLInputElement;
            
            if (!file.type.startsWith('image/')) {
                alert('El archivo seleccionado no es una imagen.');
                element.value = ''; 
                return;
            }

            this.openCropperDialog({ imageChangedEvent: event, imageFile: file }, file, false);
            event.target.value = '';
        }
    }

    openCropperDialog(data: any, originalFile: File, isEditing: boolean, index: number = -1) {
        const dialogRef = this.dialog.open(UploadImageCropperDialogComponent, {
            data: data,
            width: '500px',
            maxWidth: '95vw',
            disableClose: true,
            panelClass: 'custom-dialog-container',
        });

        dialogRef.afterClosed().subscribe((result: ImageCroppedEvent) => {
            if (result && result.blob && result.objectUrl) {
                const fileToSend = new File([result.blob], originalFile.name, {
                    type: result.blob.type,
                    lastModified: Date.now(),
                });

                const newItem: ImageItem = {
                    id: this.generateId(),
                    type: 'NEW',
                    originalFile: originalFile,
                    finalFile: fileToSend,
                    previewUrl: this.sanitizer.bypassSecurityTrustUrl(result.objectUrl),
                };

                this.images.update((current) => {
                    if (isEditing && index > -1) {
                        const list = [...current];
                        list[index] = newItem;
                        return list;
                    }
                    return [...current, newItem];
                });

                this.emitImages();
            }
        });
    }

    editImage(index: number) {
        if (this.isDisabled) return;
        const item = this.images()[index];
        if (item.type === 'EXISTING') return;

        if (item.originalFile) {
            this.openCropperDialog({ imageFile: item.originalFile }, item.originalFile, true, index);
        }
    }

    removeImage(index: number) {
        if (this.isDisabled) return;
        this.images.update((list) => list.filter((_, i) => i !== index));
        this.emitImages();
    }

    formatBytes(bytes?: number) {
        if (bytes === undefined || isNaN(bytes)) return '';
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    private emitImages() {
        this.onTouched();
        const output = this.images().map((img) => {
            return img.type === 'NEW' ? img.finalFile : img.previewUrl;
        });
        this.onChange(output as ImageValue[]);
    }

    private generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
}