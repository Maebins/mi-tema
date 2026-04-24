import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'app-overlay-loader',
    standalone: true,
    imports: [CommonModule, ProgressSpinnerModule],
    templateUrl: './overlay-loader.component.html',
})
export class OverlayLoaderComponent {
    @Input() active: boolean = false;
    @Input() text: string = 'Cargando...';
}
