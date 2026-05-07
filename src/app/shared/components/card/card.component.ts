import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type CardVariant = 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'gray';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './card.component.html'
})
export class CardComponent {
    @Input() title: string = '';
    @Input() subtitle: string = '';
    @Input() icon: string = 'pi-chart-bar';
    @Input() color: CardVariant = 'primary';
    
    @Input() horizontal: boolean = false;
    @Input() hasActions: boolean = false;

    getCardBgClass() {
        const darkBase = 'dark:bg-dark-scale dark:border-dark-scale-700/50 dark:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]';
        const lightBase = 'bg-white border-gray-scale-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]';

        return `${lightBase} ${darkBase}`;
    }

    getIconContainerClass() {
        const variants = {
            primary:   'bg-red-custom text-white shadow-[0_8px_20px_-6px_rgba(154,18,48,0.5)]',
            secondary: 'bg-yellow-custom text-dark-scale shadow-[0_8px_20px_-6px_rgba(212,175,55,0.4)]',
            success:   'bg-green-custom text-white shadow-[0_8px_20px_-6px_rgba(34,197,94,0.4)]',
            info:      'bg-azul-custom text-white shadow-[0_8px_20px_-6px_rgba(59,130,246,0.4)]',
        };
        // @ts-ignore - para manejar variantes de error como primary
        return variants[this.color] || variants.primary;
    }
}