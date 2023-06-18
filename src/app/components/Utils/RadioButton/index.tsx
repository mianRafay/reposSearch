import React from 'react';
import { Radio } from '@material-ui/core';
import { IRadioButtonProps } from './IRadioButtonProps';

export default function RadioButton(props: IRadioButtonProps) {
    const { name, value, onChange, checked } = props;

    return <Radio checked={checked} name={name} value={value} onClick={onChange} color="primary" />;
}
