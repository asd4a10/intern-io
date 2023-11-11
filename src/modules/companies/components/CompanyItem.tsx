// import PropTypes from "prop-types";
import { ICompany } from "../../../types/ICompany.ts";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface CompanyItemProps {
  company: ICompany;
}

function CompanyItem({ company }: CompanyItemProps) {
  return (
    <Card sx={cardSx} elevation={3}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "340px",
          height: "150px",
        }}
      >
        <img
          width="300px"
          // height="150px"
          src={company.img}
          alt="green iguana"
          draggable="false"
        />
      </Box>

      <CardContent sx={{ height: "150px" }}>
        <Typography gutterBottom variant="h5" component="div">
          {company.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {company.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => window.open(company.link, "_blank")}
        >
          Apply
        </Button>
        {/*<Button size="small">Learn More</Button>*/}
      </CardActions>
    </Card>
  );
}

const cardSx = {
  maxWidth: 345,
  // backgroundColor: "secondary",
};

export default CompanyItem;
