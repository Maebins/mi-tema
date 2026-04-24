import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [CommonModule, DialogModule],
    templateUrl: './modal.component.html',
})
export class ModalComponent {
    @Input() visible: boolean = false;
    @Input() header: string = '';
    @Input() width: string = '50vw';
    @Input() closable: boolean = true;
    @Input() modal: boolean = true; // Si es true, oscurece el fondo y bloquea
    @Input() styleClass: string = '';

    @Output() visibleChange = new EventEmitter<boolean>();
}
