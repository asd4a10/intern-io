import React, { useEffect, useState } from "react";
import { ICompany } from "../../../types/ICompany.ts";
import {
  companiesSize,
  getCompanyData,
  readCompaniesFirestore,
  writeCompanyData,
} from "../../../configs/firebase.ts";
import CompanyItem from "./CompanyItem.tsx";
import {
  FormControl,
  Grid,
  InputAdornment,
  InputBase,
  InputLabel,
  OutlinedInput,
  Paper,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

CompaniesList.propTypes = {};

function CompaniesList(props) {
  const [companies, setCompanies] = useState<ICompany[]>([]);

  useEffect(() => {
    // getCompanyData(setCompanies); // realtime db
    readCompaniesFirestore(setCompanies); // firestore db
  }, []);

  return (
    <div>
      <Box sx={{ my: "1rem", textAlign: "center" }}>
        <Typography variant={"h3"}>Find your next Internship here!</Typography>
      </Box>
      <Box sx={{ my: "1rem", textAlign: "center" }}>
        <Typography variant={"h5"}>
          Among {companiesSize} Companies at the moment
        </Typography>
      </Box>
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
