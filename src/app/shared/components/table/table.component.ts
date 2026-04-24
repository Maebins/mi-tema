import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { TableColumn } from './table.models';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SearchFieldComponent } from '../search-field/search-field.component';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, SearchFieldComponent],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
})
export class TableComponent {
    // Datos y Columnas
    @Input() data: any[] = [];
    @Input() columns: TableColumn[] = [];
    @Input() title: string = 'Listado de Registros';

    // Configuraciones Visuales (El usuario decide qué encender)
    @Input() paginator: boolean = true;
    @Input() rows: number = 10;
    @Input() showGlobalFilter: boolean = true;
    @Input() showSelection: boolean = false;
    @Input() showActions: boolean = true;

    // Campos por los que el buscador global buscará (ej: ['nombre', 'email'])
    @Input() globalFilterFields: string[] = [];

    // Emisores de Eventos para el componente Padre
    @Output() onEdit = new EventEmitter<any>();
    @Output() onDelete = new EventEmitter<any>();
    @Output() onSelectionChange = new EventEmitter<any[]>();

    @ContentChild('actionTemplate') actionTemplate!: TemplateRef<any>;

    // Guarda los elementos seleccionados temporalmente
    selectedItems: any[] = [];
}
