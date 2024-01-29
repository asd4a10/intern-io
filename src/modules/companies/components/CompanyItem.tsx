import { ICompany } from "../../../types/ICompany.ts";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// logging
import { addLog } from "../../../firebase/analytics.ts";

interface CompanyItemProps {
  company: ICompany;
}

function CompanyItem({ company }: CompanyItemProps) {
  return (
    <Card
      sx={cardSx}
      elevation={3}
      onClick={() => {
        addLog(`click card for company - ${company.name}`);
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: { xs: "70px", md: "150px" },
          pt: { xs: 5, md: 2 },
        }}
      >
        <img
          width="80%"
          src={company.img}
          alt="green iguana"
          draggable="false"
        />
      </Box>

      <CardContent sx={{ textOverflow: "hidden" }}>
        <Typography gutterBottom variant="h5" component="div">
          {company.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: {
              xs: "block",
              sm: "block",
            },
          }}
        >
          {company.description}
        </Typography>
      </CardContent>

      <CardActions sx={{ mt: "auto" }}>
        <Button
          size="small"
          onClick={() => {
            window.open(company.link, "_blank");
            addLog(`opening link for company - ${company.name}`);
          }}
        >
          Apply
        </Button>
        {/*<Button size="small">Learn More</Button>*/}
      </CardActions>
    </Card>
  );
}

const cardSx = {
  py: 0,
  display: "flex",
  flexDirection: "column",
  // maxWidth: 345,
  height: "100%",
  minHeight: "350px",
  backgroundColor: "#FFFFFF",
};

export default CompanyItem;
