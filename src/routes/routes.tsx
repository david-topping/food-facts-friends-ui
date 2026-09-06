import { lazyNamed } from "@/helpers/lazyNamed";

const HomePage = lazyNamed(() => import("@/features/pages/home/HomePage"), "HomePage");
const DonatePage = lazyNamed(() => import("@/features/pages/donate/DonatePage"), "DonatePage");
const DonationSuccessPage = lazyNamed(
  () => import("@/features/pages/donate/DonationSuccessPage"),
  "DonationSuccessPage",
);
const ServicesPage = lazyNamed(
  () => import("@/features/pages/services/ServicesPage"),
  "ServicesPage",
);
const SupportersPage = lazyNamed(
  () => import("@/features/pages/supporters/SupportersPage"),
  "SupportersPage",
);
const ContactPage = lazyNamed(() => import("@/features/pages/contact/ContactPage"), "ContactPage");
const BuildingFundPage = lazyNamed(
  () => import("@/features/pages/buildingFund/BuildingFundPage"),
  "BuildingFundPage",
);

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
  {
    path: "/building-fund",
    label: "Buy Our Building",
    element: <BuildingFundPage />,
    showInNav: false,
  },
];
