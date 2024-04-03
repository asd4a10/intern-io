import { ICompany } from "../../../types/ICompany.ts";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// logging
import { addLog } from "../../../firebase/analytics.ts";
import React from "react";
import { Menu, MenuItem } from "@mui/material";

interface CompanyItemProps {
  company: ICompany;
  index: number;
  isDetailsVisible: boolean;
}

function CompanyItem({
  company,
  // index,
  isDetailsVisible,
}: CompanyItemProps) {
  // status application menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
          height: { xs: "70px", md: "100px", lg: "125px" },
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

      <CardContent sx={{ textOverflow: "hidden", pb: 1, textAlign: "start" }}>
        {isDetailsVisible && (
          <Typography component="div">{company.name}</Typography>
        )}
        {isDetailsVisible && (
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
        )}
      </CardContent>

      <CardActions
        sx={{ mt: "auto", display: "flex", justifyContent: "start" }}
      >
        <Button
          size="small"
          onClick={() => {
            window.open(company.link, "_blank");
            addLog(`opening link for company - ${company.name}`);
          }}
        >
          Apply
        </Button>
        {/*<Button*/}
        {/*  id="basic-button"*/}
        {/*  aria-controls={open ? "basic-menu" : undefined}*/}
        {/*  aria-haspopup="true"*/}
        {/*  aria-expanded={open ? "true" : undefined}*/}
        {/*  onClick={handleClick}*/}
        {/*>*/}
        {/*  Status*/}
        {/*</Button>*/}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
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
  minHeight: { xs: "70px", md: "100px", lg: "50px" },
  backgroundColor: "#FFFFFF",
};

export default CompanyItem;
