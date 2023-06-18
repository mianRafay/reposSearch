import { Root } from 'app/constants/action-types';
import { AppDispatch } from 'app/interfaces/web/Store';

export * from './theme';
export * from './locales';
export * from './git';

/**
 * @name resetStore
 * @summary reset store
 */
export const resetStore = () => (dispatch: AppDispatch) => {
    dispatch({
        type: Root.PURGE,
    });
};
