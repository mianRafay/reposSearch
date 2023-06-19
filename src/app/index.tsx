import React, { useEffect } from 'react';
import LocalizedStrings from 'react-localization';
import { connect } from 'react-redux';
import { setLocales, setConfig } from 'app/actions';
import './index.scss';
import CustomSnackBar from 'app/components/Utils/SnackBar';
import LoadingSpinner from 'app/components/Utils/LoadingSpinner';
import AppWrapper from 'app/components/AppWrapper';

let LocalizationStrings = new LocalizedStrings({
    en: {},
    es: {},
});

function setFaviconIcon(image) {
    const favicon: any = document.getElementById('favicon');
    favicon.href = image;
}

interface IAppProps {
    setLocales?: any;
    setConfig?: any;
}

const App = (props: IAppProps) => {
    useEffect(() => {
        const fetchData = async () => {
       //     const config = await GetConfiguration();
            props.setConfig({primary:"#0E2954",secondary:"#00abe6"});
            const url="https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU";
            setFaviconIcon(url);

            let lang = LocalizationStrings.getLanguage();
            var Locales = require(`app/localization/locales-${lang}.json`);
            await props.setLocales(Locales);
        };
        fetchData();
    }, []);

    return (
        <>
            <AppWrapper />
            <CustomSnackBar />
            <LoadingSpinner />
        </>
    );
};

export default connect(null, { setLocales, setConfig })(App);
