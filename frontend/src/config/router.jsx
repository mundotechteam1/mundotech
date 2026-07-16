import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import AuthorDashboard from "../pages/authorDashboard/AuthorDashboard";
import ManagerDashboard from "../pages/managerDashboard/ManagerDashboard";
import ArticleView from "../pages/articleView/ArticleView";
import Articles from "../pages/articles/Articles";
import ProtectedRouter from "./protectedRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard-author",
        element: (
          <ProtectedRouter requiredRole="AUTHOR">
            <AuthorDashboard />
          </ProtectedRouter>
        ),
      },
      {
        path: "dashboard-manager",
        element: (
          <ProtectedRouter requiredRole="MANAGER">
            <ManagerDashboard />
          </ProtectedRouter>
        ),
      },
      {
        path: "article-view/:id",
        element: <ArticleView />,
      },
      {
        path: "articles",
        element: <Articles />,
      },
    ],
  },
]);
