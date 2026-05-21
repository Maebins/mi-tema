import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { TableStatusChipComponent } from '../../../shared/components/table-status-chip/table-status-chip.component';

@Component({
  selector: 'app-reporte-avances',
  imports: [ButtonComponent, TableStatusChipComponent],
  templateUrl: './reporte-avances.component.html',
  styleUrl: './reporte-avances.component.scss',
})
export class ReporteAvancesComponent {

}
