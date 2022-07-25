import { resolve } from "path";

export default {
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "h.f"
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        admin: resolve(__dirname, "admin.html")
      }
    }
  },
  resolve:{
    alias: {
      // "@omiu": resolve(__dirname, "node_modules/omiu"),
    }
  }
};
