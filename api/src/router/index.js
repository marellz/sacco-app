import homeRoutes from "./_home.js";
import authRoutes from "./_auth.js";

const routes = new Map([
  ["/", homeRoutes],
  ["/auth", authRoutes],
]);

const registerRoutes = (app) => {
  routes.forEach((value, key, map) => {
    app.use(key, value);
  });
};

export default registerRoutes;
