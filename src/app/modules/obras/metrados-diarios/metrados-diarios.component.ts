import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CustomFormField } from '../../../shared/components/form-field/form-field.types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from '../../../shared/components/date-picker/date-picker.component';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { TableStatusChipComponent } from '../../../shared/components/table-status-chip/table-status-chip.component';
import { TabItem, TabsComponent } from '../../../shared/components/tabs/tabs.component';

@Component({
  selector: 'app-metrados-diarios',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePickerComponent, FormFieldComponent, ButtonComponent, TableStatusChipComponent, TabsComponent],
  templateUrl: './metrados-diarios.component.html',
  styleUrl: './metrados-diarios.component.scss',
})
export class MetradosDiariosComponent {
  // Variables para los componentes existentes
  fechaActual: Date = new Date(2026, 4, 18); // 18/05/2026
  
  frenteSeleccionado: string = 'frente_a';
  
  cuadrillaConfig: CustomFormField = {
    type: 'selectValue',
    label: 'Frente / Cuadrilla',
    options: [
      { value: 'frente_a', label: 'Frente A — Estructuras' },
      { value: 'frente_b', label: 'Frente B — Acabados' }
    ]
  };

  textarea: string = 'Llovió ligero entre las 14:00 y 15:30 — se cubrió el concreto recién vaciado de la zapata Z-12. Sin afectación al cronograma.';
  textareaConfig: CustomFormField = {
    type: 'textarea'
  };

  obraSeleccionada = {
    nombre: 'I.E. 0421 San Marcos',
    contrato: 'Contrato 018-2026'
  };

  // ================= TABS =================
  tabs: TabItem[] = [
    { id: 'captura', label: 'Captura del día' },
    { id: 'historial', label: 'Historial · Últimos 7 días' },
    { id: 'acumulado', label: 'Acumulado por partida' }
  ];
  activeTab: string = 'captura';

  // ================= DATA TAB 1: CAPTURA =================
  partidasCaptura = [
    { 
      codigo: '01.02.03', nombre: "Concreto premezclado f'c=210 kg/cm²", ruta: 'Estructuras > Concreto armado',
      und: 'm³', contractual: '486.00', acumulado: '329.50', metradoHoy: '12.50', avance: '70.3%',
      estado: 'Guardado', estadoClase: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500', dot: 'bg-green-500',
      editando: false
    },
    { 
      codigo: '01.02.04', nombre: 'Encofrado de columnas', ruta: 'Estructuras > Concreto armado',
      und: 'm²', contractual: '820.00', acumulado: '478.60', metradoHoy: '34.20', avance: '62.5%',
      estado: 'Editando', estadoClase: 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-500', dot: 'bg-orange-500',
      editando: true
    },
    { 
      codigo: '01.02.05', nombre: "Acero de refuerzo Fy=4200 kg/cm²", ruta: 'Estructuras > Concreto armado',
      und: 'kg', contractual: '14,250.00', acumulado: '8,940.00', metradoHoy: '240.00', avance: '64.4%',
      estado: 'Guardado', estadoClase: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500', dot: 'bg-green-500',
      editando: false
    },
    { 
      codigo: '02.01.01', nombre: 'Muros de albañileria K-K', ruta: 'Arquitectura > Muros',
      und: 'm²', contractual: '560.00', acumulado: '142.50', metradoHoy: '18.00', avance: '28.7%',
      estado: 'Guardado', estadoClase: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500', dot: 'bg-green-500',
      editando: false
    },
    { 
      codigo: '02.02.01', nombre: 'Tarrajeo muros interiores', ruta: 'Arquitectura > Revoques',
      und: 'm²', contractual: '980.00', acumulado: '12.00', metradoHoy: '0.00', avance: '1.2%',
      estado: 'Pendiente', estadoClase: 'bg-gray-100 text-gray-600 dark:bg-dark-scale-700 dark:text-gray-400', dot: 'bg-gray-400 dark:bg-gray-500',
      editando: false
    },
    { 
      codigo: '03.01.02', nombre: 'Tendido de tubería PVC 4" desagüe', ruta: 'IISS > Desagüe',
      und: 'ml', contractual: '142.00', acumulado: '68.40', metradoHoy: '6.50', avance: '52.7%',
      estado: 'Guardado', estadoClase: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500', dot: 'bg-green-500',
      editando: false
    }
  ];

  // ================= DATA TAB 2: HISTORIAL =================
  historial = [
    { fecha: '18/05/2026', dia: 'Lunes', frente: 'Frente A', partidas: '5 / 6', avance: '+0.84%', monto: 'S/ 18,460', cerro: '—', estado: 'En captura', estadoClase: 'bg-[#fff8e1] text-[#ff8f00] dark:bg-[#ffb300]/10 dark:text-[#ffca28]', dot: 'bg-[#ffb300]' },
    { fecha: '17/05/2026', dia: 'Domingo', frente: 'Frente A', partidas: '3', avance: '+0.42%', monto: 'S/ 9,180', cerro: 'J. Mendoza', estado: 'Cerrado', estadoClase: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500', dot: 'bg-green-500' },
    { fecha: '16/05/2026', dia: 'Sábado', frente: 'Frente A, B', partidas: '8', avance: '+1.12%', monto: 'S/ 26,840', cerro: 'J. Mendoza', estado: 'Cerrado', estadoClase: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500', dot: 'bg-green-500' },
    { fecha: '15/05/2026', dia: 'Viernes', frente: 'Frente A, B', partidas: '7', avance: '+0.96%', monto: 'S/ 21,330', cerro: 'J. Mendoza', estado: 'Cerrado', estadoClase: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500', dot: 'bg-green-500' },
    { fecha: '14/05/2026', dia: 'Jueves', frente: 'Frente A, B, C', partidas: '9', avance: '+1.34%', monto: 'S/ 29,470', cerro: 'J. Mendoza', estado: 'Cerrado', estadoClase: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500', dot: 'bg-green-500' },
    { fecha: '13/05/2026', dia: 'Miércoles', frente: 'Frente A', partidas: '4', avance: '+0.58%', monto: 'S/ 12,720', cerro: 'J. Mendoza', estado: 'Cerrado', estadoClase: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500', dot: 'bg-green-500' },
    { fecha: '12/05/2026', dia: 'Martes', frente: 'Sin actividad', partidas: '—', avance: '—', monto: '—', cerro: '—', estado: 'Día libre', estadoClase: 'bg-gray-100 text-gray-500 dark:bg-dark-scale-700 dark:text-gray-400', dot: 'bg-gray-400' }
  ];

}
