import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-table-status-chip',
    standalone: true,
    imports: [CommonModule, TagModule],
    templateUrl: './table-status-chip.component.html',
    styleUrl: './table-status-chip.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableStatusChipComponent {
    @Input() label: string = '';
    
    /**
     * 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'warning' | 'danger' | 'error' | 'disabled'
     */
    @Input() type: string = '';
    @Input() useTailwindColors: boolean = false;

    get tailwindClasses(): string {
        if (!this.useTailwindColors) return '';

        const baseClasses = 'font-sans rounded-md px-3 py-1.5 text-xs font-bold tracking-wide';

        const colorMap: Record<string, string> = {
            // Verde (Activo) 
            success: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400',
            
            // Naranja/Marrón (Inactivo / Warning) 
            warning: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400',
            warn: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400',
            
            // Rojo/Guinda (Eliminado / Error)
            danger: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400',
            error: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400',
            
            // Azul (Info)
            info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400',
            
            // Gris (Neutral / Deshabilitado)
            disabled: 'bg-gray-100 text-gray-500 dark:bg-dark-scale-700 dark:text-gray-300',
            neutral: 'bg-gray-100 text-gray-500 dark:bg-dark-scale-700 dark:text-gray-300',
        };

        const safeType = (this.type || 'neutral').toLowerCase();
        const colorClass = colorMap[safeType] || colorMap['neutral'];

        return `${baseClasses} ${colorClass}`;
    }
}