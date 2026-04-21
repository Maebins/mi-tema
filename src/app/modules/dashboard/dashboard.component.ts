import { Component, inject } from '@angular/core';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { SearchFieldComponent } from '../../shared/components/search-field/search-field.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableColumn } from '../../shared/components/table/table.models';
import { TableComponent } from '../../shared/components/table/table.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent, InputTextModule, ButtonModule,SearchFieldComponent, TableComponent ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private fb = inject(FormBuilder);

  // Creamos el formulario y le aplicamos los Validators
  userForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: [''] // Este campo es opcional, no tiene Validators
  });

  guardar() {
    if (this.userForm.valid) {
      console.log('Datos a guardar:', this.userForm.value);
    } else {
      // Si el usuario intenta guardar con errores, forzamos a que se pinten de rojo
      this.userForm.markAllAsTouched();
    }
  }
  buscarUsuario(event: any){}


  // Describes las columnas una sola vez
  misColumnas: TableColumn[] = [
    { field: 'codigo', header: 'Código', sortable: true, width: '100px' },
    { field: 'nombre', header: 'Nombre Completo', sortable: true },
    { field: 'precio', header: 'Precio', type: 'currency', sortable: true },
    { field: 'estado', header: 'Estado', type: 'boolean' }
  ];

  // Datos simulados (Vendrían de tu backend)
  misDatos = [
    { codigo: 'P001', nombre: 'Laptop Asus', precio: 1200, estado: true },
    { codigo: 'P002', nombre: 'Mouse Ugreen', precio: 25, estado: true },
    { codigo: 'P003', nombre: 'Monitor Samsung', precio: 350, estado: false }
  ];

  // Métodos que reciben la fila seleccionada
  editar(fila: any) { console.log('Editando:', fila); }
  eliminar(fila: any) { console.log('Eliminar:', fila); }
  seleccionMultiple(filas: any[]) { console.log('Items seleccionados para borrar en bloque:', filas); }
}
