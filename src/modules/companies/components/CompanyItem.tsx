import PropTypes from "prop-types";
import { ICompany } from "../../../types/ICompany.ts";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface CompanyItemProps {
  company: ICompany;
}

function CompanyItem({ company }: CompanyItemProps) {
  return (
    <Card sx={cardSx}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "340px",
          height: "150px",
        }}
      >
        {/*  <CardMedia*/}
        {/*    sx={{ width: "100%", height: "50%", objectFit: "cover" }}*/}
        {/*    image="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"*/}
        {/*    title="green iguana"*/}
        {/*  />*/}
        <img width="300px" src={company.img} alt="green iguana" />
      </Box>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {company.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius
          expedita in laborum repudiandae tempore? Cum molestias nemo quod sit
          tenetur!
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Apply</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

const cardSx = {
  maxWidth: 345,
  // backgroundColor: "secondary",
};

export default CompanyItem;
