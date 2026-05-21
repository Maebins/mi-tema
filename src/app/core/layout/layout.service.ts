import { computed, Injectable, signal } from '@angular/core';
import { AppMenuItem } from '../menu/menu.models';

@Injectable({
    providedIn: 'root',
})
export class LayoutService {
    private _isDesktopCollapsed = signal<boolean>(true);
    isDesktopCollapsed = this._isDesktopCollapsed.asReadonly();

    private _isMobileOpen = signal<boolean>(false);
    isMobileOpen = this._isMobileOpen.asReadonly();

    isMiniMode = computed(() => this._isDesktopCollapsed() && window.innerWidth >= 768); // 1024px es 'lg' en Tailwind

    constructor() {}

    toggleDesktopSidebar() {
        this._isDesktopCollapsed.update((state) => !state);
    }

    toggleMobileSidebar() {
        this._isMobileOpen.update((state) => !state);
    }

    closeMobileSidebar() {
        this._isMobileOpen.set(false);
    }

    getMenu(): AppMenuItem[] {
        return [
            // --- GRUPO 1 ---
            { 
                type: 'group', 
                label: 'GENERAL', 
                children: [
                    { type: 'basic', label: 'Dashboard', icon: 'full_stacked_bar_chart', routerLink: ['/general/dashboard'] }
                ]
            },

            // --- DIVISOR Y GRUPO 2 ---
            { type: 'divider' }, 
            { 
                type: 'group', 
                label: 'OBRAS', 
                children: [
                    { type: 'basic', label: 'Obras', icon: 'home', routerLink: ['/obras/obras'] },
                    { type: 'basic', label: 'Importar Presupuesto', icon: 'table_chart', routerLink: ['/obras/importar-presupuesto'] },
                    { type: 'basic', label: 'Metrados Diarios', icon: 'circle_circle', routerLink: ['/obras/metrados-diarios'] },
                    { type: 'basic', label: 'Valorizaciones', icon: 'docs', routerLink: ['/obras/valorizaciones'] },
                    { type: 'basic', label: 'Reporte de avance', icon: 'show_chart', routerLink: ['/obras/reporte-de-avances'] },
                ]
            },

            // --- DIVISOR Y GRUPO 3 ---
            { type: 'divider' },
            { 
                type: 'group', 
                label: ' MAESTROS', 
                children: [
                    { type: 'basic', label: 'Instituciones', icon: 'location_city', routerLink: ['/maestros/instituciones'] },
                    { type: 'basic', label: 'Unidades Ejecutoras', icon: 'garage_home', routerLink: ['/maestros/unidades-ejecutoras'] },
                    { type: 'basic', label: 'Personas', icon: 'group', routerLink: ['/maestros/personas'] },
                ]
            },

            // --- DIVISOR Y GRUPO 4 ---
            { type: 'divider' },
            { 
                type: 'group', 
                label: ' CONFIGURACION', 
                children: [
                    { type: 'basic', label: 'Usuarios', icon: 'person', routerLink: ['/configuracion/usuarios'] },
                    { type: 'basic', label: 'Perfiles', icon: 'lock_person', routerLink: ['/configuracion/perfiles'] },
                    
                ]
            }
        ];
    }
}
