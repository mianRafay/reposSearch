import { CONSTANT } from 'app/constants';
import store from 'app/store';

export const getValidations = () => {
    return {
        messages: {
            required: 'Required!',
        },
        validators: {
            passwordValidation: {
                message:
                    'Your password must be at least 8 characters long and contain at least one number and one letter.',
                rule: val => {
                    return CONSTANT.PASSWORD_REGEX.test(val);
                },
                required: true,
            },
            isPhoneNoValid: {
                message: 'This must be 8 digits',
                rule: (val, params) => {
                    let regex = new RegExp(/^([0-9_-]){8}$/);
                    return regex.test(val);
                },
            },
            hexCode: {
                message: 'Value should be a valid color hex code',
                rule: (val, params) => {
                    let regex = new RegExp(CONSTANT.COLOR_HEX_CODE_REGEX);
                    return regex.test(val) && params.indexOf(val) === -1;
                },
            },
            cvvcvd: {
                message: 'Value should be a valid CVV / CVD',
                rule: val => {
                    let regex = new RegExp(CONSTANT.CVV_CVD_RGEX);
                    return regex.test(val);
                },
            },
        },
    };
};

export const getPrimaryColor = () => {
    const { config } = store.getState().theme;
    return config.primary_color || '#00abe6';
};

export const getSecondayColor = () => {
    const { config } = store.getState().theme;
    return config.secondary_color || '#35bb5c';
};

export const getTitleCodeText = () => {
    return 'Bloowatch';
};

export const getTitleDomain = () => {
    return 'Bloowatch';
};

export const getImagePlaceholder = () => {
    return require('assets/img/image_icon.png');
};
