import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    templateUrl: './button.component.html'
})
export class ButtonComponent {
    @Input() label: string | undefined;
    @Input() icon: string | undefined;
    @Input() severity: 'success' | 'info' | 'warn' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' | null = null;
    @Input() outlined: boolean = false;
    @Input() text: boolean = false;
    @Input() raised: boolean = false;
    @Input() rounded: boolean = false;
    @Input() disabled: boolean = false;
    @Input() type: string = 'button';
    @Input() fullWidth: boolean = false;
    @Input() styleClass: string = '';

    @Output() onClick = new EventEmitter<any>();
}