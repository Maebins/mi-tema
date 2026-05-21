import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CustomFormField } from '../../../shared/components/form-field/form-field.types';
import { ModalData } from '../../../shared/components/dialog/dialog.types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';

@Component({
  selector: 'app-usuarios',
  imports: [ButtonComponent,CommonModule, FormsModule, DialogComponent, FormFieldComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})
export class UsuariosComponent {
  // ================= DATA DE LA TABLA =================
  usuarios = [
    { initials: 'JM', nombre: 'José Mendoza', correo: 'jose.mendoza@empresa.com', perfil: 'Admin', perfilClase: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400', pDot: 'bg-blue-500', acceso: '12 May 2026 · 09:14', estado: 'Activo', estadoClase: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500', eDot: 'bg-green-500' },
    { initials: 'CR', nombre: 'Carlos Rojas', correo: 'carlos.rojas@empresa.com', perfil: 'Residente', perfilClase: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400', pDot: 'bg-blue-500', acceso: 'Hoy · 08:02', estado: 'Activo', estadoClase: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500', eDot: 'bg-green-500' },
    { initials: 'LF', nombre: 'Luis Flores', correo: 'lflores@empresa.com', perfil: 'Supervisor', perfilClase: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400', pDot: 'bg-blue-500', acceso: 'Ayer · 17:48', estado: 'Activo', estadoClase: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500', eDot: 'bg-green-500' },
    { initials: 'AS', nombre: 'Ana Salazar', correo: 'ana.salazar@empresa.com', perfil: 'Gerente', perfilClase: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400', pDot: 'bg-blue-500', acceso: '10 May 2026 · 11:30', estado: 'Activo', estadoClase: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500', eDot: 'bg-green-500' },
    { initials: 'MV', nombre: 'María Vargas', correo: 'mvargas@empresa.com', perfil: 'Residente', perfilClase: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400', pDot: 'bg-blue-500', acceso: 'Nunca', estado: 'Pendiente', estadoClase: 'bg-[#fff8e1] text-[#ff8f00] dark:bg-[#ffb300]/10 dark:text-[#ffca28]', eDot: 'bg-[#ffb300]' }
  ];

  // ================= ESTADO DEL MODAL =================
  modalVisible = false;
  
  modalConfig: ModalData = {
    title: 'Invitar nuevo usuario',
    type: 'submit',
    submitButtonLabel: 'Enviar invitación',
    styles: { width: '550px' }
  };

  // ================= MODELO DEL FORMULARIO =================
  form = {
    persona: '',
    correo: '',
    perfil: 'admin',
    enviarCorreo: true
  };

  // ================= CONFIGURACIÓN DE CAMPOS =================
  personaConfig: CustomFormField = { 
    type: 'text', 
    label: 'Persona vinculada', 
    required: true, 
    placeholder: 'Buscar en directorio de personas...' 
  };
  
  correoConfig: CustomFormField = { 
    type: 'text', 
    label: 'Correo de acceso', 
    required: true, 
    placeholder: 'usuario@empresa.com' 
  };
  
  perfilConfig: CustomFormField = { 
    type: 'selectValue', 
    label: 'Perfil de permisos', 
    required: true,
    options: [
        { label: 'Administrador', value: 'admin' },
        { label: 'Residente', value: 'residente' },
        { label: 'Supervisor', value: 'supervisor' },
        { label: 'Gerente', value: 'gerente' }
    ]
  };

  // ================= MÉTODOS =================
  abrirModal() {
    this.modalVisible = true;
  }

  enviarInvitacion() {
    console.log('Enviando invitación a usuario...', this.form);
    this.modalVisible = false;
  }

}
