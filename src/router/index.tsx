import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "../modules/welcome/WelcomePage.tsx";
import CompaniesPage from "../modules/companies/views/CompaniesPage.tsx";
import CompanyItem from "../modules/companies/components/CompanyItem.tsx";
import MainPageTemplate from "../modules/welcome/MainPageTemplate.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPageTemplate />,
    children: [
      {
        path: "/",
        element: <WelcomePage />,
      },
      {
        path: "/companies",
        element: <CompaniesPage />,
      },
      {
        path: "/companies/1",
        element: <CompanyItem />,
      },
      {
        path: "*",
        element: <div>Not found 404</div>,
      },
    ],
  },
]);
