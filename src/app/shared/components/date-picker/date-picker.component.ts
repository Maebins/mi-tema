import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, inject, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'app-date-picker',
    standalone: true,
    imports: [CommonModule, FormsModule, DatePickerModule],
    templateUrl: './date-picker.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatePickerComponent),
            multi: true,
        },
    ],
})
export class DatePickerComponent implements ControlValueAccessor {
    private cd = inject(ChangeDetectorRef);
 
    @Input() label?: string;
    @Input() horizontal: boolean = false;
    @Input() fixedLabel: boolean = false;
    @Input() placeholder: string = 'Selecciona una fecha';
    @Input() error: boolean = false;
    @Input() styleClass: string = '';
    @Input() minDate?: Date;
    @Input() maxDate?: Date;

    @Input() showTime: boolean = false; 
    @Input() timeOnly: boolean = false; 
    @Input() hourFormat: string = '24';
    @Input() showSeconds: boolean = false;

    @Output() dateChange = new EventEmitter<Date>();

    value: Date | null = null;
    isDisabled: boolean = false;

    onChange = (_: any) => {};
    onTouched = () => {};

    writeValue(obj: any): void {
        if (obj) {
            this.value = obj instanceof Date ? obj : new Date(obj);
        } else {
            this.value = null;
        }
        this.cd.markForCheck();
    }

    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouched = fn; }
    setDisabledState(isDisabled: boolean): void { this.isDisabled = isDisabled; }

    onSelect(value: Date) {
        this.value = value;
        this.onChange(value);
        this.onTouched(); 
        this.dateChange.emit(value);
    }

    onBlur() {
        this.onTouched();
    }
}