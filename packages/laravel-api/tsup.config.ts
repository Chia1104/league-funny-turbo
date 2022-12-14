import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  splitting: true,
  dts: true,
  clean: true,
  minify: true,
  target: "esnext",
  outDir: "dist",
});
