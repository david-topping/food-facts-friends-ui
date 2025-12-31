import { DonatePage } from "../features/pages/donate/DonatePage";
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
    path: "/services",
    label: "What We Offer",
    element: <div>Services</div>,
    showInNav: true,
  },
  {
    path: "/our-supporters",
    label: "Our Supporters",
    element: <div>Our Supporters</div>,
    showInNav: true,
  },
  {
    path: "/donate",
    label: "How to Donate",
    element: <DonatePage />,
    showInNav: true,
  },
  {
    path: "/contact",
    label: "Contact Us",
    element: <div>Contact</div>,
    showInNav: true,
  },
];
