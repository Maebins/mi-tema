import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TabItem {
    id: string;
    label: string;
    icon?: string; 
    disabled?: boolean;
}

@Component({
    selector: 'app-tabs',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tabs.component.html'
})
export class TabsComponent {
    
    @Input() items: TabItem[] = [];

    @Input() activeId: string = '';
    
    @Output() activeIdChange = new EventEmitter<string>();

    selectTab(id: string, disabled?: boolean) {
        if (disabled) return;
        this.activeId = id;
        this.activeIdChange.emit(id);
    }
}