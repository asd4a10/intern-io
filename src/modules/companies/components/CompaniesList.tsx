import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { ICompany } from "../../../types/ICompany.ts";
import { getCompanyData, writeCompanyData } from "../../../configs/firebase.ts";

CompaniesList.propTypes = {};

function CompaniesList(props) {
  const [companies, setCompanies] = useState<ICompany[]>([]);

  // writeCompanyData(0, "Apple", "https://www.apple.com/careers/uk/");

  // const data = getCompanyData()

  useEffect(() => {
    getCompanyData(setCompanies);
    // console.log("in tsx", companies);
  }, []);

  return (
    <div>
      <div>Companies List</div>
      <Button variant="contained">Hello world</Button>
      <p>List of companies:</p>
      {companies.length > 0 &&
        companies.map((company) => (
          <div key={company.id}>
            <h6>{company.name}</h6>
            <p>{company.link}</p>
          </div>
        ))}
    </div>
  );
}

export default CompaniesList;
