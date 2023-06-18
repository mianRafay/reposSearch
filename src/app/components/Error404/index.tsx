import React from 'react';
import { Grid, Container } from '@material-ui/core';
import styles from './index.scss';
import { useNavigate } from 'react-router-dom';
import Button from 'app/components/Utils/Button';

function Error404() {
    const navigate = useNavigate();
    return (
        <Container className={styles.page_404}>
            <Grid container style={{ display: 'block' }}>
                <Grid item sm={12} style={{ textAlign: 'center' }}>
                    <div className={styles.four_zero_four_bg}>
                        <h1 className="text-center ">404</h1>
                    </div>

                    <div className={styles.contant_box_404}>
                        <h3>404</h3>
                        :( Page not found!
                        <br />
                        <Button
                            variant="contained"
                            color="primary"
                            aria-label="Home"
                            onClick={() => navigate('/')}
                            name="Goto to Home"
                        />
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Error404;
