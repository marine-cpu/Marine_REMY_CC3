import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  // General configuration for JS, MJS, CJS, TS, and VUE files
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Your custom rules can go here
    },
  },
  // TypeScript configuration
  {
    files: ["**/*.ts", "**/*.vue"],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
  // Vue-specific configuration
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      'vue': pluginVue,
    },
    rules: {
      ...pluginVue.configs["flat/essential"].rules,
    },
  },
];
