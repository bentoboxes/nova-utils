import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";
import buble from "rollup-plugin-buble";

const plugins = [
  resolve(), // so Rollup can find `ms`
  commonjs(), // so Rollup can convert `ms` to an ES module
  babel({
    exclude: "node_modules/**",
    presets: [
      [
        "@babel/env",
        {
          targets: {
            edge: "17",
            firefox: "60",
            chrome: "67",
            safari: "11.1",
            ie: "11"
          },
          useBuiltIns: "usage",
          modules: "auto"
        }
      ]
    ]
  }),
  buble()
];
export default [
  // browser-friendly UMD build
  {
    input: "src/index.js",
    output: {
      name: "NovaUtils",
      file: pkg.unpkg,
      format: "iife"
    },
    plugins
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: "src/index.js",
    // external: ['moment'],
    output: [
      { file: pkg.main, format: "umd", name: "nova-utils.bundle.umd" },
      { file: pkg.module, format: "es" }
    ],
    plugins
  }
];
