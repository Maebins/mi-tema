export type MenuItemType = 'group' | 'collapsable' | 'basic' | 'divider';

export interface AppMenuItem {
    id?: string;         
    label?: string;      
    type: MenuItemType;  
    icon?: string;
    routerLink?: string[];
    children?: AppMenuItem[];
    expanded?: boolean; 
}
