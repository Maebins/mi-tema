import { Component, inject } from '@angular/core';
import { LayoutService } from '../../core/layout/layout.service';
import { SidebarItemComponent } from '../sidebar-item/sidebar-item.component';
import { CommonModule } from '@angular/common';
import { AppMenuItem } from '../../core/menu/menu.models';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, SidebarItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public layoutService = inject(LayoutService);
  menuItems: AppMenuItem[] = this.layoutService.getMenu();
}
