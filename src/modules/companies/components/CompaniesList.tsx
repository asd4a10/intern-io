import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { ICompany } from "../../../types/ICompany.ts";
import {
  getCompanyData,
  readCompaniesFirestore,
  writeCompanyData,
} from "../../../configs/firebase.ts";
import CompanyItem from "./CompanyItem.tsx";
import { Grid } from "@mui/material";

CompaniesList.propTypes = {};

function CompaniesList(props) {
  const [companies, setCompanies] = useState<ICompany[]>([]);

  useEffect(() => {
    // getCompanyData(setCompanies); // realtime db
    readCompaniesFirestore(setCompanies); // firestore db
  }, []);

  return (
    <div>
      <h1>Find your best company here</h1>
      <div>Search bar</div>
      <h2>Companies List</h2>
      <Grid container spacing={2}>
        {companies.length > 0 &&
          companies.map((company) => (
            <Grid key={company.id} item xs={6} sm={4} md={3}>
              <CompanyItem company={company} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default CompaniesList;
