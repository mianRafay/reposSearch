import React from 'react';
import { CircularProgress } from '@material-ui/core';
import styles from './index.scss';
import Loader from 'assets/gifs/loader.gif';

function LoadingSpinner() {
    return (
        <div id="main-loader" className={styles.overlay} style={{ display: 'none' }}>
            <img className={styles.spinner} width="50px" src={Loader} />
        </div>
    );
}

// used for displaying as fallback in suspense
export function FallBackLoadingSpinner() {
    return (
        <div id="main-loader" className={styles.overlay}>
            <CircularProgress className={styles.spinner} size={50} disableShrink />
        </div>
    );
}

export default LoadingSpinner;
