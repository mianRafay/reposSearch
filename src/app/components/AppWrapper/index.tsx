import React from 'react';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import Header from 'app/components/AppWrapper/Header';
import Routes from 'app/routes';
import { Container } from '@material-ui/core';
import styles from './index.scss';
import { themeSettings } from 'app/themes';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

function AppWrapper() {
    const { config } = useSelector((state: any) => state.theme);

    const theme = createTheme({
        ...themeSettings(config.primary, config.secondary),
    });

    return (
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <Header />
                <div className={styles.content}>
                    <Container>
                        <Routes />
                    </Container>
                </div>
                <Footer />
            </BrowserRouter>
        </MuiThemeProvider>
    );
}

export default AppWrapper;
