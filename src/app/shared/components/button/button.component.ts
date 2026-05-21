import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VoiceGuideDirective } from '../../directives/voice-guide.directive';
import { ButtonModule } from 'primeng/button';
import { ActionButtonConfig } from './button.type';
@Component({
    selector: 'app-button',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        ButtonModule,
        VoiceGuideDirective,
        CommonModule,
    ],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ButtonComponent {
    @Input() config: ActionButtonConfig  = {};

    computedClasses: string = '';

    ngOnInit() {
        this.computedClasses = this.generateClasses();
    }

    generateClasses(): string {
        let classes = this.config.style || '';

        if (!this.config.style) {
       
            if (!this.config.label && this.config.icon) {
                
                classes = 'h-10 w-10 p-0 flex-shrink-0 '; 
            } 
        
            else {
                classes = 'h-10 px-4 ';
                classes += this.config.fullWidth ? 'w-full ' : 'w-full md:w-auto ';
            }
        }

        if (this.config.shape === 'square') {
            classes += 'rounded-md ';
        } else if (this.config.shape === 'pill') {
       
            classes += 'rounded-full '; 
        } else {
            classes += 'rounded-lg ';
        }

        if (this.config.ghost) {
            // -------------------------------------------------------------
            // VARIANTE: BOTÓN FANTASMA 
            // -------------------------------------------------------------
            switch (this.config.type) {
                case 'primary':
                    classes += 'bg-transparent text-primary hover:bg-primary-50 active:bg-primary-100 ' +
                                'dark:text-primary-400 dark:hover:bg-primary-900/30 dark:active:bg-primary-900/50 ';
                    break;
                case 'neutral': 
                classes += 'bg-transparent text-gray-scale-600 hover:bg-gray-scale-100 active:bg-gray-scale-200 ' +
                            'dark:text-gray-scale-300 dark:hover:bg-gray-scale-800 dark:active:bg-gray-scale-700 ';
                break;
                case 'danger':
                case 'red-custom':
                    classes += 'bg-transparent text-error hover:bg-red-custom-50 active:bg-red-custom-100 ' +
                                'dark:text-red-custom-400 dark:hover:bg-red-custom-900/30 dark:active:bg-red-custom-900/50 ';
                    break;
                case 'info': 
                    classes += 'bg-transparent text-azul-custom hover:bg-azul-custom-50 active:bg-azul-custom-100 ' +
                                'dark:text-azul-custom-400 dark:hover:bg-azul-custom-900/30 dark:active:bg-azul-custom-900/50 ';
                    break;
                case 'warning': 
                    classes += 'bg-transparent text-yellow-custom-700 hover:bg-yellow-custom-50 active:bg-yellow-custom-100 ' +
                                'dark:text-yellow-custom-400 dark:hover:bg-yellow-custom-900/30 dark:active:bg-yellow-custom-900/50 ';
                    break;
                default: 
        
                    classes += 'bg-transparent text-gray-scale-600 hover:bg-yellow-custom-50 hover:text-yellow-custom-600 active:bg-yellow-custom-100 ' +
                                'dark:text-gray-scale-300 dark:hover:bg-yellow-custom-900/30 dark:hover:text-yellow-custom-400 dark:active:bg-yellow-custom-900/50 ';
                    break;
            }

        } else if (this.config.outlined) {
            // -------------------------------------------------------------
            // VARIANTE: BOTÓN OUTLINED
            // -------------------------------------------------------------
            classes += 'shadow-button '; 
            
            switch (this.config.type) {
                case 'primary': 
                    classes += 'border border-primary text-primary hover:bg-primary-50 ' +
                                'dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/30 ';
                    break;
                case 'secondary': 
                    classes += 'border border-brown-custom-600 text-brown-custom-700 hover:bg-brown-custom-50 ' +
                                'dark:border-brown-custom-300 dark:text-brown-custom-200 dark:hover:bg-brown-custom-900/40 ';
                    break;
                case 'tertiary': 
                    classes += 'border border-green-custom text-green-custom hover:bg-green-custom-50 ' +
                                'dark:border-green-custom-400 dark:text-green-custom-300 dark:hover:bg-green-custom-900/30 ';
                    break;
                case 'danger':
                    classes += 'border border-danger text-danger hover:bg-red-custom-50 ' +
                                'dark:border-red-custom-500 dark:text-red-custom-400 dark:hover:bg-red-custom-900/30 ';
                    break;
                case 'red-custom':
                    classes += 'border border-error text-red-custom-500 hover:bg-red-custom-50 ' +
                                'dark:border-red-custom-500 dark:text-red-custom-400 dark:hover:bg-red-custom-900/30 ';
                    break;
                case 'info':
                    classes += 'border border-azul-custom text-azul-custom hover:bg-azul-custom-50 ' +
                                'dark:border-azul-custom-400 dark:text-azul-custom-400 dark:hover:bg-azul-custom-900/30 ';
                    break;
                case 'warning':
                    classes += 'border-1/2 border-yellow-custom text-yellow-custom-700 hover:bg-yellow-custom-50 ' +
                                'dark:border-yellow-custom-400 dark:text-yellow-custom-400 dark:hover:bg-yellow-custom-900/30 ';
                    break;
                case 'neutral': 
                default:
                    classes += 'border border-gray-scale-300 dark:border-gray-scale-800 text-gray-scale-700 bg-white hover:bg-gray-scale-100' +
                                'dark:border-gray-scale-800 dark:text-gray-scale-100 dark:bg-dark-scale dark:hover:bg-gray-scale-800 ';
                    break;
            }

        } else {
            // -------------------------------------------------------------
            // VARIANTE: BOTÓN SÓLIDO 
            // -------------------------------------------------------------
            classes += 'shadow-button '; 
            
            switch (this.config.type) {
                case 'primary': 
                    classes += 'bg-primary text-dark-scale-800 hover:bg-primary-600 ' +
                                'dark:bg-primary-500 dark:hover:bg-primary-400 ';
                    break;
                case 'secondary': 
                    classes += 'bg-secondary text-dark-scale hover:bg-secondary-600 ' +
                                'dark:bg-secondary-500 dark:hover:bg-secondary-400 ';
                    break;
                case 'tertiary':
                    classes += 'bg-green-custom text-white-scale hover:bg-green-custom-600 ' +
                                'dark:bg-green-custom-500 dark:hover:bg-green-custom-400 ';
                    break;
                case 'danger':
                case 'red-custom':
                    classes += 'bg-error text-white-scale hover:bg-red-custom-600 ' +
                                'dark:bg-red-custom-600 dark:text-white-scale dark:hover:bg-red-custom-500 ';
                    break;
                case 'info':
                    classes += 'bg-azul-custom text-white-scale hover:bg-azul-custom-600 ' +
                                'dark:bg-azul-custom-500 dark:text-white-scale dark:hover:bg-azul-custom-400 ';
                    break;
                case 'warning':
                    classes += 'bg-yellow-custom text-dark-scale hover:bg-yellow-custom-600 ' +
                                'dark:bg-yellow-custom-500 dark:text-dark-scale dark:hover:bg-yellow-custom-400 ';
                    break;
                case 'neutral':
                default:
                    classes += 'bg-gray-scale-200 text-dark-scale hover:bg-gray-scale-300 ' +
                                'dark:bg-gray-scale-700 dark:text-white-scale dark:hover:bg-gray-scale-600 ';
                    break;
            }
        }

        return classes;
    }
}
