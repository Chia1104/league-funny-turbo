import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["esm", "cjs"],
  splitting: true,
  dts: true,
  clean: true,
  sourcemap: true,
  minify: true,
  target: "esnext",
  outDir: "dist",
  external: ["react"],
});
