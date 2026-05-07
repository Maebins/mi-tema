import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-search-bar',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './search-bar.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SearchBarComponent),
            multi: true,
        },
    ],
})
export class SearchBarComponent implements ControlValueAccessor {
    @Input() placeholder: string = 'Buscar...';
    @Input() showButton: boolean = false;
    @Input() buttonText: string = 'Buscar';

    @Output() search = new EventEmitter<string>();

    value: string = '';
    isDisabled: boolean = false;

    onChange = (_: any) => {};
    onTouched = () => {};

    writeValue(val: string): void { 
        this.value = val || ''; 
    }
    
    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouched = fn; }
    setDisabledState(isDisabled: boolean): void { this.isDisabled = isDisabled; }

    onInput() {
        this.onChange(this.value);
        this.onTouched();
        this.search.emit(this.value);
    }

    onAction() {
        this.search.emit(this.value);
    }
}