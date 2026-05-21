import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { TabItem, TabsComponent } from '../../../shared/components/tabs/tabs.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { TableColumn } from '../../../shared/components/table/table.types';

@Component({
  selector: 'app-valorizaciones',
  standalone: true,
  imports: [ButtonComponent,CommonModule, TabsComponent, TableComponent],
  templateUrl: './valorizaciones.component.html',
  styleUrl: './valorizaciones.component.scss',
})
export class ValorizacionesComponent {
  // ================= TABS =================
  tabs: TabItem[] = [
    { id: 'kanban', label: 'Tablero (Kanban)' },
    { id: 'lista', label: 'Lista' }
  ];
  activeTab: string = 'lista';

  // ================= TABLA =================
  tableColumns: TableColumn[] = [
    { header: 'Código', field: 'codigo' },
    { header: 'Obra', field: 'obra' },
    { header: 'Periodo', field: 'periodo' },
    { header: 'Monto', field: 'monto' },
    { header: 'Responsable', field: 'responsable' },
    { header: 'Última actualización', field: 'ultimaActualizacion' }
  ];

  // app-table
  tableData = [
    { codigo: 'VAL-019', obra: 'Loza Deportiva Tipuni', periodo: 'May 2026', monto: '24,500.00', estadoLabel: 'Borrador', estadoType: 'neutral', responsable: 'J. Castillo', ultimaActualizacion: 'Hoy · 10:14' },
    { codigo: 'VAL-018-A', obra: 'I.E. San Marcos', periodo: 'May 2026', monto: '84,200.00', estadoLabel: 'Borrador', estadoType: 'neutral', responsable: 'J. Mendoza', ultimaActualizacion: 'Hoy · 08:42' },
    { codigo: 'VAL-017', obra: 'Av. Cultura', periodo: 'Abr 2026', monto: '156,920.00', estadoLabel: 'En revisión', estadoType: 'info', responsable: 'L. Flores', ultimaActualizacion: 'Ayer · 17:30' },
    { codigo: 'VAL-016-B', obra: 'Posta Huayllabamba', periodo: 'Abr 2026', monto: '98,400.00', estadoLabel: 'En revisión', estadoType: 'info', responsable: 'C. Rojas', ultimaActualizacion: 'Ayer · 14:05' },
    { codigo: 'VAL-016', obra: 'I.E. San Marcos', periodo: 'Abr 2026', monto: '203,480.00', estadoLabel: 'Aprobada', estadoType: 'success', responsable: 'J. Mendoza', ultimaActualizacion: '16 May · 11:20' },
    { codigo: 'VAL-015', obra: 'Reservorio R-7', periodo: 'Abr 2026', monto: '312,650.00', estadoLabel: 'Aprobada', estadoType: 'success', responsable: 'M. Quispe', ultimaActualizacion: '13 May · 09:15' },
    { codigo: 'VAL-014', obra: 'I.E. San Marcos', periodo: 'Mar 2026', monto: '268,300.00', estadoLabel: 'Pagada', estadoType: 'warning', responsable: 'J. Mendoza', ultimaActualizacion: '28 Abr 2026' }
  ];

  // ================= KANBAN =================
  kanbanColumns = [
    {
      title: 'Borrador',
      dotClass: 'bg-gray-400',
      badgeClass: 'bg-gray-100 text-gray-500 dark:bg-dark-scale-800 dark:text-gray-scale-400',
      borderClass: 'border-l-2 border-l-gray-scale dark:border-l-gray-400',
      count: 2,
      cards: [
        { id: 'VAL-019', obra: 'Loza Deportiva Tipuni', monto: 'S/ 24,500.00', periodo: 'May 2026', avatarText: 'JC', footerText: 'Sin firmar' },
        { id: 'VAL-018-A', obra: 'I.E. San Marcos', monto: 'S/ 84,200.00', periodo: 'May 2026', avatarText: 'JM', footerText: 'Borrador del residente' }
      ]
    },
    {
      title: 'En Revisión',
      dotClass: 'bg-blue-500',
      badgeClass: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      borderClass: 'border-l-2 border-l-blue-500 dark:border-l-blue-400',
      count: 2,
      cards: [
        { id: 'VAL-017', obra: 'Av. Cultura', monto: 'S/ 156,920.00', periodo: 'Abr 2026', avatarText: 'LF', badge: '3 observaciones', badgeColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-500', footerText: 'Revisión: sup. L. Flores' },
        { id: 'VAL-016-B', obra: 'Posta Huayllabamba', monto: 'S/ 98,400.00', periodo: 'Abr 2026', avatarText: 'CR', footerText: 'Revisión: sup. L. Flores' }
      ]
    },
    {
      title: 'Aprobado',
      dotClass: 'bg-green-500',
      badgeClass: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      borderClass: 'border-l-2 border-l-green-500 dark:border-l-green-400',
      count: 2,
      cards: [
        { id: 'VAL-016', obra: 'I.E. San Marcos', monto: 'S/ 203,480.00', periodo: 'Abr 2026', avatarText: 'JM', badge: 'Lista para pago', badgeColor: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400', footerText: 'Aprobada hace 2 días' },
        { id: 'VAL-015', obra: 'Reservorio R-7', monto: 'S/ 312,650.00', periodo: 'Abr 2026', avatarText: 'MQ', footerText: 'Aprobada hace 5 días' }
      ]
    },
    {
      title: 'Pagado',
      dotClass: 'bg-orange-400',
      badgeClass: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
      borderClass: 'border-l-2 border-l-orange-500 dark:border-l-orange-400',
      count: 3,
      cards: [
        { id: 'VAL-014', obra: 'I.E. San Marcos', monto: 'S/ 268,300.00', periodo: 'Mar 2026', avatarText: 'JM', footerText: 'Pagada el 28-Abr-2026' },
        { id: 'VAL-013', obra: 'Av. Cultura', monto: 'S/ 142,150.00', periodo: 'Mar 2026', avatarText: 'LF', footerText: 'Pagada el 25-Abr-2026' },
        { id: 'VAL-012', obra: 'Posta Huayllabamba', monto: 'S/ 98,750.00', periodo: 'Mar 2026', avatarText: 'CR', footerText: 'Pagada el 22-Abr-2026' }
      ]
    }
  ];

}
