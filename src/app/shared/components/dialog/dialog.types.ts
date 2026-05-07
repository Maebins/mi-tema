import { ButtonType } from "../button/button.type";

export type ModalType = 'submit' | 'confirm' | 'alert';

export interface ModalData {
    title: string;
    message?: string; 
    type: ModalType;
    submitButtonLabel?: string;
    cancelButtonLabel?: string;
    submitButtonType?: ButtonType;
    styles?: { [klass: string]: any };
}
