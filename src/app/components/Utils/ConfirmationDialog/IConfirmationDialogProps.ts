export interface IConfirmationDialogProps {
    open: boolean;
    onClose: any;
    message?: string;
    cancelBtnText?: string;
    okBtnText?: string;
    dialogType?: string;
    title?: string;
}
