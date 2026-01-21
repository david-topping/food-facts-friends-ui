import { DonatePage } from "../features/pages/donate/DonatePage";
import { DonationSuccessPage } from "../features/pages/donate/DonationSuccessPage";
import { HomePage } from "../features/pages/home/HomePage";
import { SupportersPage } from "../features/pages/supporters/SupportersPage";
import { ContactPage } from "../features/pages/contact/ContactPage";
import { ServicesPage } from "../features/pages/services/ServicesPage";

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
    path: "/donate",
    label: "How to Donate",
    element: <DonatePage />,
    showInNav: true,
  },
  {
    path: "/donate/success",
    label: "How to Donate",
    element: <DonationSuccessPage />,
    showInNav: false,
  },
  {
    path: "/services",
    label: "What We Offer",
    element: <ServicesPage />,
    showInNav: true,
  },
  {
    path: "/supporters",
    label: "Our Supporters",
    element: <SupportersPage />,
    showInNav: true,
  },
  {
    path: "/contact",
    label: "Contact Us",
    element: <ContactPage />,
    showInNav: true,
  },
];
