import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'app-autocomplete-field',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, AutoCompleteModule, TooltipModule],
    templateUrl: './autocomplete-field.component.html',
    styleUrl: './autocomplete-field.component.scss',
})
export class AutocompleteFieldComponent {
    /**
     * Formulario padre en el que se integra este campo.
     * Se espera que sea un FormGroup válido.
     */
    @Input() parentForm!: FormGroup;

    /**
     * Configuración del campo de autocompletado.
     * Define etiqueta, nombre de control y opciones adicionales.
     */
    @Input() config!: {
        label?: string;
        controlName: string;
        placeholder?: string;
        required?: boolean;
        field?: string;
        mapTipo?: string;
        mapNumero?: string;
        tooltipField?: string;
        truncate?: boolean;
        tooltip?: boolean;
        forceSelection?: boolean;
        preserveManualOnBlur?: boolean;
        /** Tooltip del label */
        labelTooltip?: string;

        /** Tooltip fijo del input */
        inputTooltip?: string;

        /** Mostrar tooltip con el valor actual del input */
        showValueTooltip?: boolean;

        /** Posición del tooltip */
        tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
    };

    /**
     * Lista de sugerencias que se muestran en el autocompletado.
     */
    @Input() suggestions: any[] = [];

    /**
     * Método que se ejecuta para completar las sugerencias.
     * Recibe el evento del componente AutoComplete.
     */
    @Input() completeMethod!: (event: any) => void;

    /**
     * Evento que se emite al seleccionar un ítem de la lista.
     */
    @Output() onSelectItem = new EventEmitter<any>();
    @Output() onDropdownRequest = new EventEmitter<void>();

    // === Getter para acceder al FormControl asociado ===
    get control(): FormControl {
        return this.parentForm.get(this.config.controlName) as FormControl;
    }

    /**
     * Indica si el control tiene errores y ya fue tocado o modificado.
     */
    get hasError(): boolean {
        return !!(
            this.control &&
            this.control.invalid &&
            (this.control.dirty || this.control.touched)
        );
    }

    /**
     * Indica si el error actual corresponde a un campo requerido.
     */
    get isRequiredError(): boolean {
        return !!(this.control?.hasError('required') && this.hasError);
    }

    onSelect(event: any): void {
        const item = event?.value ?? event;
        this.control.setValue(item, { emitEvent: false });
        this.onSelectItem.emit(item);
    }

    onDropdownClick(): void {
        this.onDropdownRequest.emit();
    }

    onBlur(): void {
        setTimeout(() => {
            const value = this.control.value;

            // Caso especial: permitir texto manual
            if (this.config.preserveManualOnBlur) {
                this.control.markAsTouched();
                return;
            }

            const esObjetoValido =
                value &&
                typeof value === 'object' &&
                Object.keys(value).length > 0;

            if (!esObjetoValido) {
                this.control.setValue(null);
            }

            this.control.markAsTouched();
        }, 150);
    }

    getDisplayValue(item: any): string {
        if (!item) return '';
        if (typeof item === 'string') return item;

        const field = this.config.field || 'descripcion';
        return item?.[field] ?? '';
    }

    getTooltipValue(item: any): string {
        if (!item || !this.config.tooltip) return '';
        if (typeof item === 'string') return item;

        const tooltipField =
            this.config.tooltipField || this.config.field || 'descripcion';
        return item?.[tooltipField] ?? '';
    }

    getInputTooltipValue(): string {
    if (this.config.showValueTooltip) {
        const value = this.control?.value;

        if (!value) return '';

        if (typeof value === 'string') return value;

        const tooltipField =
            this.config.tooltipField || this.config.field || 'descripcion';

        return value?.[tooltipField] ?? '';
    }

    return this.config.inputTooltip ?? '';
}
}