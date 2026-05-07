import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type ProgressVariant = 'primary' | 'secondary' | 'success' | 'info' | 'error';
export type ProgressSize = 'sm' | 'md' | 'lg';

@Component({
    selector: 'app-progress-bar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './progress-bar.component.html'
})
export class ProgressBarComponent {
    @Input() label: string = 'Progreso';
    @Input() progress: number = 0;
    
    @Input() variant: ProgressVariant = 'primary';
    @Input() size: ProgressSize = 'md';
    @Input() showLabel: boolean = true;
    @Input() animated: boolean = false;

    get textClass(): string {
        const variants: Record<ProgressVariant, string> = {
            primary: 'text-primary dark:text-primary-400',
            secondary: 'text-secondary dark:text-secondary',
            success: 'text-green-custom dark:text-green-400',
            info: 'text-azul-custom dark:text-blue-400',
            error: 'text-red-custom dark:text-red-400'
        };
        return variants[this.variant] || variants.primary;
    }

    get barClass(): string {
        const variants: Record<ProgressVariant, string> = {
            primary: 'bg-primary',
            secondary: 'bg-secondary',
            success: 'bg-green-custom',
            info: 'bg-azul-custom',
            error: 'bg-red-custom'
        };
        return variants[this.variant] || variants.primary;
    }

    get trackHeight(): string {
        return {
            sm: 'h-1.5',
            md: 'h-2.5', 
            lg: 'h-4'    
        }[this.size] || 'h-2.5';
    }
}
