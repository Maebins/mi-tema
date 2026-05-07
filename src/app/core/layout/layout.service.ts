import { computed, Injectable, signal } from '@angular/core';
import { AppMenuItem } from '../menu/menu.models';

@Injectable({
    providedIn: 'root',
})
export class LayoutService {
    // 1. ESTADOS DEL SIDEBAR (Usando Signals)

    // En desktop, controla si está colapsado (solo iconos) o expandido (iconos + texto)
    // Basado en tu petición, empezará colapsado (true).
    private _isDesktopCollapsed = signal<boolean>(true);
    isDesktopCollapsed = this._isDesktopCollapsed.asReadonly();

    // En mobile, controla si el "drawer" está abierto o cerrado.
    private _isMobileOpen = signal<boolean>(false);
    isMobileOpen = this._isMobileOpen.asReadonly();

    // Señal computada para saber si estamos en modo "mini" (desktop y colapsado)
    // Esto nos servirá para la lógica del hover.
    isMiniMode = computed(() => this._isDesktopCollapsed() && window.innerWidth >= 768); // 1024px es 'lg' en Tailwind

    constructor() {}

    // 2. ACCIONES

    // Alterna el estado colapsado en desktop (clic en hamburguesa)
    toggleDesktopSidebar() {
        this._isDesktopCollapsed.update((state) => !state);
    }

    // Abre/Cierra el drawer en mobile
    toggleMobileSidebar() {
        this._isMobileOpen.update((state) => !state);
    }

    closeMobileSidebar() {
        this._isMobileOpen.set(false);
    }

    // 3. DATOS DEL MENÚ (Ejemplo basado en tus imágenes)
    getMenu(): AppMenuItem[] {
        return [
            { label: 'Patrimonio', title: true }, // Título de sección
            {
                label: 'Dashboard',
                icon: 'home', // Usando Material Symbol Rounded
                routerLink: ['/dashboard'],
                children: [
                    { label: 'Analysis', routerLink: ['/dashboard/analysis'],
                        children: [
                    { label: 'Analysis', routerLink: ['/dashboard/analysis'],
                        children: [
                    { label: 'Analysis', routerLink: ['/dashboard/analysis'] },
                    { label: 'eCommerce', routerLink: ['/dashboard/ecommerce'] },
                ],
                     },
                    { label: 'eCommerce', routerLink: ['/dashboard/ecommerce'] },
                ],
                     },
                    { label: 'eCommerce', routerLink: ['/dashboard/ecommerce'] },
                ],
            },
            { label: 'Widgets', icon: 'widgets', routerLink: ['/widgets'] },
            { label: 'Apps', icon: 'grid_view', routerLink: ['/apps'] },

            { separator: true }, // Línea divisoria
            { label: 'UI ELEMENTS', title: true }, // Título de sección

            { label: 'Cards', icon: 'credit_card', routerLink: ['/cards'] },
            { label: 'Components', icon: 'featured_play_list', routerLink: ['/components'] },
            { label: 'Icons', icon: 'insert_emoticon', routerLink: ['/icons'] },

            { separator: true },
            { label: 'FORMS & TABLES', title: true },

            { label: 'Forms', icon: 'list_alt', routerLink: ['/forms'] },
            { label: 'Tables', icon: 'table_chart', routerLink: ['/tables'] },
        ];
    }
}
