import React from 'react';
import { connect } from 'react-redux';
import { IProps } from './IProps';
import styles from './index.scss';
import { toggleSnackbar } from 'app/actions';
import { Snackbar, SnackbarContent, IconButton, SvgIcon } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { SyntheticEvent } from 'react';
import { Close } from 'assets/icons';

export const useStyles = makeStyles(() =>
    createStyles({
        root: {
            padding: '25px',
            margin: '5%',
            borderRadius: '30px',
            minWidth: '250px',
            maxWidth: '500px',
        },
        message: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
        },
    }),
);

function CustomSnackBar(props: IProps) {
    const { snackBar } = props;
    const handleClose = (event: SyntheticEvent | MouseEvent, reason?: string) => {
        props.toggleSnackbar({ show: false, message: '', type: '' });
        if (reason === 'clickaway') {
            return;
        }
    };

    return (
        <Snackbar
            key={'some msg'}
            anchorOrigin={{
                vertical: snackBar.type == 'info' ? 'top' : 'bottom',
                horizontal: snackBar.type == 'info' ? 'center' : 'left',
            }}
            open={snackBar.show}
            autoHideDuration={5000}
            onClose={handleClose}
        >
            <SnackbarContent
                className={styles[snackBar.type]}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={styles[snackBar.type]}>
                        {snackBar.message}
                    </span>
                }
                action={[
                    <IconButton
                        size="small"
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={styles[snackBar.type]}
                        onClick={handleClose}
                    >
                        <SvgIcon component={Close}></SvgIcon>
                    </IconButton>,
                ]}
            />
        </Snackbar>
    );
}

const mapStateToProps = state => ({
    snackBar: state?.theme?.snackBar ?? {},
});

export default connect(mapStateToProps, { toggleSnackbar })(CustomSnackBar);
