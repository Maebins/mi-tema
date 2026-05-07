export interface TableColumn {
    header: string;
    field: string;
    type?: 'text' | 'date';
    editable?: boolean;
    width?: string;
}