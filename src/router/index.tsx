import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "../modules/welcome/WelcomePage.tsx";
import CompaniesPage from "../modules/companies/views/CompaniesPage.tsx";
import CompanyItem from "../modules/companies/components/CompanyItem.tsx";
import MainPageTemplate from "../modules/welcome/MainPageTemplate.tsx";
import AddCompanyPage from "../modules/companies/views/AddCompanyPage.tsx";
import CompaniesList from "../modules/companies/components/CompaniesList.tsx";

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
        children: [
          {
            path: "/companies",
            element: <CompaniesList />,
          },
          {
            path: "/companies/add",
            element: <AddCompanyPage />,
          },
        ],
      },
      // {
      //   path: "/companies/1",
      //   element: <CompanyItem />,
      // },
      {
        path: "*",
        element: <div>Not found 404</div>,
      },
    ],
  },
]);
