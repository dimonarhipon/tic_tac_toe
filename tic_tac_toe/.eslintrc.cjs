module.exports = {
    env: { browser: true, es2022: true },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'prettier',
    ],
    parser: "babel-eslint",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest', 
        sourceType: 'module'
    },
    plugins: [
        "eslint-plugin-react",
        "eslint-plugin-react-hooks",
        "@next/eslint-plugin-next"
    ],
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        // 'prettier/prettier: "error"
        quotes: ["error", "double"],  // Использовать двойные кавычки.
        semi: ["error", "always"],  // Всегда добавлять точку с запятой в конце утверждения.
        indent: ["error", 2],  // Отступ — это два пробела.
        '@typescript-eslint/quotes': "error",
        'react-refresh/only-export-components': 'warn'
    }
}
