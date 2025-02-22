import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/Home/HomePage";
import LoginPage from "../Pages/Loginpage/Login";
import RegisterPage from "../Pages/Register_Page/Register";
import Error from "../Pages/ErrorPage/ErrorHandel";
import AddTask from "../AddTask/AddTask";
import ManageTask from "../ManageTask/ManageTask";
import PrivateRouter from "../PrivateRoute/Private";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>, 
    errorElement: <Error></Error>,
    children: [
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "/",
        element: (
          <PrivateRouter>
            <AddTask></AddTask>
          </PrivateRouter>
        ),
      },
      {
        path: "/manageTask",
        element: (
          <PrivateRouter>
            <ManageTask></ManageTask>
          </PrivateRouter>
        ),
      },
      {
        path: "/register",
        element: <RegisterPage></RegisterPage>,
      },
    ],
  },
]);

export default router;
