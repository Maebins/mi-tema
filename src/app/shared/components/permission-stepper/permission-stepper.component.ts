import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SliderModule } from 'primeng/slider';

export interface PermissionOption {
    label: string;
    value: number;
}

@Component({
    selector: 'app-permission-stepper',
    standalone: true,
    imports: [CommonModule, SliderModule, FormsModule],
    templateUrl: './permission-stepper.component.html',
    styleUrl: './permission-stepper.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PermissionStepperComponent),
            multi: true,
        },
    ],
})
export class PermissionStepperComponent implements ControlValueAccessor {
    @Input() label: string = '';
    @Input() options: PermissionOption[] = [];

    val: number = 0;
    isDisabled: boolean = false;

    onChange = (val: number) => {};
    onTouch = () => {};

    writeValue(value: number): void {
        if (value !== undefined) this.val = value;
    }

    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouch = fn; }
    setDisabledState(isDisabled: boolean): void { this.isDisabled = isDisabled; }

    onSliderChange(event: any) {
        this.val = event.value;
        this.onChange(this.val);
        this.onTouch();
    }

    onLabelClick(val: number) {
        if (this.isDisabled) return;
        this.val = val;
        this.onChange(this.val);
        this.onTouch();
    }

    get labelWidth(): string {
        return this.options.length > 0 ? `${100 / this.options.length}%` : '0%';
    }

    getTextClasses(optValue: number): string {

        if (this.val === optValue) {
            return 'font-bold text-primary dark:text-secondary';
        }
    
        if (this.val > optValue) {
           
            if (optValue === 0) return 'text-gray-scale-400 dark:text-gray-scale-500';
     
            return 'text-primary/80 dark:text-secondary/80';
        }

        return 'text-gray-scale-400 dark:text-gray-scale-500';
    }
}