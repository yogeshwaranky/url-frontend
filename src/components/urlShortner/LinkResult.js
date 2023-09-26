import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState ,useEffect} from 'react';
import { useFormik } from "formik";
import * as yup from "yup";

const userValidationSchema = yup.object({
    url: yup.string()
        .required("Url is required"),

});

const theme = createTheme();

export default function LinkResult() {

    const [shortLink, setShortLink] = useState("")
    const [copied,setCopied]=useState(false)

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setCopied(false);
        },1000);
        return ()=>clearTimeout(timer)
    },[copied]);

    const formik = useFormik({
        initialValues: {
            url: "",
        },
        validationSchema: userValidationSchema,
        onSubmit: (newUrl) => {
            shortUrl(newUrl)
        }
    });

    const shortUrl = (newUrl) => {
        fetch("https://s-n.vercel.app/generateShortURL", {
            method: "POST",
            body: JSON.stringify(newUrl),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                if (res.status === 400) {
                    alert("something went wrong")
                    console.log(res.id)
                }
                else {
                    return res.json();
                }
            })
            .then((response) => {
                alert("Url shortened successfully!!");
                setShortLink(`https://s-n.vercel.app/url/${response.id}`)
            })
            .catch((err) => console.log(err))
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    
                    <p><b>{shortLink}</b></p>
                     <CopyToClipboard
                     text={shortLink}
                     >

                     <Button 
                     type="click" 
                     variant="contained">
                     Copy to clipBoard
                    </Button>

                     </CopyToClipboard>
                   
                    
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            id="url"
                            url="url"
                            label="url"
                            variant="outlined"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.url}
                            style={{ width: '500px' }}
                        />
                        <br />

                        {formik.touched.url && formik.errors.url ? formik.errors.url : ""}
                        <br />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Shorten
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