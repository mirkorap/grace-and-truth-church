import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const globals = {
  carrot: {
    '50': '#fffaeb',
    '100': '#fdf0c8',
    '200': '#fbe18c',
    '300': '#f9cb50',
    '400': '#f7b528',
    '500': '#ed920e',
    '600': '#d5700a',
    '700': '#b14d0c',
    '800': '#903c10',
    '900': '#763211',
    '950': '#441804',
  },
  everglade: {
    '50': '#f2f7f4',
    '100': '#e1eae3',
    '200': '#c4d6c9',
    '300': '#9cb9a6',
    '400': '#70977f',
    '500': '#507961',
    '600': '#3c5f4b',
    '700': '#2d4739',
    '800': '#283d32',
    '900': '#213329',
    '950': '#121c17',
  },
};

const aliases = {
  primary: globals.carrot,
  secondary: globals.everglade,
  scaffold: colors.slate[100],
};

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './containers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...globals,
        ...aliases,
      },
    },
  },
};

export default config;
