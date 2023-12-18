import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  // Or if using `src` directory:
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  "./node_modules/@nextui-org/theme/dist/components/button.js", 
  './node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js'

];
export const theme = {
  extend: {},
};
export const darkMode = "class";
export const plugins = [nextui()];
