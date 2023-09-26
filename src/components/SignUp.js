import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";



const userValidationSchema = yup.object({
    name: yup.string()
        .required("Name is mandatory"),
    email: yup.string()
        .required("email is mandatory"),
    password: yup.string()
        .required("password must be atleast 8 characters . there should be atleast one capital letter,specialcase and number")
});

const theme = createTheme();

export default function SignUp() {

    const navigate = useNavigate();

    const [user, setUser] = useState({})
    const formik = useFormik({
        initialValues: {
            name:"",
            email: "",
            password: ""
        },
        validationSchema: userValidationSchema,
        onSubmit: (newUser) => {
            createUser(newUser)
        }
    });

    const createUser = (newUser) => {
        fetch("https://day43-git-master-deepavishali.vercel.app/signup", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                if (res.status === 400) {
                    alert("user already exist")
                }
                else {
                    alert("SignUp successfull,Click ok!")
                    localStorage.setItem("authenticated", true);
                    navigate("/homepage")
                }
            })
            .then((data) => data.json())
            .then((data) => console.log(data)).catch((err) => console.log(err))

        
        setUser({ ...user, ...newUser });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                            id="name"
                            name="name"
                            label="name"
                            variant="outlined"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            style={{ width: '500px' }}
                        />
                        <br />

                        {formik.touched.name && formik.errors.name ? formik.errors.name : ""}
                        <br />
                        <TextField
                            id="email"
                            name="email"
                            label="email"
                            variant="outlined"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            style={{ width: '500px' }}
                        />
                        <br />

                        {formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                        <br />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="password"
                            variant="outlined"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            style={{ width: '500px' }}
                        />
                        {formik.touched.password && formik.errors.password ? formik.errors.password : ""}
                        <br />

                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
