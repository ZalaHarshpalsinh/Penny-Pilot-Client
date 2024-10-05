import App from "./App";

import { createBrowserRouter } from "react-router-dom";

import {
    AuthLayout,
    LandingPage,
    LoginPage,
    SignupPage,
    ProfilePage,
    CategoriesPage,
    AccountsPage,
} from "./components";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "/login",
                element: (
                    <AuthLayout authentication={false}>
                        <LoginPage />
                    </AuthLayout>
                ),
            },
            {
                path: "/signup",
                element: (
                    <AuthLayout authentication={false}>
                        <SignupPage />
                    </AuthLayout>
                ),
            },
            {
                path: "/profile",
                element: (
                    <AuthLayout authentication={true}>
                        <ProfilePage />
                    </AuthLayout>
                ),
            },
            {
                path: "/categories",
                element: (
                    <AuthLayout authentication={true}>
                        <CategoriesPage />
                    </AuthLayout>
                ),
            },
            {
                path: "/accounts",
                element: (
                    <AuthLayout authentication={true}>
                        <AccountsPage />
                    </AuthLayout>
                ),
            },
        ],
    },
]);

export default router;
