module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: module,
        ecmaFeatures: {
            jsx: true,
            modules: true,
            experimentalObjectRestSpread: true,
        },
    },
    extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
    plugins: ['react', 'prettier', 'react-hooks'],
    rules: {
        'react/jsx-props-no-spreading': ['off'],
        'react/state-in-constructor': 0,
        'consistent-return': 0,
        'import/no-named-as-default': 0,
        'import/no-named-as-default-member': 0,
        quotes: 'off',
        'linebreak-style': 'off',
        'react/prop-types': 'off',
        'react/require-default-props': 0,
        'react-hooks/exhaustive-deps': ['error'],
        'react/jsx-filename-extension': [
            1,
            {
                extensions: ['.js', 'jsx'],
            },
        ],
        'prettier/prettier': 'error',
    },
};
