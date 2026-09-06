import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { lazyNamed } from "@/helpers/lazyNamed";
import { APP_ROUTES } from "./routes";

const NotFoundPage = lazyNamed(
  () => import("@/features/pages/notFound/NotFoundPage"),
  "NotFoundPage",
);

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      ...APP_ROUTES.map(({ path, element }) => ({
        path,
        element,
      })),
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
