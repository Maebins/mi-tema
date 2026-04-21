export interface TableColumn {
  field: string;          // La propiedad exacta de tu objeto (ej: 'nombre', 'edad')
  header: string;         // El texto que va en la cabecera (ej: 'Nombre Completo')
  type?: 'text' | 'currency' | 'date' | 'boolean' | 'custom'; // Para saber cómo formatearlo
  width?: string;         // Ancho opcional (ej: '150px')
  sortable?: boolean;     // ¿Se puede ordenar por esta columna?
}