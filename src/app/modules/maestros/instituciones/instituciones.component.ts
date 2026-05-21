import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ModalData } from '../../../shared/components/dialog/dialog.types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { CustomFormField } from '../../../shared/components/form-field/form-field.types';

@Component({
  selector: 'app-instituciones',
  standalone: true,
  imports: [ButtonComponent,CommonModule, FormsModule, DialogComponent, FormFieldComponent],
  templateUrl: './instituciones.component.html',
  styleUrl: './instituciones.component.scss',
})
export class InstitucionesComponent {
  // ================= DATA DE LA TABLA =================
  instituciones = [
    { nombre: 'Municipalidad Distrital de San Sebastián', ruc: '20132843621', tipo: 'Gobierno Local', ubicacion: 'Cusco / Cusco / San Sebastián', obras: 8, estado: 'Activa', estadoClase: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500', dot: 'bg-green-500' },
    { nombre: 'Gobierno Regional de Cusco', ruc: '20527386051', tipo: 'Gobierno Regional', ubicacion: 'Cusco / Cusco', obras: 12, estado: 'Activa', estadoClase: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500', dot: 'bg-green-500' },
    { nombre: 'UGEL Cusco', ruc: '20488123345', tipo: 'Unidad Educativa', ubicacion: 'Cusco / Cusco / Wanchaq', obras: 5, estado: 'Activa', estadoClase: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500', dot: 'bg-green-500' },
    { nombre: 'Ministerio de Salud — DIRESA Cusco', ruc: '20131370645', tipo: 'Gobierno Central', ubicacion: 'Cusco / Cusco', obras: 3, estado: 'Activa', estadoClase: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500', dot: 'bg-green-500' },
    { nombre: 'Provias Descentralizado', ruc: '20380419247', tipo: 'Gobierno Central', ubicacion: 'Lima / Lima', obras: 4, estado: 'Inactiva', estadoClase: 'bg-gray-100 text-gray-500 dark:bg-dark-scale-700 dark:text-gray-400', dot: 'bg-gray-400' }
  ];

  // ================= ESTADO DEL MODAL =================
  modalVisible = false;
  
  modalConfig: ModalData = {
    title: 'Nueva institución',
    type: 'submit',
    submitButtonLabel: 'Guardar',
    styles: { width: '600px' }
  };

  // ================= MODELO DEL FORMULARIO =================
  form = {
    ruc: '20132843621',
    tipo: 'local',
    razonSocial: 'Municipalidad Distrital de...',
    departamento: 'cusco',
    provincia: 'cusco',
    distrito: 'san_sebastian',
    direccion: 'Av. ...'
  };

  // ================= CONFIGURACIÓN DE CAMPOS (Form-Field) =================
  rucConfig: CustomFormField = { type: 'text', label: 'RUC', required: true };
  
  tipoConfig: CustomFormField = { 
    type: 'selectValue', label: 'Tipo', required: true,
    options: [
        { label: 'Gobierno Local', value: 'local' }, 
        { label: 'Gobierno Regional', value: 'regional' }
    ]
  };
  
  razonSocialConfig: CustomFormField = { type: 'text', label: 'Razón social', required: true };
  
  depConfig: CustomFormField = { 
    type: 'selectValue', label: 'Departamento',
    options: [{ label: 'Cusco', value: 'cusco' }]
  };
  
  provConfig: CustomFormField = { 
    type: 'selectValue', label: 'Provincia',
    options: [{ label: 'Cusco', value: 'cusco' }]
  };
  
  distConfig: CustomFormField = { 
    type: 'selectValue', label: 'Distrito',
    options: [{ label: 'San Sebastián', value: 'san_sebastian' }]
  };
  
  dirConfig: CustomFormField = { type: 'text', label: 'Dirección fiscal' };

  // ================= MÉTODOS =================
  abrirModal() {
    this.modalVisible = true;
  }

  guardar() {
    console.log('Guardando institución...', this.form);
    this.modalVisible = false;
  }

}
