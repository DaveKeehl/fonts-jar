/**
 * @type {import('prettier').Options}
 */
const config = {
  printWidth: 100,
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  trailingComma: "none",
  importOrder: [
    "^react$",
    "^@plasmohq/(.*)$",
    "<THIRD_PARTY_MODULES>",
    "",
    "^~/popup/components/(.*)$",
    "^~/contents/components/(.*)$",
    "",
    "^~/utils/(.*)$",
    "^~/types/(.*)$",
    "^~/mocks/(.*)$",
    "",
    "^(?!.*[.]css$)[./].*$",
    ".css$",
    "",
    "^[./]"
  ]
};

export default config;
