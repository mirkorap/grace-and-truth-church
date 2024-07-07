module.exports = {
  singleQuote: true,
  jsxSingleQuote: true,
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@internal/(.*)$',
    '^[./].*(?<!\\.(c|le|sc)ss)$',
    '^[.]/[-a-zA-Z0-9_]+[.](module)[.](css|scss|less)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    require.resolve('prettier-plugin-tailwindcss'),
    require.resolve('@trivago/prettier-plugin-sort-imports'),
  ],
};
