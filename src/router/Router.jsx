import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import SignUp from "../components/authentication/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import UpdateProfile from "../components/UserInformation/UpdateProfile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/menu",
                element: <PrivateRoute><Menu /></PrivateRoute>
            },
            {
                path: "/updateProfile",
                element: <UpdateProfile />
            }
        ]
    },
    {
        path: "/signUp",
        element: <SignUp />
    }
]);

export default router;