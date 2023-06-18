import React from 'react';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import styles from './index.scss';
import { IComponentHeaderProps } from './IComponentHeaderProps';
import { resetStore } from 'app/actions';

function ComponentHeader(props: IComponentHeaderProps) {
    const { title } = props;
    return (
        <div className={styles.header}>
            <Typography variant="h4">{title}</Typography>
        </div>
    );
}

export default connect(null, { resetStore })(ComponentHeader);
