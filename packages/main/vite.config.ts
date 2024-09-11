/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
import path from "path";
// https://vitejs.dev/config/

export const ignorePlugin = {
    resourceRegExp: /^\.\/locale$/,
    contextRegExp: /moment$/,
};

const customTransformers = [
    {
        test: (id) => {
            return (
                ignorePlugin.resourceRegExp.test(id) &&
                ignorePlugin.contextRegExp.test(id)
            );
        },
        transform: () => "export {}",
    },
];

let configOpts = {
    base: "",
    server: {},
    plugins: [
        basicSsl(),
        react({
            jsxImportSource: "@emotion/react",
            babel: {
                plugins: ["@emotion/babel-plugin"],
            },
        }),
    ],
    test: {
        globals: true,
        environment: "happy-dom",
    },
    optimizeDeps: {
        exclude: ["moment"], // Exclude 'moment' from automatic dependency optimization
        include: ["**/*.+(js|ts)"], // Include JavaScript and TypeScript files for manual dependency optimization
        customTransformers,
    },
    build: {
        base: "",
        sourcemap: false,
        rollupOptions: {
            output: {
                minifyInternalExports: true,
                manualChunks: {
                    react: ["react", "react-dom"],
                    lodash: ["lodash"],
                    reactTable: [
                        "@tanstack/react-table",
                        "@tanstack/match-sorter-utils",
                    ],
                    slate: ["slate", "slate-history", "slate-react"],
                    vendor: [
                        "react-responsive",
                        "react-cookie",
                        "react-router-dom",
                        "react-redux",
                        "redux-thunk",
                        "axios",
                        "@microlink/react-json-view",
                        "date-fns",
                        "nanoid",
                        "javascript-time-ago",
                    ],
                    prismJs: ["prismjs"],
                    dayJs: ["dayjs"],
                    reactDnd: ["react-dnd", "react-dnd-html5-backend"],
                    memoize: [
                        "memoize-one",
                        "lru-memoize",
                        "deep-freeze",
                        "immutability-helper",
                    ],

                    reactSelect: ["react-select"],
                },
            },
        },
    },
    resolve: {
        alias: {
            "@ui/main": path.resolve(__dirname, "src"),
            "@ui/store": path.resolve(__dirname, "store"),
            "@ui/helpers": path.resolve(__dirname, "helpers"),
            "@ui/views": path.resolve(__dirname, "views"),
            "@ui/plugins": path.resolve(__dirname, "plugins"),
            "@ui/sections": path.resolve(__dirname, "sections"),
            "@ui/services": path.resolve(__dirname, "services"),
            "@ui/theme": path.resolve(__dirname, "theme"),
            "@ui/qrynui": path.resolve(__dirname, "qrynui"),
            "@ui/environment": path.resolve(__dirname, "environment"),
            "@util": path.resolve(__dirname, "util"),
        },
    },
};

export default defineConfig(({ mode }) => {
    // this proxy will load origin from .env file if present
    const env = loadEnv(mode, process.cwd(), "");
    const isProxy = env.VITE_API_BASE_URL && env.VITE_API_BASE_URL !== "";
    const proxyApi = isProxy ? env.VITE_API_BASE_URL : "";

    const configProxy = {
        server: {
            proxy: {
                "/api": {
                    target: proxyApi,
                    changeOrigin: env.VITE_API_BASE_URL,
                    secure: false,
                },
                "/loki": {
                    target: proxyApi,
                    changeOrigin: env.VITE_API_BASE_URL,
                    secure: false,
                },
                "/influx": {
                    target: proxyApi,
                    changeOrigin: env.VITE_API_BASE_URL,
                    secure: false,
                },
                "/tempo": {
                    target: proxyApi,
                    changeOrigin: env.VITE_API_BASE_URL,
                    secure: false,
                },
                "/ready": {
                    target: proxyApi,
                    changeOrigin: env.VITE_API_BASE_URL,
                },
            },
        },
    };

    if (isProxy) {
        configOpts.server = configProxy.server;
    }

    return configOpts;
});
