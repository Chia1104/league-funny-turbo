import swc from "rollup-plugin-swc";
import tsPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";
import path from "path";

const swcPlugin = (() => {
  const plugin = swc({
    test: "ts",
    jsc: {
      parser: {
        syntax: "typescript",
        dynamicImport: true,
        decorators: true,
      },
      target: "es2021",
      transform: {
        decoratorMetadata: true,
      },
    },
  });

  const originalTransform = plugin.transform!;
  // @ts-expect-error
  const transform = function (...args: Parameters<typeof originalTransform>) {
    // @ts-expect-error
    if (!args[1].endsWith("html")) return originalTransform.apply(this, args);
  };

  return { ...plugin, transform };
})();

export default defineConfig({
  // @ts-ignore
  plugins: [tsPaths(), swcPlugin],
  test: {
    setupFiles: ["./setupFile.ts"],
    threads: false,
    environment: "node",
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // esbuild can not emit ts metadata
  esbuild: false,
});
