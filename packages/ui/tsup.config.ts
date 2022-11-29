import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["esm", "cjs", "iife"],
  legacyOutput: true,
  dts: true,
  clean: true,
  minify: true,
  target: "esnext",
  outDir: "dist",
  external: ["react"],
});
