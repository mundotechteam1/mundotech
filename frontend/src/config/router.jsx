import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import AuthorDashboard from "../pages/authorDashboard/AuthorDashboard";
import ManagerDashboard from "../pages/managerDashboard/ManagerDashboard";
import ArticleView from "../components/ArticleView/ArticleView";

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
        element: <AuthorDashboard />,
      },
      {
        path: "dashboard-manager",
        element: <ManagerDashboard />,
      },
      {
        path: "article-view/:id",
        element: <ArticleView />,
      },
    ],
  },
]);
