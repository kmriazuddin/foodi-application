import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import SignUp from "../components/authentication/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import UpdateProfile from "../components/UserInformation/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/Users";
import LogIn from "../components/authentication/LogIn";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageBooking from "../pages/dashboard/admin/manageBooking";
import ManageItem from "../pages/dashboard/admin/ManageItem";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";

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
                path: "/cartPage",
                element: <CartPage />
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
    },
    {
        path: "/login",
        element: <LogIn />
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: "",
                element: <Dashboard />
            },
            {
                path: 'addMenu',
                element: <AddMenu />
            },
            {
                path: 'manageBooking',
                element: <ManageBooking />
            },
            {
                path: 'manageItem',
                element: <ManageItem />
            },
            {
                path: 'updateMenu/:id',
                element: <UpdateMenu />,
                loader: ({ params }) => fetch(`http://localhost:8000/menu/${params?.id}`)
            },
            {
                path: "users",
                element: <Users />
            }
        ]
    }
]);

export default router;