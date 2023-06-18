import React from 'react';
import Styles from './index.scss';

export default function PaperContainer(props: { children: any }) {
    return <div className={Styles.paperContainer}>{...props.children}</div>;
}
