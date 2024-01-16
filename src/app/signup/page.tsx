"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchemaType, SignupSchemaType, signupSchema } from "../../models/validationSchema";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import NextLink from "next/link";
import {
  Button,
  Link,
  Typography,
  TextField,
  Checkbox,
  Paper,
  Grid,
  Avatar,
  CssBaseline,
  Box,
  FormControlLabel,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const defaultTheme = createTheme();

type Inputs = {
  email: string;
  password: string;
  confirm_password: string;
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<Inputs>({
    defaultValues: { email: "", password: "", confirm_password: "" },
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
  });

  const confirm_password = watch("confirm_password");

  const onSubmit: SubmitHandler<Inputs> = async (data: SignupSchemaType) => {
    if (data.password !== data.confirm_password) {
      setError("confirm_password", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    try {
      const res = await axios.post("/api/auth/sign-up", {
        email: data.email,
        password: data.password,
        confirm_password: data.confirm_password,
      });

      if (res.data.status === 401) {
        console.log(res.data.message);
        toast.error(res.data.message);
      } else if (res.data.status === 200) {
        console.log(res.data);
        toast.success("Successfully signed up!");
        router.push("/login");
      } else if (res.data.status === 404) {
        toast.error(res.data.message);
      }
      if (res.data.status === 406) {
        toast.error(res.data.message);
        return;
      }
    } catch (error: any) {
      console.log(error.code);

      if (error.code === "ECONNREFUSED") {
        toast.error("Server is not running");
      }

      if (error.code === "ERR_BAD_RESPONSE") {
        toast.error("Connection error");
      }

      toast.error(error.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
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
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                autoComplete="email"
                autoFocus
                {...register("email")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                {...register("password")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                id="confirm_password"
                {...register("confirm_password")}
                helperText={errors.confirm_password?.message}
                error={Boolean(errors.confirm_password)}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<VisibilityOff />}
                    checkedIcon={<Visibility />}
                    onClick={() => setShowPassword((prev) => !prev)}
                    color="primary"
                  />
                }
                label="Show password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link component={NextLink} href="#">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={NextLink} href="/login">
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
