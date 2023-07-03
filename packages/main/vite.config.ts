 /// <reference types="vitest" />
 /// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
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
        environment: 'happy-dom'
      },
    build: {
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
                    moment: ["moment"],
                    momentTimeZone: ["moment-timezone"],
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
                        "prismjs",
                        "javascript-time-ago",
                        "json-markup",
                    ],
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
        },
    },
});
