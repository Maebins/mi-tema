import { Component, inject, Input } from '@angular/core';
import { AppMenuItem } from '../../core/menu/menu.models';
import { LayoutService } from '../../core/layout/layout.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-sidebar-item',
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './sidebar-item.component.html',
    styleUrl: './sidebar-item.component.scss',
})
export class SidebarItemComponent {

    @Input() item!: AppMenuItem;

    @Input() level: number = 0;

    layoutService = inject(LayoutService);

    get paddingLeft(): string {
       
        return `${1 + (this.level * 1.5)}rem`;
    }
}
