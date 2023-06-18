import React, { useEffect, useState, MouseEvent } from 'react';
import { Container, Grid,  makeStyles } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import styles from './index.scss';
import { useSelector } from 'react-redux';
import { getPrimaryColor } from 'app/utils/common';
import useLocales from 'app/hooks/useLocales';
import { Nullable } from 'app/interfaces/common';

const useStyles = makeStyles(() => ({
    menu: {
        '& .MuiPaper-root': {
            backgroundColor: getPrimaryColor(),
            color: '#fff',
            marginTop: '38px',
            overflow: 'hidden',
        },
    },
}));

function Header() {
    const navigate = useNavigate();
    const [logo, setLogo] = useState('');
    const { config } = useSelector((state: any) => state.theme);
  
    useEffect(() => {
        if (config?.primary_logo) {
        }
        const url = `https://www.bloowatch.com/hubfs/Bloowatch_Jan2017/images/bloowatch-logo2.png`;
        setLogo(url);
    }, [config]);

    return (
        <div className={styles.appToolbar}>
            <Container>
                <Grid container>
                    <Grid item xs={12} className={styles.innerGrid} style={{ alignItems: 'center' }}>
                        <div></div>
                        <div style={{ textAlign: 'center' }}>
                            <img src={logo} />
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Header;
