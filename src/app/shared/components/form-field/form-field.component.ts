import { CommonModule } from '@angular/common';
import { Component, Input, Optional, Self , SimpleChanges,OnChanges } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { CustomFormField } from './form-field.types';
import { TooltipModule } from 'primeng/tooltip';
import { EventEmitter, Output } from '@angular/core';
import { Select } from 'primeng/select';
import { ViewChild } from '@angular/core';
@Component({
    selector: 'app-form-field',
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        SelectModule,
        TextareaModule,
        MultiSelectModule,
        KeyFilterModule,
        TooltipModule
    ],
    templateUrl: './form-field.component.html',
    styleUrl: './form-field.component.scss',
})
export class FormFieldComponent implements OnChanges {
    @Input({ required: true }) config!: CustomFormField;
    @Input() horizontal: boolean = false;
    @Input() fixedLabel: boolean = false;
    @Input() clear: boolean = false;

    inputId = `field-${Math.random().toString(36).substring(2, 9)}`;

    value: any = null;
    isDisabled: boolean = false;

    onChange = (_: any) => {};
    onTouched = () => {};

    @ViewChild('selectRef') selectRef!: Select;
  
    @Output() selectOpen = new EventEmitter<void>();

    constructor(@Self() @Optional() public ngControl: NgControl) {
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    get hasError(): boolean {
        return !!(
            this.ngControl?.invalid &&
            (this.ngControl?.dirty || this.ngControl?.touched)
        );
    }

    get isRequired(): boolean {
        if (this.config.required) return true;
        const control = this.ngControl?.control;
        if (control && control.validator) {
            const validator = control.validator({} as any);
            return validator && validator['required'];
        }
        return false;
    }

    writeValue(obj: any): void {
        this.value = this.normalizarValorSelectInput(obj);
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

   onModelChange(newValue: any) {
        let valorNormalizado = this.normalizarValorSelectInput(newValue);
        valorNormalizado = this.aplicarRestriccionesEntrada(valorNormalizado);
        this.value = valorNormalizado;
        this.onChange(valorNormalizado);
    }

    onBlur() {
        this.onTouched();
    }

    get errorMessage(): string | null {
    if (!this.ngControl?.errors) return null;

    const errors = this.ngControl.errors;

    if (!this.config?.errorMessages) return null;

    for (const key of Object.keys(errors)) {
        const message = this.config.errorMessages[key];
        if (message) {
            return message;
        }
    }

    return null;
}

private pendingOpen = false;

onSelectOpen() {
    if (!this.config?.reloadOnOpenIfEmpty) return;

    const opts = this.config?.options ?? [];
    if (opts.length > 0) return;

    this.pendingOpen = true;

    this.selectOpen.emit();
}

ngOnChanges() {
    const opts = this.config?.options ?? [];

    if (this.pendingOpen && opts.length > 0) {
        this.pendingOpen = false;

        queueMicrotask(() => {
        try {
            this.selectRef?.show?.();
        } catch {}
        });
    }}

    private normalizarValorSelectInput(value: any): any {
    if (this.config?.type === 'selectInput' && value === '') {
        return null;
    }
    return value;
    }

    private aplicarRestriccionesEntrada(value: any): any {
        const esCampoTexto =
            this.config?.type === 'text' || this.config?.type === 'textarea';

        if (!esCampoTexto) {
            return value;
        }

        let valor = String(value ?? '');

        if (this.config?.keyFilter === 'int') {
            valor = valor.replace(/\D/g, '');
        }

        if (this.config?.keyFilter === 'numericDash') {
            valor = valor.replace(/[^0-9-]/g, '');
        }

        if (this.config?.maxLength && this.config.maxLength > 0) {
            valor = valor.slice(0, this.config.maxLength);
        }

        return valor;
    }

    onKeyDownInput(event: KeyboardEvent): void {
        if (this.config?.keyFilter !== 'numericDash') return;

        const allowedKeys = [
            'Backspace',
            'Delete',
            'Tab',
            'Escape',
            'Enter',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown',
            'Home',
            'End',
        ];

        if (allowedKeys.includes(event.key) || event.ctrlKey || event.metaKey) {
            return;
        }

        const esNumero = /^[0-9]$/.test(event.key);
        const esGuion = event.key === '-';

        if (!esNumero && !esGuion) {
            event.preventDefault();
        }
    }

    onPasteInput(event: ClipboardEvent): void {
        if (this.config?.keyFilter !== 'numericDash') return;

        const texto = event.clipboardData?.getData('text') ?? '';

        if (!/^[0-9-]+$/.test(texto)) {
            event.preventDefault();
        }
    }
}
