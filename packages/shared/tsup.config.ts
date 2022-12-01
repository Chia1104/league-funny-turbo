import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["utils/index.ts", "types/index.ts", "utils/zod-schema/index.ts"],
  clean: true,
  dts: true,
  outDir: "dist",
  format: ["cjs", "esm"],
});
