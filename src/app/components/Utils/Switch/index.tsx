import React from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';
import { ISwitchProps } from './ISwitchProps';

export default function CustomSwitch(props: ISwitchProps) {
    const { label, onChange, checked } = props;
    return (
        <FormControlLabel
            control={<Switch checked={checked} onChange={onChange} color="primary" />}
            label={label}
            labelPlacement="start"
        />
    );
}
