import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

export type VerificationColor = 'secondary' | 'primary' | 'success' | 'info' | 'error' | 'surface';

@Component({
    selector: 'app-check-box-verification',
    standalone: true,
    imports: [CommonModule, FormsModule], 
    templateUrl: './check-box-verification.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckBoxVerificationComponent),
            multi: true,
        },
    ],
})
export class CheckBoxVerificationComponent implements ControlValueAccessor {
    @Input() color: VerificationColor = 'secondary';
    @Input() size: 'sm' | 'md' | 'lg' = 'md';

    @Output() valueChange = new EventEmitter<boolean>();

    value = false;
    isDisabled = false;

    private onChange = (_: boolean) => {};
    private onTouched = () => {};

    writeValue(value: boolean | null): void {
        this.value = !!value;
    }

    registerOnChange(fn: (value: boolean) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
    setDisabledState(isDisabled: boolean): void { this.isDisabled = isDisabled; }

    onInputChange(event: Event): void {
        if (this.isDisabled) return;

        const checked = (event.target as HTMLInputElement).checked;
        this.value = checked;

        this.onChange(checked);
        this.onTouched();
        this.valueChange.emit(checked);
    }

    /* ================= TAMAÑOS ================= */

    get boxSize(): string {
        return {
            sm: 'w-4 h-4',
            md: 'w-5 h-5',
            lg: 'w-6 h-6',
        }[this.size];
    }

    get iconSize(): string {
        return {
            sm: 'text-[10px]',
            md: 'text-[12px]',
            lg: 'text-[14px]',
        }[this.size];
    }

    /* ================= COLORES (MODO OUTLINED) ================= */

    getColorClasses(): string {

        if (!this.value) {
            return 'border-gray-scale-300 dark:border-gray-scale-500 group-hover:border-gray-scale-400 dark:group-hover:border-gray-scale-400 text-transparent';
        }

        const variants = {
            secondary: 'border-secondary text-secondary',
            primary: 'border-primary text-primary',       
            success: 'border-green-custom text-green-custom',
            info: 'border-azul-custom text-azul-custom',
            error: 'border-red-custom text-red-custom',
            surface: 'border-gray-scale-400 text-gray-scale-600 dark:border-gray-scale-300 dark:text-gray-scale-300'
        };

        return variants[this.color] || variants.secondary;
    }
}