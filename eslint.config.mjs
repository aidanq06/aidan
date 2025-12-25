import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      "*.config.js",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
];

export default eslintConfig;

