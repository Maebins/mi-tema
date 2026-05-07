import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog'; 
import { ModalData } from './dialog.types';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'app-dialog',
    standalone: true, 
    imports: [DialogModule, ButtonComponent],
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
    @Input() visible: boolean = false;
    @Output() visibleChange = new EventEmitter<boolean>();

    @Input({ required: true }) config!: ModalData;

    @Output() onSave = new EventEmitter<void>();

    constructor() {}

    updateVisibility(state: boolean) {
        this.visible = state;
        this.visibleChange.emit(state);
    }
    
    save() {
        this.onSave.emit();
    }
}