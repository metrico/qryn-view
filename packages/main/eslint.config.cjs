const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const reactRefresh = require("eslint-plugin-react-refresh");

module.exports = [
    {
        files: ["src/**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parser: tsParser,
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
            "react-refresh": reactRefresh,
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            "react-refresh/only-export-components": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "prefer-const": "off",
        },
    },
];
