import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CustomFormField } from '../../../shared/components/form-field/form-field.types';
import { ModalData } from '../../../shared/components/dialog/dialog.types';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';

@Component({
  selector: 'app-unidades-ejecutoras',
  standalone: true,
  imports: [ButtonComponent, CommonModule, FormsModule, DialogComponent, FormFieldComponent],
  templateUrl: './unidades-ejecutoras.component.html',
  styleUrl: './unidades-ejecutoras.component.scss',
})
export class UnidadesEjecutorasComponent {
  // ================= DATA DE LA TABLA =================
  unidades = [
    { ue: 'UE 301 — Gerencia Regional de Infraestructura', institucion: 'Gob. Regional de Cusco', avatar: 'P', jefe: 'Ing. María Pérez', presupuesto: 'S/ 12,480,000.00', estado: 'Activa', estadoClase: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500', dot: 'bg-green-500' },
    { ue: 'UE 401 — Sub Gerencia de Obras', institucion: 'Munic. San Sebastián', avatar: 'V', jefe: 'Ing. Jorge Vargas', presupuesto: 'S/ 3,820,500.00', estado: 'Activa', estadoClase: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500', dot: 'bg-green-500' },
    { ue: 'UE 102 — Educación Básica', institucion: 'UGEL Cusco', avatar: 'Q', jefe: 'Mg. Rosa Quispe', presupuesto: 'S/ 1,950,000.00', estado: 'Activa', estadoClase: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500', dot: 'bg-green-500' },
    { ue: 'UE 505 — Programa de Salud Rural', institucion: 'DIRESA Cusco', avatar: 'M', jefe: 'Dr. Carlos Mamani', presupuesto: 'S/ 892,300.00', estado: 'Inactiva', estadoClase: 'bg-gray-100 text-gray-500 dark:bg-dark-scale-700 dark:text-gray-400', dot: 'bg-gray-400' }
  ];

  // ================= ESTADO DEL MODAL =================
  modalVisible = false;
  
  modalConfig: ModalData = {
    title: 'Nueva unidad ejecutora',
    type: 'submit',
    submitButtonLabel: 'Guardar',
    styles: { width: '550px' }
  };

  // ================= MODELO DEL FORMULARIO =================
  form = {
    codigoSiaf: '',
    denominacion: '',
    institucion: 'muni_san_sebastian',
    jefe: '',
    presupuesto: ''
  };

  // ================= CONFIGURACIÓN DE CAMPOS =================
  codigoConfig: CustomFormField = { 
    type: 'text', 
    label: 'Código SIAF', 
    placeholder: '0301' 
  };
  
  denominacionConfig: CustomFormField = { 
    type: 'text', 
    label: 'Denominación', 
    required: true, 
    placeholder: 'UE 301 — ...' 
  };
  
  institucionConfig: CustomFormField = { 
    type: 'selectValue', 
    label: 'Institución', 
    required: true,
    options: [
        { label: 'Municipalidad Distrital de San Sebastián', value: 'muni_san_sebastian' },
        { label: 'Gobierno Regional de Cusco', value: 'gob_regional' }
    ]
  };
  
  jefeConfig: CustomFormField = { 
    type: 'text', 
    label: 'Jefe / Responsable', 
    placeholder: 'Buscar persona...' 
  };
  
  presupuestoConfig: CustomFormField = { 
    type: 'text', 
    label: 'Presupuesto anual (S/)', 
    placeholder: '0.00',
    keyFilter: 'numericDash'
  };

  // ================= MÉTODOS =================
  abrirModal() {
    this.modalVisible = true;
  }

  guardar() {
    console.log('Guardando unidad ejecutora...', this.form);
    this.modalVisible = false;
  }
}
