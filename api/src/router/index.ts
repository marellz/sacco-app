import { Express } from "express";
import homeRoutes from "./_home";
import authRoutes from "./_auth";

const routes = new Map([
  ["/", homeRoutes],
  ["/auth", authRoutes],
]);

const registerRoutes = (app: Express) => {
  routes.forEach((value, key, map) => {
    app.use(key, value);
  });
};

export default registerRoutes;
