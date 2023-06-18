import { ThemeTypes } from 'app/constants/action-types';

const initialState = {
    snackBar: { show: false, message: '', type: '' },
    compHeaderTitle: '',
    config: {
        primary_color: '',
        secondary_color: '',
        promo_code: '',
        client_no: '',
        auth_key: '',
        core: '',
        admin_tool: '',
        object_query: '',
        client_collections_acct_group_id: '',
        alt_msg_template_no: '',
        primary_logo: null,
        secondary_logo: null,
    },
};

export default function(state = initialState, action: any) {
    switch (action.type) {
        case ThemeTypes.TOGGLE_SNACKBAR:
            return {
                ...state,
                snackBar: action.payload,
            };
        case ThemeTypes.HEADER_TITLE:
            return {
                ...state,
                compHeaderTitle: action.payload,
            };
        case ThemeTypes.CONFIG:
            return {
                ...state,
                config: action.payload,
            };
        default:
            return state;
    }
}
