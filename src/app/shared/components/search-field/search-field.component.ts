import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss',
})
export class SearchFieldComponent {
  @Input() placeholder: string = 'Buscar...';
  @Input() value: string = '';
  
  // Opciones de Ícono
  @Input() showIcon: boolean = true;
  @Input() iconName: string = 'search';
  
  // Opciones de Botón
  @Input() showButton: boolean = false;
  @Input() buttonText: string = 'Buscar';

  // Evento que avisa al componente padre que debe buscar
  @Output() search = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<string>();

  onInputChange(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.valueChange.emit(val);
  }

  onSearch() {
    this.search.emit(this.value);
  }
}
