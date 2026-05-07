import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

export type AlertType = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

@Component({
    selector: 'app-alert',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './alert.component.html'
})
export class AlertComponent {
    @Input() type: AlertType = 'info';
    @Input() title: string = '';
    @Input() message: string = '';
    @Input() dismissible: boolean = false; 
    @Input() showIcon: boolean = true;

    @Output() closed = new EventEmitter<void>();

    isVisible = signal<boolean>(true);

    closeAlert() {
        this.isVisible.set(false);
        this.closed.emit();
    }

    get iconClass(): string {
        const icons: Record<AlertType, string> = {
            primary: 'pi pi-star',
            secondary: 'pi pi-bolt',
            success: 'pi pi-check-circle',
            warning: 'pi pi-exclamation-triangle',
            danger: 'pi pi-times-circle',
            info: 'pi pi-info-circle'
        };
        return icons[this.type] || icons.info;
    }

    get colorClasses(): any {
        const colors: Record<AlertType, { container: string, icon: string, closeBtn: string }> = {
            primary: {
                container: 'border-primary bg-primary/5 dark:bg-primary/10',
                icon: 'text-primary dark:text-primary-400',
                closeBtn: 'text-primary hover:bg-primary/10 dark:text-primary-400 dark:hover:bg-primary/20'
            },
            secondary: {
                container: 'border-secondary bg-secondary/5 dark:bg-secondary/10',
                icon: 'text-secondary dark:text-secondary',
                closeBtn: 'text-secondary hover:bg-secondary/10 dark:text-secondary dark:hover:bg-secondary/20'
            },
            success: {
                container: 'border-green-500 bg-green-50 dark:border-green-500/70 dark:bg-green-500/10',
                icon: 'text-green-600 dark:text-green-400',
                closeBtn: 'text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-500/20'
            },
            warning: {
                container: 'border-orange-500 bg-orange-50 dark:border-yellow-500/70 dark:bg-yellow-500/10',
                icon: 'text-orange-600 dark:text-yellow-400',
                closeBtn: 'text-orange-600 hover:bg-orange-100 dark:text-yellow-400 dark:hover:bg-yellow-500/20'
            },
            danger: {
                container: 'border-red-500 bg-red-50 dark:border-red-500/70 dark:bg-red-500/10',
                icon: 'text-red-600 dark:text-red-400',
                closeBtn: 'text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-500/20'
            },
            info: {
                container: 'border-blue-500 bg-blue-50 dark:border-blue-500/70 dark:bg-blue-500/10',
                icon: 'text-blue-600 dark:text-blue-400',
                closeBtn: 'text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-500/20'
            }
        };
        return colors[this.type] || colors.info;
    }
}