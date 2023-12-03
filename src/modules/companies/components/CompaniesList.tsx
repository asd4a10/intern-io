import { useEffect, useRef, useState } from "react";
import { ICompany } from "../../../types/ICompany.ts";
import {
  companiesSize,
  readCompaniesFirestore,
} from "../../../configs/firebase.ts";
import CompanyItem from "./CompanyItem.tsx";
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Tab,
  Tabs,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SuggestionComponent from "./SuggestionComponent.tsx";
import Button from "@mui/material/Button";
import ScrollToBottomButton from "../../common/ScrollToBottomButton.tsx";

CompaniesList.propTypes = {};

function CompaniesList() {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [view, setView] = useState("cards");

  useEffect(() => {
    readCompaniesFirestore(setCompanies); // firestore db
  }, []);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setView(newValue);
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
      <Box sx={{ mt: "1rem", textAlign: "center" }}>
        <Typography variant={"h5"}>
          Among {companiesSize} Companies at the moment
        </Typography>
      </Box>
      <SuggestionComponent />
      <Box sx={{ borderColor: "divider", mb: 2 }}>
        <Tabs
          value={view}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Cards" value="cards" />
          <Tab label="List" value="list" />
        </Tabs>
      </Box>
      {view == "cards" && (
        <Grid
          container
          alignItems={"stretch"}
          justifyContent={"center"}
          spacing={2}
        >
          {companies.length > 0 &&
            companies.map((company) => (
              <Grid key={company.id} item xs={12} sm={6} md={4} lg={3}>
                <CompanyItem company={company} />
              </Grid>
            ))}
        </Grid>
      )}
      {view == "list" && (
        <List sx={{ mx: 30, p: 0 }}>
          {companies.length > 0 &&
            companies.map((company) => (
              <ListItem
                key={company.id}
                disablePadding
                sx={{ bgcolor: "background.paper", mb: 1 }}
              >
                <ListItemButton
                  disableRipple={true}
                  sx={{ px: 5, cursor: "default" }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar}`}
                      src={company.img}
                      sx={{
                        maxWidth: 50,
                        maxHeight: 50,
                        width: "100%",
                        height: "100%",
                        borderRadius: 0,
                        mr: 3,
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={company.name} />
                  <ListItemSecondaryAction>
                    <Button onClick={() => window.open(company.link, "_blank")}>
                      Apply
                    </Button>
                  </ListItemSecondaryAction>
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      )}
      <ScrollToBottomButton targetRef={divRef} />
      <div ref={divRef}></div>
    </div>
  );
}

export default CompaniesList;
