export type FieldType =
    | 'text'
    | 'textarea'
    | 'selectLabel'
    | 'selectValue'
    | 'selectInput'
    | 'selectMultiple'
    | 'selectFilter';

export interface SelectOption {
    value: any;
    label: string;
}

export interface CustomFormField {
    type: FieldType;
    keyFilter?: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    options?: SelectOption[];
    errorMessages?: Record<string, string>;

    labelTooltip?: string;

    inputTooltip?: string;

    showValueTooltip?: boolean;

    tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';

    tooltipOnHover?: boolean;

    reloadOnOpenIfEmpty?: boolean;

    maxLength?: number;
}

