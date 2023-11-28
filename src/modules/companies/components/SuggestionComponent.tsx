import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { addCompanySuggestion } from "../../../firebase/suggestions.ts";

const SuggestionComponent = () => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
    setInputValue("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!inputValue) return;
    try {
      await addCompanySuggestion(inputValue);
      setOpen(false);
      console.log("suggestion sent successfully!");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          px: 1,
        }}
      >
        <Button
          variant="contained"
          disableElevation={true}
          sx={{
            fontWeight: 800,
            textTransform: "none",
            background: "#607D8B",
            my: 1,
          }}
          onClick={handleClickOpen}
        >
          Click here to suggest a company
        </Button>
      </Box>
      <Dialog fullWidth={true} open={open} onClose={handleClose}>
        <DialogTitle>Suggest a company</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of the company below
          </DialogContentText>
          <TextField
            autoFocus
            id="companyName"
            label="Company name"
            type="text"
            fullWidth
            variant="standard"
            autoComplete={"off"}
            onChange={handleInputChange}
            sx={{
              my: 1,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SuggestionComponent;
