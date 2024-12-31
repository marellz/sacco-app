import homeRoutes from "./_home.js";
import authRoutes from "./_auth.js";
import userRoutes from "./_user.js";

const routes = new Map([
  ["/", homeRoutes],
  ["/auth", authRoutes],
  ["/user", userRoutes],
]);

const registerRoutes = (app) => {
  routes.forEach((value, key, map) => {
    app.use(key, value);
  });
};

export default registerRoutes;
