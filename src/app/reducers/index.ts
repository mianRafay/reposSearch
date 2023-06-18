import { combineReducers } from 'redux';
import theme from './theme';
import locales from './locales';
import { Root } from 'app/constants/action-types';

const appReducer = combineReducers({
    theme,
    locales
});

const rootReducer = (state, action) => {
    if (action.type == Root.PURGE) {
        state = {
            ...state
        };
    }

    return appReducer(state, action);
};

export default rootReducer;
