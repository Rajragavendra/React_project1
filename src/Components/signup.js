import React from "react";
import { Grid2,Avatar,Paper,Link,Button,FormControl,Checkbox, Typography } from "@mui/material";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import TextField from '@mui/material/TextField';
import { useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from "react-router-dom";



const Signup=()=>{

    const paperStyle={padding:10,height:"75vh",width:330,margin:"70px auto"}
    const ele={marginTop:"30px",}
    const avatarstyle={backgroundColor:'#388e3c'}
    const btnStyle={marginTop:"20px", width: '25ch'}

    const navigate=useNavigate()

    const formik=useFormik({
        initialValues:{
            username:'',
            email:'',
            number:'',
            password:'',
            role:'',
        },
        validationSchema:Yup.object({
            username:Yup.string().required('Required'),
            email:Yup.string().email('Invalid mail').required('Required'),
            number:Yup.number().positive().integer().required('Requires'),
            password:Yup.string().min('6').required('Required'),
            role:Yup.string().required("Required")
        }),
        onSubmit:async(values)=>{
           console.log(values)
           try {
            const response = await axios.post('http://localhost:5000/signup', values);
            console.log(response.data);
            navigate('/login');
             // Handle the response
          } catch (error) {
            console.error('Signup failed:', error.response ? error.response.data : error.message);
          }
        }
    })

        
    console.log(formik)

    return (
        <Grid2 >
            <Paper elevation={10} style={paperStyle}>
            <Grid2 align='center' style={ele}>
                <Avatar style={avatarstyle}><PermIdentityIcon/></Avatar>
                <h2>Sign-up</h2>
                <Typography variant="caption">*Fill this form to create account!</Typography>
              
                </Grid2>
                <form onSubmit={formik.handleSubmit}>
                <Grid2 align='center'>
                <TextField 
                id="name" 
                name="username" 
                label="Username" 
                placeholder='Enter Username'
                variant="standard"  
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
                />

                <TextField
                id="email"
                name="email" 
                label="Email id" 
                placeholder='Enter Email' 
                type='email' 
                variant="standard" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                />

                <TextField id="number" 
                name="number" 
                label="Mobile number" 
                placeholder='Enter Mobile Number' 
                type='tel' 
                variant="standard" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.number}
                error={formik.touched.number && Boolean(formik.errors.number)}
                helperText={formik.touched.number && formik.errors.number}
                />

                <TextField 
                id="password" 
                name="password" 
                label="Password" 
                placeholder='Enter password' 
                type='password' 
                variant="standard" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                /> 

                <TextField 
                id="role" 
                name="role" label="Role" 
                placeholder='Enter Role' 
                type='text' 
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.role}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
                /> 

                <Button type="submit" variant="contained" style={btnStyle} color="success" >Signup</Button><br/>
                </Grid2 >
                </form>
            </Paper>
        </Grid2>
    )

}

export default Signup