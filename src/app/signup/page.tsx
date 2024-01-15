"use client";

import React from "react";
import { useForm, SubmitHandler, FieldValue } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchemaType, loginSchema } from "../../models/LoginSchema";
import FormInput from "@/components/Input";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import NextLink from "next/link";
import Image from "next/image";
import { Button, Link, Typography } from "@mui/material";
import axios from "axios";
import { hashPassword } from "../utils/hash-password";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();
type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data: LoginSchemaType) => {
    try {
      const res = await axios.post("/api/auth/sign-up", {
        email: data.email,
        password: data.password,
      });
      if (res.data.status === 401) {
        console.log(res.data.message);
        toast(res.data.message);
        return;
      } else if (res.data.status === 200) {
        console.log(res.data);
        toast(res.data.message);
        return;
      }
      toast(res.data.message);
      return;
    } catch (error: any) {
      console.log(error.code);
      if (error.code === "ECONNREFUSED") {
        toast("Server is not running");
        return;
      }
      if (error.code === "ERR_BAD_RESPONSE") {
        toast("Connection error");
        return;
      }
      toast(error.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component='main' sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>

            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type={isShowPassword ? "text" : "password"}
                id='password'
                autoComplete='current-password'
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='confirm_password'
                label='Confirm Password'
                type={isShowPassword ? "text" : "password"}
                id='password'
              />
              <FormControlLabel
                onClick={() => setIsShowPassword(!isShowPassword)}
                control={<Checkbox value='remember' color='primary' />}
                label='Show Password'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link component={NextLink} href='#'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={NextLink} href='/login'>
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginForm;
