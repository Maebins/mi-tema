import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip'; 

export type FileValue = File | string;

@Component({
    selector: 'app-file-upload',
    standalone: true,
    imports: [CommonModule, TooltipModule],
    templateUrl: './file-upload.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FileUploadComponent),
            multi: true,
        },
    ],
})
export class FileUploadComponent implements ControlValueAccessor {

    @Input() label: string = 'Subir Archivos';
    @Input() allowedTypes: string = '.pdf,.doc,.docx,.xls,.xlsx';
    @Input() maxSizeMB: number = 5; 
    @Input() multiple: boolean = false;

    @Input() set disabled(value: boolean) {
        this.isDisabled = value;
    }
    isDisabled = false;

    files = signal<FileValue[]>([]);
    errorMessage = signal<string>('');

    onChange = (value: FileValue[] | FileValue | null) => {};
    onTouched = () => {};

    writeValue(value: any): void {
        if (value) {
            this.files.set(Array.isArray(value) ? value : [value]);
        } else {
            this.files.set([]);
        }
    }

    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouched = fn; }
    setDisabledState?(isDisabled: boolean): void { this.isDisabled = isDisabled; }

    onFileSelected(event: any) {
        if (this.isDisabled) return;
        this.errorMessage.set('');

        const rawFiles: FileList = event.target.files;
        if (!rawFiles || rawFiles.length === 0) return;

        const validFiles: File[] = [];

        for (let i = 0; i < rawFiles.length; i++) {
            const file = rawFiles[i];

            const fileSizeMB = file.size / 1024 / 1024;
            if (fileSizeMB > this.maxSizeMB) {
                this.errorMessage.set(
                    `El archivo "${file.name}" excede los ${this.maxSizeMB}MB permitidos.`
                );
                continue;
            }
            validFiles.push(file);
        }

        if (validFiles.length > 0) {
            this.files.update((current) => {
                if (this.multiple) {
                    return [...current, ...validFiles];
                } else {
                    return [validFiles[0]];
                }
            });
            this.emitValues();
        }
        event.target.value = '';
    }

    removeFile(index: number) {
        if (this.isDisabled) return;
        this.files.update((list) => list.filter((_, i) => i !== index));
        this.emitValues();
    }

    getFileIcon(item: FileValue): string {
        let name = '';
        if (item instanceof File) {
            name = item.name.toLowerCase();
        } else if (typeof item === 'string') {
            name = item.toLowerCase();
        }

        if (name.endsWith('.pdf')) return 'pi-file-pdf text-red-500';
        if (name.endsWith('.doc') || name.endsWith('.docx')) return 'pi-file-word text-blue-500';
        if (name.endsWith('.xls') || name.endsWith('.xlsx')) return 'pi-file-excel text-green-custom';
        if (name.endsWith('.zip') || name.endsWith('.rar')) return 'pi-box text-yellow-500';
        if (name.endsWith('.png') || name.endsWith('.jpg')) return 'pi-image text-purple-500';
        return 'pi-file text-gray-scale-500';
    }

    getFileName(item: FileValue): string {
        if (item instanceof File) return item.name;
        if (typeof item === 'string') return item.split('/').pop() || 'Archivo remoto';
        return 'Archivo desconocido';
    }

    getFileSize(item: FileValue): string {
        if (item instanceof File) {
            const bytes = item.size;
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return (parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]);
        }
        return 'En servidor';
    }

    private emitValues() {
        this.onTouched();
        const currentFiles = this.files();
        if (!this.multiple && currentFiles.length > 0) {
            this.onChange(currentFiles[0]);
        } else {
            this.onChange(currentFiles.length > 0 ? currentFiles : null);
        }
    }
}