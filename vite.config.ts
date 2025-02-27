import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  return {
    base: command === 'serve' ? '/' : '/react-southkorea-d3map/',
    plugins: [react()],
  };
});
