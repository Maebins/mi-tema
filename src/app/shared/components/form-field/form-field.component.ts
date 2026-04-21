import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
})
export class FormFieldComponent {
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() orientation: 'vertical' | 'horizontal' = 'vertical';
  
  // Recibe el control del formulario para leer sus errores
  @Input() control!: AbstractControl | null;

  // Lógica para saber si mostrar el error (Tocado + Inválido)
  get isInvalid(): boolean {
    return !!(this.control && this.control.invalid && (this.control.dirty || this.control.touched));
  }

  // El cascarón lee el control de Angular y traduce el error a texto humano
  get errorMessage(): string {
    if (!this.control || !this.control.errors) return '';
    
    // Aquí ya tiene la estructura para los validadores más comunes:
    if (this.control.errors['required']) return 'Este campo es obligatorio.';
    if (this.control.errors['email']) return 'Formato de correo inválido.';
    
    // ¡Incluso lee valores dinámicos!
    if (this.control.errors['minlength']) {
        return `Mínimo ${this.control.errors['minlength'].requiredLength} caracteres.`;
    }
    
    return 'Campo inválido.'; // Mensaje genérico por si acaso
  }
}
