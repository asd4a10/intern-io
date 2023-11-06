import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import {
  addCompanyToFirestore,
  companiesSize,
  readCompaniesFirestore,
} from "../../../configs/firebase.ts";

type FormState = {
  [key: string]: any; // Add an index signature
};
interface formState {
  name: string;
  description: string;
  link: string;
  img: string;
}

interface errorState {
  name: boolean;
  description: boolean;
  link: boolean;
  img: boolean;
}

const AddCompanyPage = () => {
  const initialFormState: formState = {
    name: "",
    description: "",
    link: "",
    img: "",
  };
  const initialError: FormState = {
    name: false,
    description: false,
    link: false,
    img: false,
  };

  const [formData, setFormData] = useState<formState>(initialFormState);
  const [errors, setErrors] = useState(initialError);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: false,
    });
  };

  const validateFields = (): boolean => {
    return Object.values(formData).every((value) => value !== "");
  };
  const handleSubmit = async () => {
    await readCompaniesFirestore(() => {});
    // console.log(companiesSize);
    addCompanyToFirestore({
      ...formData,
      id: companiesSize,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        // component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: "1rem",
          padding: "2rem",
          border: "1px solid lightgray",
          borderRadius: "10%",
        }}
        // noValidate
        // autoComplete="off"
      >
        <Typography variant={"h4"}>Add new company!</Typography>
        <TextField
          id="company-add-name"
          // fullWidth={true}
          sx={{ width: "100%" }}
          label="Name"
          variant="outlined"
          name="name"
          error={Boolean(errors.name)}
          helperText={errors.name ? "This field is required" : ""}
          value={formData.name}
          onChange={handleInputChange}
        />
        <TextField
          id="company-add-description"
          label="Description"
          variant="outlined"
          name="description"
          error={Boolean(errors.description)}
          helperText={errors.description ? "This field is required" : ""}
          value={formData.description}
          onChange={handleInputChange}
        />
        <TextField
          id="company-add-link"
          label="Link"
          variant="outlined"
          name="link"
          error={Boolean(errors.link)}
          helperText={errors.link ? "This field is required" : ""}
          value={formData.link}
          onChange={handleInputChange}
        />
        <TextField
          id="company-add-img"
          label="Image link"
          variant="outlined"
          name="img"
          error={Boolean(errors.img)}
          helperText={errors.img ? "This field is required" : ""}
          value={formData.img}
          onChange={handleInputChange}
        />
        <Button
          disabled={!validateFields()}
          color="secondary"
          variant="outlined"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default AddCompanyPage;
