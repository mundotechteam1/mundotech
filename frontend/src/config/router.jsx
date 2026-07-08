import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        /*
        {
            index: true,
            element: <Home />
        }
            */
           {
            path: "login",
            element: <Login />
           }
    ]
  }  
]);
