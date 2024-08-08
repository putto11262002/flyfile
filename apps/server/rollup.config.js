import dts from "rollup-plugin-dts";
import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: `src/index.ts`,
    plugins: [typescript({ tsconfig: "./tsconfig.types.json" })],
    external: ["hono"],
    output: [
      {
        dir: "types",
        format: "es",
        sourcemap: true,
      },
    ],
  },
  {
    input: "types/index.d.ts",
    output: { file: "types/bundle.d.ts", format: "es", sourcemap: true },
    plugins: [dts()],
  },
];
