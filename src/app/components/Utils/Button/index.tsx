import React from 'react';
import { Button as ButtonComp } from '@material-ui/core';
import { IButtonProps } from './IButtonProps';
import styles from './index.scss';

export default function Button(props: IButtonProps) {
    const {
        name,
        onClick,
        variant,
        color,
        disabled,
        style,
        fullWidth,
        size,
        endIcon,
        startIcon,
        type = 'button',
    } = props;

    const n = name?.split('<br>') ?? '';

    return (
        <ButtonComp
            type={type}
            key={name}
            onClick={onClick}
            color={color ? color : 'primary'}
            variant={variant ? variant : 'contained'}
            disabled={disabled}
            style={{ ...style }}
            fullWidth={fullWidth}
            size={size}
            className={styles.btn}
            endIcon={endIcon}
            startIcon={startIcon}
        >
            {n[0]}
            <br />
            {n[1]}
        </ButtonComp>
    );
}
