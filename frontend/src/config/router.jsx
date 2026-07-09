import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import AuthorDashboard from "../pages/authorDashboard/AuthorDashboard";
import ManagerDashboard from "../pages/managerDashboard/ManagerDashboard";


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
        path: "dashboard-author",
        element: <AuthorDashboard />,
      },
      {
        path: "dashboard-manager",
        element: <ManagerDashboard />,
      }
    ],
  },
]);