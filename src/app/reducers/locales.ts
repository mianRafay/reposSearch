import { Localization } from 'app/constants/action-types';

const initialState = {
    locales: {},
};

export default function(state = initialState, action: any) {
    switch (action.type) {
        case Localization.LOCALES:
            return {
                ...state,
                locales: action.payload,
            };
        default:
            return state;
    }
}
