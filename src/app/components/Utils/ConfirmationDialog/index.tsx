import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core';
import styles from './index.scss';
import Button from 'app/components/Utils/Button';
import useLocales from 'app/hooks/useLocales';
import { IConfirmationDialogProps } from './IConfirmationDialogProps';

export default function ConfirmationDialog(props: IConfirmationDialogProps) {
    const { onClose, cancelBtnText, okBtnText, open, message, dialogType, title } = props;
    const [Locales] = useLocales('confirmationDialog', 'common');

    const handleCancel = () => {
        onClose('CANCEL');
    };

    const handleOk = () => {
        onClose('OK');
    };

    return (
        <Dialog open={open} maxWidth="sm" aria-labelledby="confirmation-dialog-title">
            {title && (
                <DialogTitle id="confirmation-dialog-title" className={styles.dialogHeading}>
                    {title}
                </DialogTitle>
            )}

            <DialogContent className={styles.dialogContent}>
                <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
            </DialogContent>
            <DialogActions className={styles.dialogActions}>
                {dialogType === 'YN' ? (
                    <>
                        <Button
                            name={Locales.noBtn}
                            variant="outlined"
                            onClick={handleCancel}
                            color="primary"
                            size="small"
                        />

                        <Button
                            name={Locales.yesBtn}
                            variant="contained"
                            onClick={handleOk}
                            color="primary"
                            size="small"
                        />
                    </>
                ) : (
                    <>
                        <Button
                            name={cancelBtnText ? cancelBtnText : 'Cancel'}
                            variant="outlined"
                            onClick={handleCancel}
                            color="primary"
                            size="small"
                        />

                        <Button
                            name={okBtnText ? okBtnText : 'Ok'}
                            variant="contained"
                            onClick={handleOk}
                            color="primary"
                            size="small"
                        />
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
}
