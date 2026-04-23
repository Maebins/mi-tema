import { Component, inject, OnInit } from '@angular/core';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { SearchFieldComponent } from '../../shared/components/search-field/search-field.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableColumn } from '../../shared/components/table/table.models';
import { TableComponent } from '../../shared/components/table/table.component';
import { DatepickerComponent } from '../../shared/components/datepicker/datepicker.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { SkeletonTableComponent } from '../../shared/components/skeleton-table/skeleton-table.component';
import { OverlayLoaderComponent } from '../../shared/components/overlay-loader/overlay-loader.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
@Component({
    selector: 'app-dashboard',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormFieldComponent,
        InputTextModule,
        SearchFieldComponent,
        TableComponent,
        DatepickerComponent,
        ButtonComponent,
        OverlayLoaderComponent,
        SkeletonTableComponent,
        ModalComponent,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
    private fb = inject(FormBuilder);

    // Estados de carga
    isDashboardLoading = true;
    isSaving = false;
    isTableLoading = true;
    isModalVisible = false;

    // Creamos el formulario y le aplicamos los Validators
    userForm: FormGroup = this.fb.group({
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        telefono: [''], // Este campo es opcional, no tiene Validators
        fechaNacimiento: ['', Validators.required],
        rangoFechas: [''],
        fechasMultiples: [''],
    });

    ngOnInit() {
        // Simulamos la carga inicial de todo el dashboard por 2 segundos
        setTimeout(() => {
            this.isDashboardLoading = false;
        }, 2000);

        // Simulamos que la tabla está cargando datos del backend por 2.5 segundos
        setTimeout(() => {
            this.isTableLoading = false;
        }, 2500);
    }

    guardar() {
        if (this.userForm.valid) {
            this.isSaving = true;
            console.log('Datos a guardar:', this.userForm.value);
            
            // Simulamos el tiempo de respuesta del servidor (2 segundos)
            setTimeout(() => {
                this.isSaving = false;
                this.userForm.reset();
            }, 2000);
        } else {
            // Si el usuario intenta guardar con errores, forzamos a que se pinten de rojo
            this.userForm.markAllAsTouched();
        }
    }
    buscarUsuario(event: any) {}

    abrirModal() {
        this.isModalVisible = true;
    }

    cerrarModal() {
        this.isModalVisible = false;
    }

    // Describes las columnas una sola vez
    misColumnas: TableColumn[] = [
        { field: 'codigo', header: 'Código', sortable: true, width: '100px' },
        { field: 'nombre', header: 'Nombre Completo', sortable: true },
        { field: 'precio', header: 'Precio', type: 'currency', sortable: true },
        { field: 'estado', header: 'Estado', type: 'boolean' },
    ];

    // Datos simulados (Vendrían de tu backend)
    misDatos = [
        { codigo: 'P001', nombre: 'Laptop Asus', precio: 1200, estado: true },
        { codigo: 'P002', nombre: 'Mouse Ugreen', precio: 25, estado: true },
        { codigo: 'P003', nombre: 'Monitor Samsung', precio: 350, estado: false },
    ];

    // Métodos que reciben la fila seleccionada
    editar(fila: any) {
        console.log('Editando:', fila);
    }
    eliminar(fila: any) {
        console.log('Eliminar:', fila);
    }
    seleccionMultiple(filas: any[]) {
        console.log('Items seleccionados para borrar en bloque:', filas);
    }
}
