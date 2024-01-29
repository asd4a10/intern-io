import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
  Alert,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { addCompanySuggestion } from "../../../firebase/suggestions.ts";

const SuggestionComponent = () => {
  const [open, setOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [supporterName, setSupporterName] = useState("");
  const [snackbar, setSnackbar] = useState(false);

  const handleCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(event.target.value);
  };
  const handleSupporterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSupporterName(event.target.value);
  };
  const handleCheckboxChange = () => {
    setAnonymous(!anonymous);
  };
  const handleClickOpen = () => {
    setOpen(true);
    setCompanyName("");
    setAnonymous(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  const handleSubmit = async () => {
    if (!companyName) return;
    try {
      const suggestion = {
        companyName: companyName,
        supporterName: supporterName,
      };
      await addCompanySuggestion(suggestion);
      setOpen(false);
      setSnackbar(true);
      // console.log("suggestion sent successfully!");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="success">Thanks for suggesting company!</Alert>
      </Snackbar>
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
          // size="small"
          sx={{
            fontWeight: 800,
            textTransform: "none",
            // background: "#607D8B",
            background: "#546E7A",
            // color: "black",
            my: 1,
          }}
          onClick={handleClickOpen}
        >
          Suggest Company
        </Button>
      </Box>
      <Dialog fullWidth={true} open={open} onClose={handleClose}>
        <DialogTitle>Suggest missing company</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of the company below if you cannot find it in
            list:
          </DialogContentText>
          <TextField
            autoFocus
            id="companyName"
            label="Company name"
            type="text"
            fullWidth
            variant="outlined"
            autoComplete={"off"}
            onChange={handleCompanyChange}
            sx={{
              my: 1,
            }}
          />
          {/*<DialogContentText>Supporter Pseudonym (Optional):</DialogContentText>*/}
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Anonymous"
              onChange={handleCheckboxChange}
            />
          </FormGroup>
          {!anonymous && (
            <TextField
              autoFocus
              id="companyName"
              label="Your Pseudonym (Optional)"
              type="text"
              fullWidth
              variant="outlined"
              autoComplete={"off"}
              onChange={handleSupporterChange}
              sx={{
                my: 1,
              }}
            />
          )}
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
