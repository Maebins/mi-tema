import { CommonModule } from '@angular/common';
import { Component, Inject, signal, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { ButtonComponent } from '../button/button.component';

export interface DialogData {
    imageChangedEvent?: any; 
    imageFile?: File; 
}

@Component({
    selector: 'app-upload-image-cropper-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        ImageCropperComponent,
        ButtonComponent, 
    ],
    templateUrl: './upload-image-cropper-dialog.component.html',
    encapsulation: ViewEncapsulation.None
})
export class UploadImageCropperDialogComponent {
    isLoading = signal<boolean>(true);
    croppedResult: any = null;

    constructor(
        public dialogRef: MatDialogRef<UploadImageCropperDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    imageCropped(event: ImageCroppedEvent) {
        this.croppedResult = event;
    }

    imageLoaded() {
        this.isLoading.set(false);
    }

    loadImageFailed() {
        this.isLoading.set(false);
        console.error('Fallo al cargar imagen en cropper');
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    save(): void {
        this.dialogRef.close(this.croppedResult);
    }
}