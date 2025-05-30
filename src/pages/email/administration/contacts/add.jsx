import React from "react";
import { Divider } from "@mui/material";
import { Grid } from "@mui/system";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Layout as DashboardLayout } from "/src/layouts/index.js";
import CippFormPage from "/src/components/CippFormPages/CippFormPage";
import CippFormComponent from "/src/components/CippComponents/CippFormComponent";
import { useSettings } from "../../../../hooks/use-settings";

const AddContact = () => {
  const tenantDomain = useSettings().currentTenant;

  const formControl = useForm({
    mode: "onChange",
    defaultValues: {
      displayName: "",
      firstName: "",
      lastName: "",
      email: "",
      hidefromGAL: false,
    },
  });

  return (
    <CippFormPage
      formControl={formControl}
      queryKey="AddContact"
      title="Add Contact"
      backButtonTitle="Contacts Overview"
      postUrl="/api/AddContact"
      resetForm={true}
      customDataformatter={(values) => {
        // Add tenantDomain to the payload
        return {
          tenantID: tenantDomain,
          firstName: values.firstName,
          lastName: values.lastName,
          displayName: values.displayName,
          email: values.email,
          hidefromGAL: values.hidefromGAL,
        };
      }}
    >
      <Grid container spacing={2}>
        {/* Display Name */}
        <Grid item size={{ md: 10, xs: 12 }}>
          <CippFormComponent
            type="textField"
            label="Display Name"
            name="displayName"
            formControl={formControl}
            validators={{ required: "Display Name is required" }}
          />
        </Grid>

        {/* First Name and Last Name */}
        <Grid item size={{ md: 5, xs: 12 }}>
          <CippFormComponent
            type="textField"
            label="First Name"
            name="firstName"
            formControl={formControl}
          />
        </Grid>
        <Grid item size={{ md: 5, xs: 12 }}>
          <CippFormComponent
            type="textField"
            label="Last Name"
            name="lastName"
            formControl={formControl}
          />
        </Grid>

        <Divider sx={{ my: 2, width: "100%" }} />

        {/* Email */}
        <Grid item size={{ md: 8, xs: 12 }}>
          <CippFormComponent
            type="textField"
            label="Email"
            name="email"
            formControl={formControl}
            validators={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            }}
          />
        </Grid>

        {/* Hide from GAL */}
        <Grid item size={{ md: 4, xs: 12 }}>
          <CippFormComponent
            type="switch"
            label="Hide from Global Address List"
            name="hidefromGAL"
            formControl={formControl}
          />
        </Grid>

        <Divider sx={{ my: 2, width: "100%" }} />
      </Grid>
    </CippFormPage>
  );
};

AddContact.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddContact;
