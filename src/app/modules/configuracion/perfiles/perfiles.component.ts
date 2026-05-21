import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CustomFormField } from '../../../shared/components/form-field/form-field.types';
import { ModalData } from '../../../shared/components/dialog/dialog.types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';

@Component({
  selector: 'app-perfiles',
  standalone:true,
  imports: [ButtonComponent,CommonModule, FormsModule, DialogComponent, FormFieldComponent],
  templateUrl: './perfiles.component.html',
  styleUrl: './perfiles.component.scss',
})
export class PerfilesComponent {
  // ================= DATA DE PERFILES (Tarjetas) =================
  perfiles = [
    { id: 'admin', titulo: 'Administrador', usuarios: 4, desc: 'Acceso total al sistema y a la configuración', color: 'green', badgeClase: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500', dotClase: 'bg-green-500', borderActivo: 'border-green-500 dark:border-green-500' },
    { id: 'gerente', titulo: 'Gerente', usuarios: 2, desc: 'Vista ejecutiva de todas las obras · aprobaciones', color: 'blue', badgeClase: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400', dotClase: 'bg-blue-500', borderActivo: 'border-blue-500 dark:border-blue-500' },
    { id: 'supervisor', titulo: 'Supervisor', usuarios: 3, desc: 'Aprobación de valorizaciones y revisión de obras', color: 'yellow', badgeClase: 'bg-[#fff8e1] text-[#ff8f00] dark:bg-[#ffb300]/10 dark:text-[#ffca28]', dotClase: 'bg-[#ffb300]', borderActivo: 'border-[#ffb300] dark:border-[#ffca28]' },
    { id: 'residente', titulo: 'Residente', usuarios: 5, desc: 'Registro de metrados y operación de obra', color: 'orange', badgeClase: 'bg-orange-50 text-orange-500 dark:bg-orange-900/20 dark:text-orange-400', dotClase: 'bg-orange-500', borderActivo: 'border-orange-500 dark:border-orange-500' },
    { id: 'asistente', titulo: 'Asistente Técnico', usuarios: 2, desc: 'Apoyo al residente · registro y consultas', color: 'gray', badgeClase: 'bg-gray-100 text-gray-500 dark:bg-dark-scale-700 dark:text-gray-400', dotClase: 'bg-gray-400', borderActivo: 'border-gray-400 dark:border-gray-500' },
    { id: 'lectura', titulo: 'Sólo lectura', usuarios: 0, desc: 'Acceso de consulta sin modificar datos', color: 'gray', badgeClase: 'bg-gray-100 text-gray-500 dark:bg-dark-scale-700 dark:text-gray-400', dotClase: 'bg-gray-400', borderActivo: 'border-gray-400 dark:border-gray-500' }
  ];

  // Perfil activo por defecto
  perfilSeleccionado = this.perfiles[3];

  // ================= DATA DINÁMICA DE LA MATRIZ =================
  matrizPermisos: any = {
    'admin': [
      { modulo: 'Obras', ver: true, crear: true, editar: true, eliminar: true },
      { modulo: 'Presupuesto', ver: true, crear: true, editar: true, eliminar: true },
      { modulo: 'Metrados', ver: true, crear: true, editar: true, eliminar: true },
      { modulo: 'Valorizaciones', ver: true, crear: true, editar: true, eliminar: true },
      { modulo: 'Almacén', ver: true, crear: true, editar: true, eliminar: true },
      { modulo: 'Maestros', ver: true, crear: true, editar: true, eliminar: true },
      { modulo: 'Usuarios', ver: true, crear: true, editar: true, eliminar: true }
    ],
    'gerente': [
      { modulo: 'Obras', ver: true, crear: false, editar: false, eliminar: false },
      { modulo: 'Presupuesto', ver: true, crear: false, editar: false, eliminar: false },
      { modulo: 'Metrados', ver: true, crear: false, editar: false, eliminar: false },
      { modulo: 'Valorizaciones', ver: true, crear: false, editar: true, eliminar: false },
      { modulo: 'Almacén', ver: true, crear: false, editar: false, eliminar: false },
      { modulo: 'Maestros', ver: true, crear: false, editar: false, eliminar: false },
      { modulo: 'Usuarios', ver: true, crear: false, editar: false, eliminar: false }
    ],
    'supervisor': [
      { modulo: 'Obras', ver: true, crear: false, editar: true, eliminar: false },
      { modulo: 'Presupuesto', ver: true, crear: false, editar: false, eliminar: false },
      { modulo: 'Metrados', ver: true, crear: false, editar: true, eliminar: false },
      { modulo: 'Valorizaciones', ver: true, crear: false, editar: true, eliminar: false },
      { modulo: 'Almacén', ver: true, crear: false, editar: false, eliminar: false },
      { modulo: 'Maestros', ver: true, crear: false, editar: false, eliminar: false },
      { modulo: 'Usuarios', ver: false, crear: false, editar: false, eliminar: false }
    ],
    'residente': [
      { modulo: 'Obras', ver: true, crear: false, editar: false, eliminar: false },
      { modulo: 'Presupuesto', ver: true, crear: false, editar: false, eliminar: false },
      { modulo: 'Metrados', ver: true, crear: true, editar: false, eliminar: false },
      { modulo: 'Valorizaciones', ver: true, crear: true, editar: false, eliminar: false },
      { modulo: 'Almacén', ver: true, crear: true, editar: false, eliminar: false },
      { modulo: 'Maestros', ver: true, crear: false, editar: false, eliminar: false },
      { modulo: 'Usuarios', ver: false, crear: false, editar: false, eliminar: false }
    ],
    'asistente': [
      { modulo: 'Obras', ver: true, crear: false, editar: false, eliminar: false },
      { modulo: 'Presupuesto', ver: true, crear: false, editar: false, eliminar: false },
      { modulo: 'Metrados', ver: true, crear: true, editar: false, eliminar: false },
      { modulo: 'Valorizaciones', ver: true, crear: false, editar: false, eliminar: false },
      { modulo: 'Almacén', ver: true, crear: true, editar: false, eliminar: false },
      { modulo: 'Maestros', ver: true, crear: false, editar: false, eliminar: false },
      { modulo: 'Usuarios', ver: false, crear: false, editar: false, eliminar: false }
    ],
    'lectura': [
      { modulo: 'Obras', ver: true, crear: false, editar: false, eliminar: false },
      { modulo: 'Presupuesto', ver: true, crear: false, editar: false, eliminar: false },
      { modulo: 'Metrados', ver: true, crear: false, editar: false, eliminar: false },
      { modulo: 'Valorizaciones', ver: true, crear: false, editar: false, eliminar: false },
      { modulo: 'Almacén', ver: true, crear: false, editar: false, eliminar: false },
      { modulo: 'Maestros', ver: true, crear: false, editar: false, eliminar: false },
      { modulo: 'Usuarios', ver: false, crear: false, editar: false, eliminar: false }
    ]
  };

  get permisosActuales() {
    // Si no existe en nuestro mock, mostramos una matriz vacía por defecto
    return this.matrizPermisos[this.perfilSeleccionado.id] || [
      { modulo: 'Obras', ver: false, crear: false, editar: false, eliminar: false },
      { modulo: 'Presupuesto', ver: false, crear: false, editar: false, eliminar: false }
    ];
  }

  seleccionarPerfil(perfil: any) {
    this.perfilSeleccionado = perfil;
  }

  // ================= ESTADO DEL MODAL =================
  modalVisible = false;
  
  modalConfig: ModalData = {
    title: 'Nuevo perfil',
    type: 'submit',
    submitButtonLabel: 'Guardar',
    styles: { width: '550px' }
  };

  // ================= MODELO DEL FORMULARIO =================
  form = {
    nombre: '',
    descripcion: '',
    perfilBase: ''
  };

  // ================= CONFIGURACIÓN DE CAMPOS =================
  nombreConfig: CustomFormField = { 
    type: 'text', label: 'Nombre del perfil', required: true, placeholder: 'Ej: Auditor externo' 
  };
  
  descConfig: CustomFormField = { 
    type: 'textarea', label: 'Descripción', placeholder: 'A quién está dirigido y qué debe poder hacer...' 
  };
  
  baseConfig: CustomFormField = { 
    type: 'selectValue', label: 'Perfil base (opcional)', 
    options: [
        { label: 'Administrador', value: 'admin' },
        { label: 'Residente', value: 'residente' },
        { label: 'Supervisor', value: 'supervisor' }
    ]
  };

  // ================= MÉTODOS =================
  abrirModal() {
    this.modalVisible = true;
  }

  guardarPerfil() {
    console.log('Guardando perfil...', this.form);
    this.modalVisible = false;
  }
}
