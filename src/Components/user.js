import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getmydata } from "../service/service";
import { useParams } from "react-router-dom";
import { Paper } from "@mui/material";
import axios from 'axios'

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";


const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  ></Box>
);

//---------------------------------------------User------------------------------------------------------------------

const User = () => {
  //---------------------------------------------------------
  const [userData, setUserData] = useState(null);
  const { id } = useParams();

  const fetchData = async () => {
    const responseData = await getmydata(id);
    setUserData(responseData.data);
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  // console.log(userData);
  //------------------------------------------------------------

  const handleEdit = (item) => {
    setSelectedItem(item);
    console.log(formik.values)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  // Validation schema using Yup
  const validationSchema = Yup.object({
    userName: Yup.string().required("Required"),
    mailID: Yup.string().email("Invalid mail").required("Required"),
    num: Yup.number().positive().integer().required("Required"),
    role: Yup.string().required("Required"),
  });

 
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    userName: userData?.userName || '',
      mailID : userData?.mailID || '',
      num: userData?.num || '',
      role: userData?.role || '',
  });

  const paperstyle = {
    padding: 150,
    height: "40vh",
    width: 500,
    margin: "90px auto",
  };


  const formik = useFormik({
    initialValues: {
      userName: userData?.userName || '',
      mailID : userData?.mailID || '',
      num: userData?.num || '',
      role: userData?.role || '',
    },
    enableReinitialize: true, 
    validationSchema,
    onSubmit: async (values) => {
      handleSave(values);
    },
  });

  const handleSave = async(values) => {
    const responseData = await axios.put(`http://localhost:5000/edit/${userData._id}`, values);
    console.log(responseData)
    setUserData(responseData.data)
    handleClose();
  };

  return (
    <Paper elevation={1} style={paperstyle}>
      <Card sx={{}}>
        {userData?._id && (
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              User ID:{userData._id}
            </Typography>
            <Typography variant="h5" component="div">
              {userData.userName}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5, fontSize: 12 }}>
              {userData.role}
            </Typography>
            <Typography variant="body2">
              {userData.mailID}
              <br />
              {userData.num}
            </Typography>
          </CardContent>
        )}
        <CardActions>
          <Button size="small" onClick={() => handleEdit(userData)}>
            Edit
          </Button>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Data</DialogTitle>
            <DialogContent>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                
                  margin="dense"
                  name="userName"
                  label="Name"
                  type="text"
                  value={formik.values.userName}
                  fullWidth
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.userName && Boolean(formik.errors.userName)
                  }
                  helperText={formik.touched.userName && formik.errors.userName}
                />
                <TextField
                  
                  margin="dense"
                  name="role"
                  label="Role"
                  type="text"
                  value={formik.values.role}
                  fullWidth
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.role && Boolean(formik.errors.role)}
                  helperText={formik.touched.role && formik.errors.role}
              
                />
                <TextField
                  margin="dense"
                  name="mailID"
                  label="Email"
                  type="email"
                  value={formik.values.mailID}
                  fullWidth
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.mailID && Boolean(formik.errors.mailID)}
                  helperText={formik.touched.mailID && formik.errors.mailID}
                />
                <TextField
                
                  margin="dense"
                  name="num"
                  label="Mobile Number"
                  type="tel"
                  value={formik.values.num}
                  fullWidth
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.num && Boolean(formik.errors.num)}
                  helperText={formik.touched.num && formik.errors.num}
                />

                <DialogActions>
                  <Button
                    onClick={handleClose}
                    disabled={formik.isSubmitting}
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" color="primary"> Save </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default User;
