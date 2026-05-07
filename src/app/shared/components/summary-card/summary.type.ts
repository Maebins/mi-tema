export type SummaryVariant = 'primary' | 'secondary' | 'success' | 'warn';

export interface SummaryCardConfig {
    title: string;
    rows: SummaryRow[];
    variant?: SummaryVariant;
}
export interface SummaryRow {
    label: string;
    value: string;
    bold?: boolean;
    color?: string;
}
