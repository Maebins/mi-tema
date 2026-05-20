import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FormFieldComponent } from '../form-field/form-field.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TableColumn } from './table.types';
import { ButtonComponent } from '../button/button.component';
import { CheckBoxComponent } from '../check-box/check-box.component';
import { TableStatusChipComponent } from '../table-status-chip/table-status-chip.component';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        ButtonComponent,
        CheckBoxComponent,
        TableStatusChipComponent,
        FormsModule,
        FormFieldComponent,
        MatTooltipModule
    ],
    templateUrl: './table.component.html',
})
export class TableComponent {
    /** Columnas a mostrar en la tabla */
    @Input() columns: TableColumn[] = [];

    /** Datos a renderizar */
    @Input() data: any[] = [];

    /** Tipo de diseño visual */
    @Input() design: 'design1' | 'design2' = 'design1';

    /** Estado de carga de la tabla */
    @Input() loading: boolean = false;

    /** Activar columna de select personalizado */
    @Input() showSelectColumn = false;

    /** Título de la columna de select */
    @Input() selectColumnHeader: string = '';

    /** valor inicial */
    @Input() selectColumnField: string = '';

    /** Opciones del select (Ej: [{label: 'Bueno', value: 'B'}]) */
    @Input() selectOptions: any[] = [];

    /** Mostrar columna de estado */
    @Input() showStatusColumn = false;

    /** Tipo de columna de estado */
    @Input() statusColumnType: 'estado' | 'checkbox' | 'custom' = 'estado';

    /** Template personalizado */
    @Input() statusTemplate: any;

    /** Título de la columna de estado */
    @Input() statusColumnHeader: string = '';

    /** Evento checkbox */
    @Output() checkboxChange = new EventEmitter<{ row: any; value: boolean }>();

     /** Evento emitido al cambiar el valor del select */
    @Output() selectChange = new EventEmitter<{ row: any; value: any }>();

    /** Acciones disponibles en cada fila */
    @Input() actions: Array<
        | 'view'
        | 'edit'
        | 'delete'
        | 'agregarET'
        | 'disable'
        | 'print'
        | 'download'
    > = ['edit', 'delete'];

    /** Encabezado para columna de acciones */
    @Input() actionsHeader: string = '';

    @Output() onEdit = new EventEmitter<any>();
    @Output() onDelete = new EventEmitter<any>();
    @Output() onView = new EventEmitter<any>();
    @Output() onAgregarET = new EventEmitter<any>();
    @Output() onDisable = new EventEmitter<any>();
    @Output() onPrint = new EventEmitter<any>();
    @Output() onDownload = new EventEmitter<any>();

    /**
     * Emite el evento correspondiente según la acción de fila
     */
    emit(action: string, row: any) {
        switch (action) {
            case 'edit':
                this.onEdit.emit(row);
                break;
            case 'delete':
                this.onDelete.emit(row);
                break;
            case 'view':
                this.onView.emit(row);
                break;
            case 'agregarET':
                this.onAgregarET.emit(row);
                break;
            case 'disable':
                this.onDisable.emit(row);
                break;
            case 'print':
                this.onPrint.emit(row);
                break;
            case 'download':
                this.onDownload.emit(row);
                break;
        }
    }

    /** Evento emitido al editar una celda */
    @Output() cellEdit = new EventEmitter<{
        row: any;
        field: string;
        value: any;
    }>();

    /** Celda actualmente en edición */
    editingCell: { row: any; field: string } | null = null;

    /** Inicia edición de una celda */
    startEdit(row: any, field: string) {
        this.editingCell = { row, field };
    }

    /** Finaliza edición y emite el valor modificado */
    stopEdit(row: any, field: string) {
        this.cellEdit.emit({
            row,
            field,
            value: row[field],
        });
        this.editingCell = null;
    }

    /** Maneja el cambio de valor en el select y lo emite */
    onSelectValueChange(row: any, newValue: any) {
        if (this.selectColumnField) {
            row[this.selectColumnField] = newValue;
        }
        this.selectChange.emit({ row, value: newValue });
    }

    /** Inputs de paginacion */
    @Input() totalRecords = 0;
    @Input() page = 1;
    @Input() rowsPerPage = 10;
    @Output() pageChange = new EventEmitter<number>();
    @Output() rowsPerPageChange = new EventEmitter<number>();

    /** Calcula el total de páginas disponibles */
    get totalPages(): number {
        return Math.max(1, Math.ceil(this.totalRecords / this.rowsPerPage));
    }

    /** Cambia de página respetando límites y estado de carga */
    changePage(p: number) {
        if (p < 1 || p > this.totalPages || this.loading) return;
        this.pageChange.emit(p);
    }

    /** Actualiza la cantidad de filas por página y reinicia la paginación */
    updateRowsPerPage(value: number) {
        this.rowsPerPageChange.emit(Number(value));
        this.pageChange.emit(1);
    }

    /** Devuelve un array con las páginas visibles según la página actual V1 */
    getVisiblePages1(): number[] {
        if (this.totalPages <= 3) {
            return Array.from({ length: this.totalPages }, (_, i) => i + 1);
        }
        if (this.page === 1) {
            return [1, 2, 3];
        }
        if (this.page === this.totalPages) {
            return [this.totalPages - 2, this.totalPages - 1, this.totalPages];
        }
        return [this.page - 1, this.page, this.page + 1];
    }
    /** Devuelve un array con las páginas visibles según la página actual V2*/
    getVisiblePages(): (number | string)[] {
        const total = this.totalPages;
        const current = this.page;
        if (total <= 7) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }

        if (current <= 4) {
            return [1, 2, 3, '...', total];
        }

        if (current >= total - 3) {
            return [1, '...', total - 2, total - 1, total];
        }

        return [1, '...', current - 1, current, current + 1, '...', total];
    }

    /** Maneja el cambio de estado de un checkbox */
    onCheckboxChange(row: any, newValue: boolean) {
        row.checked = newValue;
        this.checkboxChange.emit({ row, value: newValue });
    }

    getDesignClasses() {
        const base = 'overflow-hidden rounded-xl border border-gray-scale-200 dark:border-dark-scale-700 shadow-sm ';
        const light = 'bg-white text-dark-scale ';
        const dark = 'dark:bg-dark-scale-900 dark:text-white-scale ';

        return {
            design1: `${base}${light}${dark}`,
            design2: `${base}${light}${dark}`,
        }[this.design];
    }

    
    getColumnStyles(col: TableColumn): Record<string, string> | null {
        if (!col.width) return null;

        return {
            width: col.width,
            maxWidth: col.width,
        };
    }
}
