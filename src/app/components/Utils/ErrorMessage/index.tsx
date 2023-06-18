import React from 'react';
import { Typography } from '@material-ui/core';
import { IErrorMessageProps } from './IErrorMessageProps';

export default function ErrorMessage(props: IErrorMessageProps) {
    const { validator, label, value, validationString } = props;
    return validator ? (
        <Typography variant="body2" color="error" style={{ textAlign: 'left' }}>
            {validator.current.message(label, value, validationString ? validationString : 'required')}
        </Typography>
    ) : (
        <></>
    );
}
