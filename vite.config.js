// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: "localhost",
//     port: 3001,
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // default rồi, chỉ để rõ ràng
  },
  server: {
    host: "localhost", // hoặc "0.0.0.0" nếu muốn truy cập từ thiết bị khác
    port: 3001,
    strictPort: true, // lỗi nếu port 3001 đã bị chiếm
    cors: {
      origin: "http://localhost:5000", // hoặc "*" nếu dev chưa quan tâm bảo mật
      credentials: true, // Cho phép gửi cookie cross-origin
    },
    watch: {
      ignored: ["!**/src/**"], // Chỉ theo dõi thư mục /src
    },
  },
});
