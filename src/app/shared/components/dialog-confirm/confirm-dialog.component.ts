import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [CommonModule, ConfirmDialogModule, ButtonComponent],
    templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {
    // Útil si necesitas múltiples dialogos de confirmación en una misma vista
    @Input() key?: string;
}