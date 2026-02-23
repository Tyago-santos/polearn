/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Caminhos para todos os arquivos que usam classes do Tailwind
    "./src/**/*.{html,js,jsx,ts,tsx,vue,php,razor}",
  ],
  theme: {
    // Para sobrescrever os valores padrão do tema
    // ...
    extend: {
      // Para estender o tema padrão com novos valores
      // ...
    },
  },
  plugins: [
    // Plugins adicionais do Tailwind
  ],
};
