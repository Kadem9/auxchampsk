import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    root: "./assets",
    base: "/assets/",
    build: {
        manifest: true,
        assetsDir: "",
        outDir: "../public/assets/",
        rollupOptions: {
            output: {
                manualChunks: undefined,
            },
            input: {
                "app.js": "./assets/app.js",
            },
        },
    },
});
