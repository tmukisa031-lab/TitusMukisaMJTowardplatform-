export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "https://titus-backend.vercel.app",
      "/uploads": "https://titus-backend.vercel.app"
    }
  }
});