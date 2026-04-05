import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import type { Plugin } from "vite";

const VISITS_FILE = path.resolve(__dirname, ".visits.json");

function visitorCounterPlugin(): Plugin {
  return {
    name: "visitor-counter",
    configureServer(server) {
      server.middlewares.use("/api/visits", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");

        let data = { count: 0 };
        try {
          if (fs.existsSync(VISITS_FILE)) {
            data = JSON.parse(fs.readFileSync(VISITS_FILE, "utf-8"));
          }
        } catch {}

        if (req.method === "POST") {
          data.count += 1;
          try {
            fs.writeFileSync(VISITS_FILE, JSON.stringify(data));
          } catch {}
        }

        res.end(JSON.stringify(data));
      });
    },
  };
}

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), visitorCounterPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
