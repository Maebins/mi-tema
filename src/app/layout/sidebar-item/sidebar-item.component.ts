import { Component, inject, Input } from '@angular/core';
import { AppMenuItem } from '../../core/menu/menu.models';
import { LayoutService } from '../../core/layout/layout.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-item',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss',
})
export class SidebarItemComponent {
  @Input() item!: AppMenuItem;
  layoutService = inject(LayoutService);
}
