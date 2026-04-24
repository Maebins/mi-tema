import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';

@Component({
    selector: 'app-notification-widget',
    standalone: true,
    imports: [CommonModule, BadgeModule],
    templateUrl: './notification-widget.component.html'
})
export class NotificationWidgetComponent {
    unreadCount: number = 3; // Puedes conectar esto a un servicio después

    abrirNotificaciones() {
        console.log('Abriendo panel de notificaciones...');
    }
}