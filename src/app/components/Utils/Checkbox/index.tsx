import React from 'react';
import { ICheckboxProps } from './ICheckboxProps';
import { Checkbox, FormControlLabel } from '@material-ui/core';

export default function CustomCheckbox(props: ICheckboxProps) {
    const { checked, onChange, name, value, disabled, style, inputProps, label } = props;
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    disabled={disabled}
                    style={...style}
                    inputProps={...inputProps}
                    onChange={onChange}
                    value={value}
                    name={name}
                    color="primary"
                />
            }
            label={label}
        />
    );
}
