import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import styles from './index.scss';
import { IDialogContainerProps } from './IDialogContainerProps';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = bg =>
    makeStyles(theme => ({
        paper: {
            backgroundColor: bg,
        },
    }));

function PaperComponent(props: PaperProps) {
    return <Paper {...props} />;
}
function DialogContainer(props: IDialogContainerProps) {
    const classes = useStyles(props.bg);
    return (
        <>
            <Dialog
                open={true}
                fullWidth={true}
                maxWidth={props.maxWidth}
                onBackdropClick={props.onBackdropClick}
                onClose={props.onClose}
                PaperComponent={PaperComponent}
                classes={classes(props.bg)}
            >
                <DialogTitle className={styles.dialogHeading}>{props.dialogTitle}</DialogTitle>
                <DialogContent ref={props.myRef} className={styles.dialogContent}>
                    {props.dialogContent()}
                </DialogContent>
                {props.dialogActions && (
                    <DialogActions className={styles.dialogActions}>{props.dialogActions()}</DialogActions>
                )}
            </Dialog>
        </>
    );
}

export default DialogContainer;
