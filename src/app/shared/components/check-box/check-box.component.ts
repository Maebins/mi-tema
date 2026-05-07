import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type CheckboxVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

@Component({
    selector: 'app-check-box',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './check-box.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckBoxComponent),
            multi: true,
        },
    ],
})
export class CheckBoxComponent implements ControlValueAccessor {
    @Input() label: string = '';
    @Input() color: CheckboxVariant = 'primary';
    
    @Output() valueChange = new EventEmitter<boolean>();

    value: boolean = false;
    isDisabled: boolean = false;

    onChange = (_: any) => {};
    onTouched = () => {};

    writeValue(obj: any): void {
        this.value = !!obj;
    }

    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouched = fn; }
    setDisabledState(isDisabled: boolean): void { this.isDisabled = isDisabled; }

    onNativeChange(event: Event) {
        const input = event.target as HTMLInputElement;
        const newValue = input.checked;

        this.value = newValue;
        this.onChange(newValue);
        this.onTouched();
        this.valueChange.emit(newValue);
    }

    getBoxClasses(): string {
        const baseUnchecked = 'border-gray-scale-700 bg-white dark:border-gray-scale-400 dark:bg-dark-scale-800';

        if (!this.value) {
            return `${baseUnchecked} group-hover:border-gray-scale-400 dark:group-hover:border-gray-scale-300`;
        }

        const checkedClasses: Record<CheckboxVariant, string> = {
            primary: 'bg-primary border-primary', // Tu Guinda
            secondary: 'bg-secondary border-secondary', // Tu Dorado
            success: 'bg-green-custom border-green-custom',
            error: 'bg-red-custom border-red-custom',
            warning: 'bg-yellow-custom border-yellow-custom',
            info: 'bg-azul-custom border-azul-custom',
        };

        return checkedClasses[this.color] || checkedClasses.primary;
    }
}