import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-skeleton-table',
    standalone: true,
    imports: [CommonModule, SkeletonModule, TableModule],
    templateUrl: './skeleton-table.component.html',
})
export class SkeletonTableComponent implements OnInit {
    @Input() rows: number = 5;
    @Input() columns: number = 4;

    rowsArray: number[] = [];
    colsArray: number[] = [];

    ngOnInit() {
        this.rowsArray = Array.from({ length: this.rows }, (_, i) => i);
        this.colsArray = Array.from({ length: this.columns }, (_, i) => i);
    }
}
