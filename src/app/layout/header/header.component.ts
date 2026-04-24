import { Component, inject } from '@angular/core';
import { LayoutService } from '../../core/layout/layout.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/theme/theme.service';
import { SearchWidgetComponent } from '../common/search/search-widget.component';
import { ThemeWidgetComponent } from '../common/theme/theme-widget.component';
import { NotificationWidgetComponent } from '../common/notification/notification-widget.component';
import { UserWidgetComponent } from '../common/user/user-widget.component';

@Component({
    selector: 'app-header',
    imports: [
        CommonModule,
        SearchWidgetComponent,
        ThemeWidgetComponent,
        NotificationWidgetComponent,
        UserWidgetComponent
    ],
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
