import { createBrowserRouter } from "react-router-dom";
// import { MainLayout } from "./layouts/MainLayout";
// import { ErrorPage } from "./errors/ErrorPage";
import { HomePage } from "../features/home/HomePage";

export const router = createBrowserRouter([
    {
        // element: <MainLayout />,
        // errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
        ],
    },
]);
