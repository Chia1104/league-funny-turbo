import { defineConfig } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve as resolve } from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import { babel } from "@rollup/plugin-babel";

export default defineConfig([
  {
    input: "src/react/index.tsx",
    external: ["react", "react-dom"],
    plugins: [
      typescript(),
      resolve({
        extensions: [".tsx", ".ts", ".js"],
      }),
      babel({
        babelrc: false,
        exclude: "**/node_modules/**",
        presets: ["@babel/preset-react", "@babel/preset-env"],
        plugins: [
          "@babel/plugin-proposal-object-rest-spread",
          "@babel/plugin-syntax-object-rest-spread",
          "@babel/plugin-transform-react-jsx",
          [
            "@babel/plugin-transform-runtime",
            {
              absoluteRuntime: false,
              corejs: false,
              helpers: false,
              regenerator: false,
              useESModules: false,
            },
          ],
        ],
      }),
      commonjs(),
    ],
    output: [
      {
        name: "new-ui",
        file: "./dist/react/index.js",
        format: "umd",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
      {
        name: "new-ui",
        file: "./dist/es/react/index.js",
        format: "es",
      },
      {
        name: "new-ui",
        file: "./dist/lib/react/index.cjs",
        format: "commonjs",
      },
    ],
  },
]);
