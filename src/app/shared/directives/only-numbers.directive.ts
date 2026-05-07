import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appOnlyNumbers]',
})
export class OnlyNumbersDirective {
    constructor(private ngControl: NgControl) {}

    @HostListener('input', ['$event']) onInputChange(event: any) {
        const input = event.target as HTMLInputElement;

        const initialValue = input.value;
        const cleanValue = initialValue.replace(/[^0-9]*/g, '');

        if (initialValue !== cleanValue) {
            input.value = cleanValue;

            if (this.ngControl && this.ngControl.control) {
                this.ngControl.control.setValue(cleanValue, {
                    emitEvent: false,
                });
            }

            event.stopPropagation();
        }
    }
}
