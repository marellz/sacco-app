import homeRoutes from "./_home.js";
import authRoutes from "./_auth.js";
import userRoutes from "./_user.js";
import loanRoutes from "./_loans.js";

import adminLoanApplicationRoutes from "./admin/_loanApplications.js";
import adminLoanRoutes from "./admin/_loans.js";
import adminUserRoutes from "./admin/_users.js";

const routes = new Map([
  ["/", homeRoutes],
  ["/auth", authRoutes],
  ["/user", userRoutes],
  ["/loans", loanRoutes],
  
  // admin
  ["/admin/users", adminUserRoutes],
  ["/admin/loan-applications", adminLoanApplicationRoutes],
  ["/admin/loans", adminLoanRoutes],
]);

const registerRoutes = (app) => {
  routes.forEach((value, key, map) => {
    app.use(key, value);
  });
};

export default registerRoutes;
