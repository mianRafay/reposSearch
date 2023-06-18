import { TextField, Theme } from '@material-ui/core';
import React from 'react';
import { ITextfieldProps } from './ITextfieldProps';
import { makeStyles } from '@material-ui/core/styles';
import { getPrimaryColor } from 'app/utils/common';

interface StyleProps {
    hasValue: boolean;
    labelMargin: any;
}

const useStyles = makeStyles<Theme, StyleProps>(theme => ({
    root: {
        alignItem: 'baseline',
        borderRadius: '4px',
        '& .MuiFilledInput-root': {
            background: 'rgb(255, 255, 255)',
            border: '1px solid #e2e2e2',
            borderRadius: '4px',
            '&:focus-within': {
                border: `1px solid ${getPrimaryColor()}`,
            },
        },
        '& .MuiInputLabel-root': {
            color: ({ hasValue }) => (!hasValue ? getPrimaryColor() : ''),
            margin: ({ labelMargin }) => (labelMargin ? labelMargin : ''),
        },
    },
}));

export default function CustomTextField(props: ITextfieldProps) {
    const {
        value,
        onChange,
        label,
        name,
        type,
        disabled,
        inputProps,
        InputLabelProps,
        onBlur,
        error,
        helperText,
        style,
        placeholder,
        required,
        labelMargin,
        id,
        isMultipleLine,
    } = props;

    const classes = useStyles({ hasValue: !value, labelMargin });

    return (
        <div style={{ position: 'relative' }}>
            <TextField
                id={id}
                className={classes.root}
                type={type ? type : 'text'}
                name={name}
                label={label}
                value={value ?? ''}
                fullWidth
                onChange={onChange}
                disabled={disabled}
                InputProps={{ ...inputProps, disableUnderline: true }}
                InputLabelProps={InputLabelProps}
                variant="filled"
                onBlur={onBlur}
                error={error}
                helperText={helperText}
                style={...style}
                placeholder={placeholder}
                multiline={isMultipleLine}
            />
            {required && (
                <span style={{ position: 'absolute', right: '10px', top: '5px', color: getPrimaryColor() }}>*</span>
            )}
        </div>
    );
}
