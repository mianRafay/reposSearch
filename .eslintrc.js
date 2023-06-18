module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    overrides: [],
    env: {
        es6: true,
        browser: true,
        node: true,
        jest: true,
    },
    settings: {},
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {},
        allowImportExportEverywhere: true,
    },
    rules: {
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-empty-function': ['error', { allow: ['functions', 'arrowFunctions'] }],
        'no-control-regex': 0,
        eqeqeq: ['error', 'smart'],
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
    plugins: [],
    ignorePatterns: ['**/node_modules', 'services/frontend', 'cdk.out', '*.js', '*.d.ts'],
};
