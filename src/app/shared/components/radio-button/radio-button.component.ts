import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface RadioOption {
    label: string;
    value: any;
}

export type RadioVariant = 'primary' | 'secondary' | 'info';

@Component({
    selector: 'app-radio-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './radio-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioButtonComponent),
            multi: true,
        },
    ],
})
export class RadioButtonComponent implements ControlValueAccessor {
    @Input() items: RadioOption[] = [];

    @Input() groupName: string = `radio-group-${Math.random().toString(36).substring(2, 9)}`;
    
    @Input() color: RadioVariant = 'primary';
    @Input() layout: 'row' | 'col' = 'row'; 

    value: any = null;
    isDisabled: boolean = false;

    onChange = (_: any) => {};
    onTouched = () => {};

    writeValue(obj: any): void { this.value = obj; }
    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouched = fn; }
    setDisabledState?(isDisabled: boolean): void { this.isDisabled = isDisabled; }

    onSelect(newValue: any) {
        if (this.isDisabled) return;
        this.value = newValue;
        this.onChange(newValue);
        this.onTouched();
    }
    
    getColorClasses(): string {
        const variants = {
            primary: 'border-primary text-primary',
            secondary: 'border-secondary text-secondary',
            info: 'border-azul-custom text-azul-custom'
        };
        return variants[this.color] || variants.primary;
    }
}