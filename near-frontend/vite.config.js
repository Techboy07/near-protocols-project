import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // If you're using React
import tailwindcss from "@tailwindcss/vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [nodePolyfills({ protocolImports: true }), react(), tailwindcss()], // If you're using React
  define: {
    global: "globalThis", // Or 'window' if you must
    // "process.env": {}, // Or '{}' if you prefer an empty object
    // process: "{}", // Or 'undefined' if you need to completely remove it
    // Alternatively, more targeted if you know exactly where global is used:
    // 'process.env': '{}',
    // resolve: {
    //   alias: {},
    // },
  },
  // ... other Vite config
});
