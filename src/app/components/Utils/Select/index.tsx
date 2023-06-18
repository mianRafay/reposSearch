import { FormControl, InputLabel, MenuItem, Select, Theme } from '@material-ui/core';
import React from 'react';
import { ISelectProps } from './ISelectProps';
import { makeStyles } from '@material-ui/core/styles';
import { getPrimaryColor } from 'app/utils/common';

interface StyleProps {
    hasValue: boolean;
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
        },
    },
}));
export default function CustomSelect(props: ISelectProps) {
    const { handleChange, value, name, id, label, options, required } = props;
    const classes = useStyles({ hasValue: !value });

    return (
        <div style={{ position: 'relative' }}>
            <FormControl fullWidth variant="filled" className={classes.root}>
                <InputLabel id={id}>{label}</InputLabel>
                <Select
                    required={required}
                    name={name}
                    labelId={id}
                    id={id}
                    value={value}
                    label={label}
                    onChange={handleChange}
                    disableUnderline={true}
                >
                    {options.map(option => (
                        <MenuItem key={option.val} value={option.val}>
                            {option.opt}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {required && (
                <span style={{ position: 'absolute', right: '10px', top: '5px', color: getPrimaryColor() }}>*</span>
            )}
        </div>
    );
}
