import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ControlValueAccessor,
    FormsModule,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

export type ToggleVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

@Component({
    selector: 'app-toggle-button',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './toggle-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ToggleButtonComponent),
            multi: true,
        },
    ],
})
export class ToggleButtonComponent implements ControlValueAccessor {
    protected state = signal<boolean>(false);

    @Input()
    set checked(val: boolean) {
        this.state.set(val);
    }

    get checked(): boolean {
        return this.state();
    }

    @Input() labelTrue: string = '';
    @Input() labelFalse: string = '';
    @Input() variant: ToggleVariant = 'primary';
    
    isDisabled = signal<boolean>(false);

    @Output() checkedChange = new EventEmitter<boolean>();

    private onModelChange: (value: boolean) => void = () => {};
    private onModelTouched: () => void = () => {};

    public onChange(newState: boolean): void {
        this.state.set(newState);
        this.onModelChange(newState);
        this.onModelTouched();
        this.checkedChange.emit(newState);
    }

    public onToggle(event: Event): void {
        if (this.isDisabled()) return;
        const input = event.target as HTMLInputElement;
        this.onChange(input.checked);
    }

    writeValue(value: any): void {
        if (value !== undefined && value !== null) {
            this.state.set(!!value);
        }
    }

    registerOnChange(fn: any): void { this.onModelChange = fn; }
    registerOnTouched(fn: any): void { this.onModelTouched = fn; }
    setDisabledState(isDisabled: boolean): void { this.isDisabled.set(isDisabled); }

    get trackColorClass(): string {
        const variants: Record<ToggleVariant, string> = {
            primary: 'peer-checked:bg-primary dark:peer-checked:bg-primary',
            secondary: 'peer-checked:bg-secondary dark:peer-checked:bg-secondary',
            success: 'peer-checked:bg-green-custom dark:peer-checked:bg-green-500',
            warning: 'peer-checked:bg-orange-500 dark:peer-checked:bg-yellow-500',
            danger: 'peer-checked:bg-red-custom dark:peer-checked:bg-red-500',
            info: 'peer-checked:bg-azul-custom dark:peer-checked:bg-blue-500'
        };
        return variants[this.variant] || variants.primary;
    }

    get focusRingClass(): string {
        const rings: Record<ToggleVariant, string> = {
            primary: 'peer-focus:ring-primary-300 dark:peer-focus:ring-primary-700',
            secondary: 'peer-focus:ring-secondary-300 dark:peer-focus:ring-secondary-700',
            success: 'peer-focus:ring-green-custom/30',
            warning: 'peer-focus:ring-orange-500/30',
            danger: 'peer-focus:ring-red-custom/30',
            info: 'peer-focus:ring-azul-custom/30'
        };
        return rings[this.variant] || rings.primary;
    }
}