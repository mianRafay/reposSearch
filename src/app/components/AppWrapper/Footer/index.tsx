import React from 'react';
import { Container, Grid } from '@material-ui/core';
import styles from './index.scss';
import useLocales from 'app/hooks/useLocales';
import { getPrimaryColor } from 'app/utils/common';

export default function Footer() {
    const [FooterLocales] = useLocales('footer');

    return (
        <div className={styles.footer} style={{ borderTop: `px solid ${getPrimaryColor()}` }}>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={9} className={styles.desc}>
                        {FooterLocales.desc}
                    </Grid>
                    {/* <Grid item xs={12} sm={3} className={styles.responsibility}>
                        <Typography variant="body1">{FooterLocales.responsibility}</Typography>
                        <img width="140px" style={{ marginTop: '10px' }} src={require('assets/img/footer-img.png')} />
                    </Grid> */}
                </Grid>
            </Container>
        </div>
    );
}
