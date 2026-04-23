export interface AppMenuItem {
    label?: string; // Texto visible
    icon?: string; // Icono (Material Symbol o PrimeIcon)
    routerLink?: string[]; // Ruta de Angular
    separator?: boolean; // Si es una línea divisoria
    title?: boolean; // Si es un título de sección (ej: "UI ELEMENTS")
    children?: AppMenuItem[]; // Submenús (recursivo)
    expanded?: boolean; // Estado para abrir/cerrar submenús en desktop
}
