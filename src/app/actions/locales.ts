import { Localization } from 'app/constants/action-types';
import { AppDispatch } from 'app/interfaces/web/Store';

/**
 * @name setLocales
 * @summary set locales
 * @param params
 */
export const setLocales: any = locales => (dispatch: AppDispatch) => {
    dispatch({
        type: Localization.LOCALES,
        payload: locales,
    });
};
