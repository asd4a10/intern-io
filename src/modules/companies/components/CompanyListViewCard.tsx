import React, { useEffect, useState } from "react";
import {
  Avatar,
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
import { ICompany } from "../../../types/ICompany.ts";
import {
  IApplicationStatusType,
  updateApplicationStatus,
  addApplicationStatus,
} from "../../../db/indexedDatabase.ts";
import statusDictionary, { statusArray } from "../../../db/statusDictionary.ts";

export interface CompanyListViewCardProps {
  company: ICompany;
  index: number;
  status: IApplicationStatusType | undefined;
}

const CompanyListViewCard = ({
  company,
  index,
  status,
}: CompanyListViewCardProps) => {
  const [applicationStatus, setApplicationStatus] = useState<number>(0);

  useEffect(() => {
    // console.log(company.name, company.id, status);
    if (status) setApplicationStatus(status.statusId);
  }, [status]);

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
    if (status) {
      await updateApplicationStatus(status.id, newStatusId);
    } else {
      await addApplicationStatus(company.id, newStatusId);
    }
    setApplicationStatus(newStatusId);
    handleClose();
  };

  return (
    <ListItem
      key={company.id}
      disablePadding
      sx={{ bgcolor: "background.paper", mb: 1 }}
    >
      <ListItemButton disableRipple={true} sx={{ px: 5, cursor: "default" }}>
        <Box sx={{ mr: 2 }}>{index + 1}.</Box>
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
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            color="secondary"
          >
            {statusDictionary[applicationStatus]}
          </Button>
          <Menu
            id="basic-menu"
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
            {/*<MenuItem onClick={handleClose}>Profile</MenuItem>*/}
            {/*<MenuItem onClick={handleClose}>My account</MenuItem>*/}
            {/*<MenuItem onClick={handleClose}>Logout</MenuItem>*/}
          </Menu>
          <Button onClick={() => window.open(company.link, "_blank")}>
            Apply
          </Button>
        </ListItemSecondaryAction>
      </ListItemButton>
    </ListItem>
  );
};

export default CompanyListViewCard;
