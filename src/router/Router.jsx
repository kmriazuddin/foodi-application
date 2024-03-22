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
import ManageItem from "../pages/dashboard/admin/ManageItem";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Payment from "../pages/payment/Payment";
import Order from "../components/order/Order";
import ManageBooking from "../pages/dashboard/admin/ManageBooking";

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
            },
            {
                path: '/processCheckout',
                element: <Payment />
            },
            {
                path: '/order',
                element: <Order />
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
    // Admin Route
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
                loader: ({ params }) => fetch(`https://foodi-application-server.onrender.com/menu/${params?.id}`)
            },
            {
                path: "users",
                element: <Users />
            }
        ]
    }
]);

export default router;