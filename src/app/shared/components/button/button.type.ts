export type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'danger' | 'red-custom' | 'help' | 'info' | 'warning';

export type ButtonShape = 'rounded' | 'square' | 'pill';

export interface ActionButtonConfig {
    label?: string;         
    icon?: boolean;          
    iconName?: string;      
    type?: ButtonType;      
    outlined?: boolean;      
    ghost?: boolean;         
    shape?: ButtonShape;     
    disabled?: boolean;      
    loading?: boolean;      
    style?: string;         
    voice?: string;          
    fullWidth?: boolean;   
    nativeType?: 'button' | 'submit' | 'reset'; 
}