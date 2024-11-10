/**
 * @type {import('prettier').Options}
 */
const config = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: false,
  trailingComma: "none",
  bracketSpacing: true,
  bracketSameLine: true,
  plugins: [
    require.resolve("@plasmohq/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-tailwindcss")
  ],
  importOrder: ["^@plasmohq/(.*)$", "^~(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  pluginSearchDirs: false
}

export default config