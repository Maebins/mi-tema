import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-user-widget',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './user-widget.component.html',
})
export class UserWidgetComponent {
    toggleMenu() {
        console.log('Abriendo menú de usuario...');
    }
}
