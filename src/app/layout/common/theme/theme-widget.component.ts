import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/theme/theme.service';

@Component({
    selector: 'app-theme-widget',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './theme-widget.component.html',
})
export class ThemeWidgetComponent {
    // Inyectamos tu servicio de temas directamente aquí
    public themeService = inject(ThemeService);
}
