module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended'
    ],
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        '@typescript-eslint',
        'react'
    ],
    'rules': {
        '@typescript-eslint/no-explicit-any': ['off'],
        
        'linebreak-style': ['error', 'unix'],

        // 使用单引号
        'quotes': ['error', 'single'],

        // 使用分号结尾
        'semi': ['error', 'always'],

        // 缩进风格
        'indent': ['error', 4],

        // 禁止使用 console
        'no-console': 2,

        // 比如import {Route} ，{} 两侧 无空格
        'object-curly-spacing': ['error', 'never'],

        // 注释前要加空格
        'space-infix-ops': 'error',

        // 不允许非空数组里面有多余的空格
        'array-bracket-spacing': [2, 'never'],

        // 不允许在对象中出现多余空格
        'no-multi-spaces': [2, {exceptions: {'ObjectExpression': true}}],
    }
};
