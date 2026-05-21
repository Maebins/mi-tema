import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { TableStatusChipComponent } from '../../../shared/components/table-status-chip/table-status-chip.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonComponent, TableStatusChipComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private router = inject(Router);

  navigate(){
    this.router.navigate(['/obras/obras']);
  }
}
