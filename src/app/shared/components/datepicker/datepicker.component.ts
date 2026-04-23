import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'app-datepicker',
    standalone: true,
    imports: [CommonModule, FormsModule, DatePickerModule],
    templateUrl: './datepicker.component.html',
    styleUrl: './datepicker.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatepickerComponent),
            multi: true,
        },
    ],
})
export class DatepickerComponent implements ControlValueAccessor {
    @Input() placeholder: string = 'Seleccione una fecha';
    @Input() dateFormat: string = 'dd/mm/yy';
    @Input() showIcon: boolean = true;
    @Input() selectionMode: 'single' | 'multiple' | 'range' = 'single';
    @Input() disabled: boolean = false;
    @Input() minDate?: Date;
    @Input() maxDate?: Date;

    value: any = null;

    onChange = (value: any) => {};
    onTouched = () => {};

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onDateChange(value: any) {
        this.value = value;
        this.onChange(value);
    }

    onBlur() {
        this.onTouched();
    }
}
