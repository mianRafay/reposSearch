export const CONSTANT = {
    PASSWORD_REGEX: /^(?=.*\d)(?=.*[^a-zA-Z]).{8,}$/,
    COLOR_HEX_CODE_REGEX: /^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/i,
    CVV_CVD_RGEX: /^[0-9]{3,4}$/,
};

export const localNameWEB: string = 'UK-ENGLISH-WEB';
export const localName: string = 'UK-ENGLISH';

export const loginUrl: string = '{baseUrl}/log-ind?return_url={return_url}';
export const currencies: { dk: string; usd: string } = {
    dk: 'DKK',
    usd: 'USD',
};

export const AriaCategories: { core: string; queryObj: string; adminTool: string } = {
    core: 'core',
    queryObj: 'object_query',
    adminTool: 'admin_tool',
};

export const ORDER_STATUS = {
    SUCCESS: {
        INITIATED: 'INITIATED',
        PAYMENT: 'PAYMENT AUTHORIZED',
        ACCOUNT: 'ACCOUNT CREATED',
        ACCOUNT_UPDATED: 'ACCOUNT UPDATED',
        ADDRESS_ADDED: 'ADDRESS ADDED',
        PAYMENT_INFO_UPDATED: 'PAYMENT INFO UPDATED',
        BILLING_GROUP: 'BILLING GROUP ADDED',
        BILLING_GROUP_UPDATED: 'BILLING GROUP UPDATED',
        SUBSCRIPTION: 'SUBSCRIPTION ADDED',
    },
    FAILURE: {
        PAYMENT: 'FARPAY FLOW FAILED',
        ACCOUNT: 'ACCOUNT CREATE FLOW FAILED',
        ACCOUNT_UPDATED: 'ACCOUNT UPDATION FLOW FAILED',
        PAYMENT_INFO_UPDATED: 'PAYMENT INFO UPDATION FAILED',
        BILLING_GROUP: 'BILLING GROUP ADDITION FAILED',
        BILLING_GROUP_UPDATED: 'BILLING GROUP UPDATION FAILED',
        SUBSCRIPTION: 'SUBSCRIPTION ADDITION FAILED',
        ADDRESS_ADDED: 'ADDRESS ADDITION FAILED',
        USER_CANCELLED_PAYMENT: 'USER CANCELLED PAYMENT',
        FORCED_ADDRESS: 'FORCED ADDRESS',
        USER_DID_NOT_SAVED_AND_EXIT: 'USER DID NOT SAVE AND EXIT',
        PAYWALL_TIME_LIMITED_GRANT_FAILED: 'PAYWALL_TIME_LIMITED_GRANT_FAILED',
    },
};

export const PrivacyPolicyURL: string = 'https://www.ariasystems.com/privacy-policy/';
export const TsAndCsURL: string = 'https://www.ariasystems.com/legal/';
