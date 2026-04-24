import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFieldComponent } from '../../../shared/components/search-field/search-field.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
    selector: 'app-search-widget',
    standalone: true,
    imports: [CommonModule, SearchFieldComponent, ModalComponent],
    templateUrl: './search-widget.component.html',
})
export class SearchWidgetComponent {
    isSearchModalVisible: boolean = false;

    abrirBusqueda() {
        this.isSearchModalVisible = true;
    }

    ejecutarBusqueda(termino: string) {
        console.log('Buscando desde el widget:', termino);
        this.isSearchModalVisible = false; // Cierra el modal al buscar
    }
}
