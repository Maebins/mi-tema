import { Component, inject } from '@angular/core';
import { LayoutService } from '../../core/layout/layout.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/theme/theme.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public layoutService = inject(LayoutService);
  themeService = inject(ThemeService);

  toggleSidebar() {
    if (window.innerWidth < 768) {
      this.layoutService.toggleMobileSidebar();
    } else {
      this.layoutService.toggleDesktopSidebar();
    }
  }
}
