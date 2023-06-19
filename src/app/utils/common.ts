import store from 'app/store';

export const getValidations = () => {
    return {
        messages: {
            required: 'Required!',
        },
        validators: {
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
