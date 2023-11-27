import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    base: "/",
    plugins: [
        react({
            jsxImportSource: "@emotion/react",
            babel: {
                plugins: ["@emotion/babel-plugin"],
            },
        }),
    ],
    server: {
        open: true,
        port: 3000,
    },
});
