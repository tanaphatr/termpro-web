module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:@typescript-eslint/recommended", // เพิ่มการตั้งค่าสำหรับ TypeScript
  ],
  parser: "@typescript-eslint/parser", // ใช้ parser สำหรับ TypeScript
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["import", "@typescript-eslint"], // เพิ่ม plugin สำหรับ TypeScript
  rules: {
    "import/named": "error",
    "import/default": "error",
    "import/namespace": "error",
    "import/no-unused-modules": [1, { unusedExports: true }],
    "no-unused-vars": ["error", { vars: "all", args: "after-used", ignoreRestSiblings: false }],
    "@typescript-eslint/no-unused-vars": ["error", { vars: "all", args: "after-used", ignoreRestSiblings: false }], // เพิ่มกฎนี้
    "@typescript-eslint/no-unused-imports": "error",
  },
};
