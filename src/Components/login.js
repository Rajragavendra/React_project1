
import React from 'react';
import { Grid2,Paper,Avatar,Button,FormControlLabel,Checkbox, Typography, Link} from '@mui/material'; 
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios'



const Login=()=>{


    const paperstyle={padding:10,height:"60vh",width:300,margin:"90px auto"}
    const ele={marginTop:"50px",}
    const avatarstyle={backgroundColor:'#1976d2'}
    const checkbox={marginLeft:"0"}
    const btnStyle={marginTop:"10px", width: '25ch'}
    const forget={marginTop:"18px"}

    const navigate=useNavigate();
    
    const handleClick = () => {
        navigate('/signup');
      };


    const formik=useFormik({
        initialValues:{
            username:'',
            password:''
        },
        validationSchema:Yup.object({
            username:Yup.string().required('Required'),
            password:Yup.string().min('6').required('Required')
        }),
         onSubmit:async(values)=>{ 
          try {
            const response = await axios.post('http://localhost:5000/login', values);
            const isAdmin=response.data.isAdmin;
            if(isAdmin){
                navigate('/admin')
            }else{
                navigate(`/user/${response.data.id}`);
            }
           
          } catch (error) {
            alert('Login failed: Invalid password');
          }
         }
    
    })  

    return (
        <Grid2 >
            <Paper elevation={5} style={paperstyle}>
                <Grid2 align='center' style={ele}>
                <Avatar style={avatarstyle}><LoginOutlinedIcon/></Avatar>
                <h2>Login</h2>
                </Grid2>

               <form onSubmit={formik.handleSubmit}>
               <Grid2 align='center'>
                <TextField 
                id="name" 
                name='username' 
                label="Username"
                placeholder='Enter Username' 
                variant="standard" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username }
                />

                <TextField 
                id="password" 
                name='password' 
                label="Password" 
                placeholder='Enter password' 
                type='password' 
                variant="standard" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                /> 

                <Button variant="contained" type='submit' style={btnStyle}  >Login</Button><br/>
                <Button variant="outlined"  onClick={handleClick} style={btnStyle}  >Create Account</Button><br/>
                </Grid2 >
               </form>
                
                
                <Grid2>
                    <Typography style={forget}  align='center'>
                        <Link href="#">
                        Forget password?</Link>
                    </Typography>
                </Grid2>
            </Paper>
        </Grid2>

    )
}

export default Login