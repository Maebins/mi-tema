import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appMaxLength]',
    standalone: true,
})
export class MaxLengthDirective {
    @Input('appMaxLength') limit!: number | string;

    constructor(private ngControl: NgControl) {}

    @HostListener('input', ['$event']) onInput(event: any) {
        const input = event.target as HTMLInputElement;
        const max = Number(this.limit);

        if (!max) return;

        if (input.value.length > max) {
            const cleanValue = input.value.slice(0, max);

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
