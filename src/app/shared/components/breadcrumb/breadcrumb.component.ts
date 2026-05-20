import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
} from '@angular/core';
import { RouterModule } from '@angular/router';

export interface BreadcrumbItem {
    label: string;
    url: string;
    isCurrent: boolean;
}
@Component({
    selector: 'app-breadcrumb',
    imports: [CommonModule, RouterModule],
    standalone: true,
    templateUrl: './breadcrumb.component.html',
    styleUrl: './breadcrumb.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent implements OnChanges {

    @Input() items: BreadcrumbItem[] = [];

    public visibleItems: BreadcrumbItem[] = [];

    private readonly desktopLimit = 5;
    private readonly mobileLimit = 4;

    ngOnChanges(): void {
        this.visibleItems = this.applyTruncation(this.items);
    }

    private applyTruncation(items: BreadcrumbItem[]): BreadcrumbItem[] {
        const limit = this.getScreenLimit();

        if (items.length > limit) {
            const first = items[0];

            const secondToLast = items[items.length - 2];

            const last = items[items.length - 1];

            const ellipsis: BreadcrumbItem = {
                label: '...',
                url: '#',
                isCurrent: false,
            };

            return [first, ellipsis, secondToLast, last];
        }

        return items;
    }

    private getScreenLimit(): number {
        return this.mobileLimit;
    }
}
