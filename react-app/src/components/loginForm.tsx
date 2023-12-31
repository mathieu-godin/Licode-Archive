import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormErrorMessage from "./common/formErrorMessage";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        licode
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

interface User {
    email: { value: string };
    username: { value: string };
    password: { value: string };
}

export interface LoginFormProps {
    setToken: Function
}

export interface LoginFormState {
    errorMessage: string;
}

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
    constructor(props: LoginFormProps) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { errorMessage: '' };
    }

    async handleSubmit (e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        let user: User = {
            email: { value: '' },
            username: { value: '' },
            password: { value: '' },
        }
        user.email.value = (e.target as typeof e.target & User).email.value;
        user.password.value = (e.target as typeof e.target & User).password.value;
        try {
            let res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            }).then(response => response.json());
            if (res.text) {
                this.setState({ errorMessage: res.text });
            } else {
                this.props.setToken();
            }
        } catch (err) {
            console.log(err);
        } 
    }

    render() {
        const errorMessage  = this.state.errorMessage;
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
                <Avatar sx={{ width: 24, height: 24, bgcolor: 'secondary.main', marginBottom: '4%' }} src="./favicon.ico" variant="rounded" />
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Username or Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    />
                    <Box width="100%">
                        <FormErrorMessage message={errorMessage} />
                    </Box>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Sign In
                    </Button>
                    <Grid container>
                    <Grid item>
                        <Link href="register" variant="body2">
                        {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
            </ThemeProvider>
        );
    }
}

export default LoginForm;