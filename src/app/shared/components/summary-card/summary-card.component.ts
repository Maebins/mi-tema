import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SummaryCardConfig, SummaryVariant } from './summary.type'; // Asegúrate de que la ruta sea correcta

@Component({
    selector: 'app-summary-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './summary-card.component.html',
    styleUrl: './summary-card.component.scss',
})
export class SummaryCardComponent {
    @Input() config!: SummaryCardConfig;

    // Colores de Acento (Solo texto y bordes, NO fondos enteros)
    get accentClasses() {
        const variant: SummaryVariant = this.config.variant || 'primary';
        
        const variants: Record<SummaryVariant, { title: string, borderTop: string }> = {
            primary: {
                title: 'text-primary dark:text-primary-400',
                borderTop: 'border-t-primary'
            },
            secondary: {
                title: 'text-secondary dark:text-secondary',
                borderTop: 'border-t-secondary'
            },
            success: {
                title: 'text-green-custom dark:text-green-500',
                borderTop: 'border-t-green-custom'
            },
            warn: {
                title: 'text-yellow-600 dark:text-yellow-500',
                borderTop: 'border-t-yellow-500'
            }
        };
        return variants[variant];
    }
}