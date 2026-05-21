import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CustomFormField } from '../../../shared/components/form-field/form-field.types';
import { ModalData } from '../../../shared/components/dialog/dialog.types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';

@Component({
  selector: 'app-personas',
  standalone: true,
  imports: [ButtonComponent,CommonModule, FormsModule, DialogComponent, FormFieldComponent],
  templateUrl: './personas.component.html',
  styleUrl: './personas.component.scss',
})
export class PersonasComponent {
  // ================= DATA DE LA TABLA =================
  personas = [
    { initials: 'JM', bg: 'bg-[#f59e0b]', nombre: 'José Mendoza Quispe', dni: '71234567', rol: 'Asistente Técnico', rolClase: 'bg-[#fff8e1] text-[#ff8f00] dark:bg-[#ffb300]/10 dark:text-[#ffca28]', dot: 'bg-[#ffb300]', correo: 'jose.mendoza@empresa.com', telefono: '+51 987 654 321', obras: 3, estado: 'Activo' },
    { initials: 'CR', bg: 'bg-[#f97316]', nombre: 'Carlos Rojas Salas', dni: '41892365', rol: 'Residente de Obra', rolClase: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400', dot: 'bg-blue-500', correo: 'carlos.rojas@empresa.com', telefono: '+51 987 111 222', obras: 2, estado: 'Activo' },
    { initials: 'LF', bg: 'bg-[#f97316]', nombre: 'Luis Flores Mamani', dni: '42351789', rol: 'Supervisor', rolClase: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500', dot: 'bg-green-500', correo: 'lflores@empresa.com', telefono: '+51 989 332 144', obras: 5, estado: 'Activo' },
    { initials: 'AS', bg: 'bg-[#fbbf24]', nombre: 'Ana Salazar Vilca', dni: '75634218', rol: 'Gerente de Proyecto', rolClase: 'bg-[#fff8e1] text-[#ff8f00] dark:bg-[#ffb300]/10 dark:text-[#ffca28]', dot: 'bg-[#ffb300]', correo: 'ana.salazar@empresa.com', telefono: '+51 956 887 998', obras: 8, estado: 'Activo' },
    { initials: 'MV', bg: 'bg-[#f97316]', nombre: 'María Vargas Pérez', dni: '43887621', rol: 'Residente de Obra', rolClase: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400', dot: 'bg-blue-500', correo: 'mvargas@empresa.com', telefono: '+51 989 111 567', obras: 1, estado: 'Activo' },
    { initials: 'JC', bg: 'bg-[#f59e0b]', nombre: 'Juan Castillo Tito', dni: '48721356', rol: 'Asistente Técnico', rolClase: 'bg-[#fff8e1] text-[#ff8f00] dark:bg-[#ffb300]/10 dark:text-[#ffca28]', dot: 'bg-[#ffb300]', correo: 'jcastillo@empresa.com', telefono: '+51 977 654 220', obras: 2, estado: 'Activo' }
  ];

  // ================= ESTADO DEL MODAL =================
  modalVisible = false;
  
  modalConfig: ModalData = {
    title: 'Nueva persona',
    type: 'submit',
    submitButtonLabel: 'Guardar',
    styles: { width: '650px' }
  };

  // ================= MODELO DEL FORMULARIO =================
  form = {
    nombres: 'José Antonio',
    apellidos: 'Mendoza Quispe',
    dni: '71234567',
    rol: 'asistente',
    correo: 'jose@empresa.com',
    telefono: '+51 987 654 321',
    especialidad: 'Ing. Civil · CIP 123456'
  };

  // ================= CONFIGURACIÓN DE CAMPOS =================
  nombresConfig: CustomFormField = { 
    type: 'text', label: 'Nombres', required: true, placeholder: 'Ej. Juan' 
  };
  apellidosConfig: CustomFormField = { 
    type: 'text', label: 'Apellidos', required: true, placeholder: 'Ej. Pérez' 
  };
  dniConfig: CustomFormField = { 
    type: 'text', label: 'DNI', required: true, keyFilter: 'int', maxLength: 8, placeholder: '12345678' 
  };
  rolConfig: CustomFormField = { 
    type: 'selectValue', label: 'Tipo de rol', required: true,
    options: [
        { label: 'Asistente Técnico', value: 'asistente' },
        { label: 'Residente de Obra', value: 'residente' },
        { label: 'Supervisor', value: 'supervisor' },
        { label: 'Gerente de Proyecto', value: 'gerente' }
    ]
  };
  correoConfig: CustomFormField = { 
    type: 'text', label: 'Correo', placeholder: 'ejemplo@empresa.com' 
  };
  telefonoConfig: CustomFormField = { 
    type: 'text', label: 'Teléfono', placeholder: '+51 ...' 
  };
  especialidadConfig: CustomFormField = { 
    type: 'text', label: 'Especialidad / Colegiatura', placeholder: 'Ej. Ing. Civil · CIP...' 
  };

  // ================= MÉTODOS =================
  abrirModal() {
    this.modalVisible = true;
  }

  guardar() {
    console.log('Guardando persona...', this.form);
    this.modalVisible = false;
  }
}
