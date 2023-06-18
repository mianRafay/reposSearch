import { Typography } from '@material-ui/core';
import React from 'react';
import LinkedDescription from '../LinkedDescription';
import { ICompHeadingProps } from './ICompHeadingProps';

export default function ComponentHeading(props: ICompHeadingProps) {
    return (
        <div style={{ marginBottom: props.marginBottom ? props.marginBottom : '35px' }}>
            <Typography variant="h1" component="div">
                {props.heading}
            </Typography>
            {!props.link && (
                <Typography
                    variant="body1"
                    component="div"
                    style={{ marginTop: props.descSpacing ? props.descSpacing : '15px' }}
                >
                    <div dangerouslySetInnerHTML={{ __html: props?.description ?? '' }}></div>
                </Typography>
            )}
            {props.link && (
                <LinkedDescription desc={props.description || ''} linkText={props.link.text} link={props.link.href} />
            )}
        </div>
    );
}
