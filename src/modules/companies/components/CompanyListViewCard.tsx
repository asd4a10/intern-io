import React, { useState } from "react";
import {
  Avatar,
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  updateCompanyStatus,
  IDBCompany,
} from "../../../db/indexedDatabase.ts";
import statusDictionary, { statusArray } from "../../../db/statusDictionary.ts";

export interface CompanyListViewCardProps {
  company: IDBCompany;
  index: number;
  updateCompanies: (companyId: number, newStatusId: number) => void;
}

const CompanyListViewCard = ({
  company,
  index,
  updateCompanies,
}: CompanyListViewCardProps) => {
  const [applicationStatus, setApplicationStatus] = useState<number>(
    company.statusId,
  );

  // status application menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectStatus = async (newStatusId: number) => {
    await updateCompanyStatus(company.id, newStatusId);
    setApplicationStatus(newStatusId);
    updateCompanies(company.id, newStatusId);
    console.log("updated status", company.id, newStatusId);
    handleClose();
  };

  return (
    <ListItem
      key={company.id}
      disablePadding
      sx={{ bgcolor: "background.paper", mb: 1, px: 2 }}
    >
      <ListItemButton
        disableRipple={true}
        sx={{ px: { xs: 0, sm: 3, md: 5 }, cursor: "default" }}
      >
        {/*     Ordering index     */}
        <Box sx={{ mr: { sm: 0, md: 2 }, minWidth: { sm: "0px", md: "20px" } }}>
          {index + 1}.
        </Box>

        {/*     Company Logo     */}
        <ListItemAvatar>
          <Avatar
            alt={`Avatar}`}
            src={company.img}
            sx={{
              maxWidth: 50,
              minWidth: 50,
              maxHeight: 50,
              // width: "100%",
              height: "100%",
              borderRadius: 0,
              mr: 3,
            }}
          />
        </ListItemAvatar>

        {/*     Company Name     */}
        <ListItemText>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                minWidth: "120px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {company.name}
            </Box>
            <Box sx={{ ...onlyDesktop }}>
              {company.categories.map((category, index) => (
                <Chip
                  key={index}
                  label={category}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        </ListItemText>

        {/*    Actions Buttons     */}
        <ListItemSecondaryAction sx={horizontalFlex}>
          {/*    Application status     */}
          <Box sx={{ ...onlyDesktop }}>
            {/*    Application status btn     */}
            <Button
              id="application-status-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              color={statusDictionary[applicationStatus].color}
            >
              {statusDictionary[applicationStatus].value}
            </Button>

            {/*    Application status menu     */}
            <Menu
              id="application-status-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {statusArray.map((obj) => (
                <MenuItem
                  key={obj.key}
                  onClick={() => handleSelectStatus(obj.key)}
                >
                  {obj.value}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/*    Career page button     */}
          <Button onClick={() => window.open(company.link, "_blank")}>
            Apply
          </Button>
        </ListItemSecondaryAction>
      </ListItemButton>
    </ListItem>
  );
};

export default CompanyListViewCard;

const onlyDesktop = {
  display: { xs: "none", sm: "block" },
};

const horizontalFlex = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};
