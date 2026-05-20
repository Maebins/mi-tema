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
                label: 'Patrimonio', 
                children: [
                    {
                        type: 'collapsable',
                        label: 'Dashboard',
                        icon: 'home', 
                        expanded: true,
                        children: [
                            { 
                                type: 'collapsable', 
                                label: 'Analysis', 
                                icon: 'widgets',
                                children: [
                                    { type: 'basic', label: 'Analysis 3', routerLink: ['/dashboard/analysis3'] },
                                    { type: 'basic', label: 'eCommerce 2', routerLink: ['/dashboard/ecommerce'] },
                                ]
                            },
                            { type: 'basic', label: 'eCommerce 1', routerLink: ['/dashboard/ecommerce1'] },
                        ]
                    },
                    { type: 'basic', label: 'Widgets', icon: 'widgets', routerLink: ['/widgets'] },
                    { type: 'basic', label: 'Apps', icon: 'grid_view', routerLink: ['/apps'] },
                ]
            },

            // --- DIVISOR Y GRUPO 2 ---
            //{ type: 'divider' }, 
            { 
                type: 'group', 
                label: 'UI ELEMENTS', 
                children: [
                    { type: 'basic', label: 'Cards', icon: 'credit_card', routerLink: ['/cards'] },
                    { type: 'basic', label: 'Components', icon: 'featured_play_list', routerLink: ['/components'] },
                    { type: 'basic', label: 'Icons', icon: 'insert_emoticon', routerLink: ['/icons'] },
                ]
            },

            // --- DIVISOR Y GRUPO 3 ---
            { type: 'divider' },
            { 
                type: 'group', 
                label: 'FORMS & TABLES', 
                children: [
                    { type: 'basic', label: 'Forms', icon: 'list_alt', routerLink: ['/forms'] },
                    { type: 'basic', label: 'Tables', icon: 'table_chart', routerLink: ['/tables'] },
                ]
            }
        ];
    }
}
