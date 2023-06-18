import { ThemeTypes } from 'app/constants/action-types';
import { AppDispatch } from 'app/interfaces/web/Store';
import { IGetConfiguration } from 'app/interfaces/web/IGetConfiguration';

export const toggleSnackbar = (payload: any) => (dispatch: AppDispatch) => {
    dispatch({
        type: ThemeTypes.TOGGLE_SNACKBAR,
        payload,
    });
};

export const setConfig = (data: IGetConfiguration) => (dispatch: AppDispatch) => {
    dispatch({
        type: ThemeTypes.CONFIG,
        payload: data,
    });
};
