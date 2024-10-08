import React, { useEffect, useRef, useState } from "react";
import { ICompany } from "../../../types/ICompany.ts";
import CompanyItem from "./CompanyItem.tsx";
import { FormControlLabel, Grid, List, Switch, Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import SuggestionComponent from "./SuggestionComponent.tsx";
import ScrollToBottomButton from "../../common/ScrollToBottomButton.tsx";
import {
  addCompany,
  getCompanies,
  IDBCompany,
  updateCompany,
} from "../../../db/indexedDatabase.ts";
import jsonData from "../../../db/companies.json";
import CompanyListViewCard from "./CompanyListViewCard.tsx";

CompaniesList.propTypes = {};

function CompaniesList() {
  const [companies, setCompanies] = useState<IDBCompany[]>([]);
  const [sortedCompanies, setSortedCompanies] = useState<IDBCompany[]>([]);
  const [view, setView] = useState("list");
  const [isDetailsVisible, setIsDetailsVisible] = useState(true);
  const [isSortEnabled, setIsSortEnabled] = useState(() => {
    const saved = localStorage.getItem("isSortEnabled");
    return saved ? JSON.parse(saved) : false;
  });

  // check if companies from json file are already in the database
  // if lengths is not same, then add them
  // if yes, then fetch them
  // if no companies in the database, add them
  const checkCompanies = async () => {
    const companies = await getCompanies();
    if (companies.length == 0) {
      jsonData.companies.forEach(async (company: ICompany) => {
        await addCompany({ ...company, statusId: 0 });
      });
    } else if (companies.length != jsonData.companies.length) {
      jsonData.companies.forEach(async (company: ICompany) => {
        const companyExists = companies.find(
          (c: ICompany) => c.id == company.id,
        );
        if (!companyExists) {
          await addCompany({ ...company, statusId: 0 });
        }
      });
    } else {
      let comp = "";
      jsonData.companies.forEach(async (company: ICompany) => {
        comp += company.name + " ";
        const companyExists = companies.find(
          (c: ICompany) => c.id == company.id,
        );
        if (!companyExists) {
          await addCompany({ ...company, statusId: 0 });
        } else {
          await updateCompany({ ...company, statusId: companyExists.statusId });
        }
      });
      setTimeout(() => {
        console.log("Companies already exist in the database: ", comp);
      }, 1000);
    }
    setCompanies(await getCompanies());
  };

  const updateCompanyStatusInPlace = (
    companyId: number,
    newStatusId: number,
  ) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === companyId
          ? { ...company, statusId: newStatusId }
          : company,
      ),
    );
  };

  useEffect(() => {
    sortCompanies();
    localStorage.setItem("isSortEnabled", JSON.stringify(isSortEnabled));
  }, [isSortEnabled, companies]);

  useEffect(() => {
    checkCompanies();
  }, []);

  const companiesApplicationStatusComparator = (
    a: IDBCompany,
    b: IDBCompany,
  ): 0 | -1 | 1 => {
    // filter companies by their statusId
    // less statusId comes first
    const statusA = a.statusId;
    const statusB = b.statusId;
    if (statusA < statusB) return -1;
    if (statusA > statusB) return 1;
    return 0;
  };

  const companiesIdComparator = (a: IDBCompany, b: IDBCompany): 0 | -1 | 1 => {
    // filter companies by their statusId
    // less statusId comes first
    const idA = a.id;
    const idB = b.id;
    if (idA < idB) return -1;
    if (idA > idB) return 1;
    return 0;
  };

  const sortCompanies = () => {
    console.log("sorting companies...", isSortEnabled, companies.length);
    if (companies.length > 0) {
      if (!isSortEnabled) {
        setSortedCompanies([...companies].sort(companiesIdComparator));
      } else {
        setSortedCompanies(
          [...companies].sort(companiesApplicationStatusComparator),
        );
      }
      console.log(companies);
    }
  };

  const handleChangeCompaniesView = (
    event: React.SyntheticEvent,
    newValue: string,
  ) => {
    setView(newValue);
    console.log(event);
    // console.log(companies[0].statusId, event);
  };

  const bottomRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const companiesListRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={companiesListRef}>
      {/*     Main title    */}
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Typography ref={topRef} variant={"h3"}>
          Find your next Internship here!
        </Typography>
      </Box>

      {/*     Company count    */}
      <Box sx={{ my: "1rem", textAlign: "center" }}>
        <Typography variant={"h5"}>
          Among {companies.length} Companies at the moment
        </Typography>
      </Box>

      {/*   View selection tabs    */}
      <Box sx={{ borderColor: "divider", mb: 2 }}>
        <Tabs
          value={view}
          onChange={handleChangeCompaniesView}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="List" value="list" />
          <Tab label="Cards" value="cards" />
        </Tabs>
      </Box>

      {/*     Cards view     */}
      {view == "cards" && (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "right", mb: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={isDetailsVisible}
                  onChange={() => setIsDetailsVisible(!isDetailsVisible)}
                />
              }
              label="Details"
            />
          </Box>
          <Grid
            container
            alignItems={"stretch"}
            justifyContent={"center"}
            spacing={2}
          >
            {sortedCompanies.length > 0 &&
              sortedCompanies.map((company, index) => (
                <Grid key={company.id} item xs={6} sm={4} md={3} lg={3}>
                  <CompanyItem
                    company={company}
                    index={index}
                    isDetailsVisible={isDetailsVisible}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
      )}

      {/*     List view     */}
      {view == "list" && (
        <Box sx={{ mx: { xs: 0, sm: 0, md: "10%", lg: "15%" }, p: 0 }}>
          <Box sx={{ display: "flex", justifyContent: "right", mb: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={isSortEnabled}
                  onChange={() => setIsSortEnabled(!isSortEnabled)}
                />
              }
              label="Not applied first"
            />
          </Box>
          <List>
            {sortedCompanies.length > 0 &&
              sortedCompanies.map((company, index) => (
                <CompanyListViewCard
                  company={company}
                  index={index}
                  key={company.id}
                  updateCompanies={updateCompanyStatusInPlace}
                />
              ))}
          </List>
        </Box>
      )}

      {/*     Scroll button     */}
      <ScrollToBottomButton topRef={topRef} bottomRef={bottomRef} />
      <div ref={bottomRef}></div>
    </div>
  );
}

export default CompaniesList;
