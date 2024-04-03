import React, { useEffect, useRef, useState } from "react";
import { ICompany } from "../../../types/ICompany.ts";
import CompanyItem from "./CompanyItem.tsx";
import { FormControlLabel, Grid, List, Switch, Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import SuggestionComponent from "./SuggestionComponent.tsx";
import ScrollToBottomButton from "../../common/ScrollToBottomButton.tsx";
import {
  getApplicationStatuses,
  IApplicationStatusType,
  // clearApplicationStatuses,
} from "../../../db/indexedDatabase.ts";
import jsonData from "../../../db/companies.json";
import CompanyListViewCard from "./CompanyListViewCard.tsx";

CompaniesList.propTypes = {};

function CompaniesList() {
  const [applicationStatuses, setApplicationStatuses] = useState<
    IApplicationStatusType[]
  >([]);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [view, setView] = useState("list");
  // isDetailsVisible
  const [isDetailsVisible, setIsDetailsVisible] = useState(true);
  // useEffect(() => {
  //   readCompaniesFirestore(setCompanies); // firestore db
  // }, []);

  const fetchApplications = async () => {
    // console.log("applications: ", data);
    try {
      const data = await getApplicationStatuses();
      console.log("fetching applications...");
      setApplicationStatuses(data);
    } catch (e) {
      console.log("error while fetching applications...", e);
    }
  };

  useEffect(() => {
    // clearApplicationStatuses();
    fetchApplications();
    setCompanies(jsonData.companies);
  }, []);

  const filterStatuses = (
    companyId: number,
  ): IApplicationStatusType | undefined => {
    const found = applicationStatuses.find(
      (application) => application.companyId == companyId,
    );
    // console.log("found: ", found);
    return found;
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setView(newValue);
    fetchApplications();
    // setIsDetailsVisible(true);
    // console.log(newValue);
  };

  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Typography variant={"h3"}>Find your next Internship here!</Typography>
      </Box>
      <Box sx={{ my: "1rem", textAlign: "center" }}>
        <Typography variant={"h5"}>
          Among {companies.length} Companies at the moment
        </Typography>
      </Box>
      {/*<SuggestionComponent />*/}
      <Box sx={{ borderColor: "divider", mb: 2 }}>
        <Tabs
          value={view}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="List" value="list" />
          <Tab label="Cards" value="cards" />
        </Tabs>
      </Box>
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
            {companies.length > 0 &&
              companies.map((company, index) => (
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
      {view == "list" && (
        <List sx={{ mx: 30, p: 0 }}>
          {companies.length > 0 &&
            companies.map((company, index) => (
              <CompanyListViewCard
                company={company}
                index={index}
                key={company.id}
                status={filterStatuses(company.id)}
              />
            ))}
        </List>
      )}
      <ScrollToBottomButton targetRef={divRef} />
      <div ref={divRef}></div>
    </div>
  );
}

export default CompaniesList;
