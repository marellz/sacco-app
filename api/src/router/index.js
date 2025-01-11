import homeRoutes from "./_home.js";
import authRoutes from "./_auth.js";
import userRoutes from "./_user.js";
import adminRoutes from "./_admin.js";
import loanRoutes from "./_loans.js";

const routes = new Map([
  ["/", homeRoutes],
  ["/auth", authRoutes],
  ["/user", userRoutes],
  ["/admin", adminRoutes],
  ["/loans", loanRoutes],
]);

const registerRoutes = (app) => {
  routes.forEach((value, key, map) => {
    app.use(key, value);
  });
};

export default registerRoutes;
