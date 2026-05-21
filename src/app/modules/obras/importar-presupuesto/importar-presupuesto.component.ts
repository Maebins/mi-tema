import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { StepItem, StepperComponent } from '../../../shared/components/stepper/stepper.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-importar-presupuesto',
  standalone: true,
  imports: [ButtonComponent, CommonModule, StepperComponent],
  templateUrl: './importar-presupuesto.component.html',
  styleUrl: './importar-presupuesto.component.scss',
})
export class ImportarPresupuestoComponent {
  // ================= STEPPER =================
  pasosStepper: StepItem[] = [
    { label: 'Seleccionar obra' },
    { label: 'Subir archivo' },
    { label: 'Mapeo de columnas' },
    { label: 'Validación' },
    { label: 'Confirmar' }
  ];
  pasoActual = 2; 

  // ================= DATA DE MAPEO =================
  mapeoColumnas = [
    { archivo: 'Ítem', mapeaA: 'Código de partida', tipo: 'Texto', tipoClase: 'bg-gray-100 text-gray-600 dark:bg-dark-scale-700 dark:text-gray-400', dot: 'bg-gray-400', muestra: '01.02.03' },
    { archivo: 'Descripción', mapeaA: 'Descripción de partida', tipo: 'Texto', tipoClase: 'bg-gray-100 text-gray-600 dark:bg-dark-scale-700 dark:text-gray-400', dot: 'bg-gray-400', muestra: "Concreto premezclado f'c=210..." },
    { archivo: 'Und', mapeaA: 'Unidad de medida', tipo: 'Texto', tipoClase: 'bg-gray-100 text-gray-600 dark:bg-dark-scale-700 dark:text-gray-400', dot: 'bg-gray-400', muestra: 'm3' },
    { archivo: 'Metrado', mapeaA: 'Metrado contractual', tipo: 'Número', tipoClase: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400', dot: 'bg-blue-500', muestra: '486.00' },
    { archivo: 'Precio S/.', mapeaA: 'Precio unitario', tipo: 'Moneda', tipoClase: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400', dot: 'bg-blue-500', muestra: '533.49' },
    { archivo: 'Parcial S/.', mapeaA: 'Parcial (calculado)', tipo: 'Moneda', tipoClase: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400', dot: 'bg-blue-500', muestra: '259,275.14' }
  ];

  // ================= ADVERTENCIAS =================
  advertencias = [
    { fila: 87, problema: 'partida sin unidad de medida', accion: 'Se asumirá "und"' },
    { fila: 142, problema: 'precio unitario en cero', accion: 'Revisa antes de continuar' },
    { fila: 233, problema: 'descripción duplicada', accion: 'Se importará como partida nueva' }
  ];
}
