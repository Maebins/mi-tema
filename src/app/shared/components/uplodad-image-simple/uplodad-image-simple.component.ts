import { CommonModule } from '@angular/common';
import {
    Component,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadImageCropperDialogComponent } from '../upload-image-cropper-dialog/upload-image-cropper-dialog.component';

@Component({
    selector: 'app-uplodad-image-simple',
    standalone: true,
    imports: [CommonModule], 
    templateUrl: './uplodad-image-simple.component.html'
})
export class UplodadImageSimpleComponent {
    @Output() imagenProcesada = new EventEmitter<File>();
    @Input() maxSizeMB: number = 5;

    @ViewChild('galleryInput') galleryInput!: ElementRef<HTMLInputElement>;
    @ViewChild('cameraInput') cameraInput!: ElementRef<HTMLInputElement>;

    public mostrarMenu: boolean = false;
    private _matDialog = inject(MatDialog);

    public abrirSelector(): void {
        const esMobileOTablet = window.innerWidth < 1024;

        if (esMobileOTablet) {
            this.mostrarMenu = true;
        } else {
            this.galleryInput.nativeElement.click();
        }
    }

    public seleccionarOpcion(origen: 'camara' | 'galeria'): void {
        this.mostrarMenu = false;

        setTimeout(() => {
            if (origen === 'camara') {
                this.cameraInput.nativeElement.click();
            } else {
                this.galleryInput.nativeElement.click();
            }
        }, 0);
    }

    onFileSelected(event: Event): void {
        const element = event.currentTarget as HTMLInputElement;
        const fileList: FileList | null = element.files;

        if (fileList && fileList.length > 0) {
            const originalFile = fileList[0];

            if (!originalFile.type.startsWith('image/')) {
                alert('El archivo seleccionado no es una imagen.');
                element.value = '';
                return;
            }

            const fileSizeInMB = originalFile.size / (1024 * 1024);
            if (fileSizeInMB > this.maxSizeMB) {
                alert(`El archivo es demasiado pesado. El límite es ${this.maxSizeMB}MB.`);
                element.value = '';
                return;
            }

            this.abrirModalRecorte(originalFile);
        }
        element.value = '';
    }

    private abrirModalRecorte(originalFile: File): void {
        const dialogRef = this._matDialog.open(
            UploadImageCropperDialogComponent,
            {
                data: { imageFile: originalFile },
                width: '500px',
                maxWidth: '95vw',
                disableClose: true,
                panelClass: 'custom-dialog-container',
            }
        );

        dialogRef.afterClosed().subscribe((result: any) => {
            if (result && result.blob) {
                const fileFinal = new File([result.blob], originalFile.name, {
                    type: result.blob.type,
                    lastModified: Date.now(),
                });
                this.imagenProcesada.emit(fileFinal);
            }
        });
    }
}