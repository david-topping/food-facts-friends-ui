import { HomePage } from "../features/pages/home/HomePage";

export type AppRoute = {
  path: string;
  label: string;
  element: React.ReactNode;
  showInNav?: boolean;
};

export const APP_ROUTES: AppRoute[] = [
  {
    path: "/",
    label: "Home",
    element: <HomePage />,
    showInNav: true,
  },
  {
    path: "/about",
    label: "About",
    element: <div>About</div>,
    showInNav: true,
  },
  {
    path: "/contact",
    label: "Contact",
    element: <div>Contact</div>,
    showInNav: true,
  },
];
