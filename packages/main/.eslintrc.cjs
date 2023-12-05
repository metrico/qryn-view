module.exports = {
    env: { browser: true, es2020: true },
    extends: ["plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    plugins: ["react-refresh"],
    rules: {
        "react-refresh/only-export-components": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "prefer-const": "off",
    },
};
