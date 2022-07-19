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
import { getConstantValue } from 'typescript';

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 256;
const NUM_PASSWORD_SOFT_REQS = 2;


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

interface User {
  email: { value: string };
  username: { value: string };
  password: { value: string };
  confirmpassword: { value: string };
}

const theme = createTheme();

export interface RegisterFormProps {
    setToken: Function
}

export interface RegisterFormState {
    email: string;
    username: string;
    password: string;
    confirmpassword: string;
    errorMessage: string;
    validationMessages: {username: string, email: string, password: string, confirmpassword: string};
}

class RegisterForm extends React.Component<RegisterFormProps, RegisterFormState> {
    constructor(props: RegisterFormProps) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.state = { email: '', username: '', password: '', confirmpassword: '', errorMessage: '', 
            validationMessages: {username: '', email: '', password: '', confirmpassword: ''}
        };
    }
    
    async handleSubmit (e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        if (this.validateForm()) {
            let user: User = {
                email: { value: this.state.email },
                username: { value: this.state.username },
                password: { value: this.state.password },
                confirmpassword: { value: this.state.confirmpassword },
            }
            try {
                let res = await fetch('/api/register', {
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
    }

    //update state and validate after
    //any input changes
    handleUserInput(e : React.FormEvent<HTMLFormElement>) {
        const inputTarget = e.target as EventTarget & HTMLInputElement;
        const field = inputTarget.name;
        const value = inputTarget.value;
        var stateObj : any = {[field] : value};
        this.setState(stateObj, () => { this.validateField(field, value) });
    }

    //called with annoying = false by handleUserInput to
    //warn user of errors
    //called with annoying = true by handleSubmit
    //to find ALL errors
    //use if(!annoying) {
    //      allow obviously invalid input as to not annoy user
    //    }
    validateField(fieldName: string, value: string, annoying: boolean = false) {
        var valMsgs = this.state.validationMessages;
        switch (fieldName) {
            case 'password':
                if (!annoying && value.length === 0) {
                    //don't want to annoy the user, they know an empty password is invalid
                    valMsgs.password = '';
                } else if (value.length < MIN_PASSWORD_LENGTH) {
                    valMsgs.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
                } else if (value.length > MAX_PASSWORD_LENGTH) {
                    valMsgs.password = `Password must be at most ${MAX_PASSWORD_LENGTH} characters`
                } else {
                    //must meet NUM_PASSWORD_SOFT_REQS of 4 requirements
                    var hasLower = /[a-z]/.test(value);
                    var hasUpper = /[A-Z]/.test(value);
                    var hasDigit = /\d/.test(value);
                    var hasSpecial = /[^a-zA-Z\d]/.test(value);
                    var softReqsMet = 0;
                    if (hasLower) softReqsMet++
                    if (hasUpper) softReqsMet++
                    if (hasDigit) softReqsMet++
                    if (hasSpecial) softReqsMet++
                    if (softReqsMet < NUM_PASSWORD_SOFT_REQS) {
                        valMsgs.password = `Password must have at least ${NUM_PASSWORD_SOFT_REQS} of the following:
                                at least 1 lower case letter
                                at least 1 upper case letter
                                at least 1 number
                                at least 1 special character.`;
                    } else {
                        valMsgs.password = ''
                    }
                }
                break;
            case 'confirmpassword':
                if (!annoying && (value === "" || this.state.password === "")) {
                    valMsgs.confirmpassword = ''
                } else if (this.state.password !== value) {
                    valMsgs.confirmpassword = "Passwords do not match";
                } else {
                    valMsgs.confirmpassword = '';
                }
                break;
            case 'username':
                //validate username
                break;
            case 'email':
                //validate email
                break;
            default:
                break;
        }
        this.setState({validationMessages: valMsgs}, () => {
            //revalidate confirmpassword if password was validated
            if (fieldName === "password") {
                this.validateField("confirmpassword", this.state.confirmpassword);
            }
        });
    }
    
    validateForm () : boolean {
        this.validateField("username", this.state.username, true);
        this.validateField("email", this.state.email, true);
        this.validateField("password", this.state.password, true);
        this.validateField("confirmpassword", this.state.confirmpassword, true);

        return this.state.validationMessages.username === ""
            && this.state.validationMessages.email === "" 
            && this.state.validationMessages.password === ""
            && this.state.validationMessages.confirmpassword === "";
    }

    render() {
        const errorMessage  = this.state.errorMessage;
        const passwordValMessage = this.state.validationMessages.password;
        const confPasswordValMessage = this.state.validationMessages.confirmpassword;
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
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={this.handleSubmit} onChange={this.handleUserInput} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        value={this.state.username}
                        autoComplete="username"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={this.state.email}
                        autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={this.state.password}
                        autoComplete="new-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormErrorMessage message={passwordValMessage} keepFormatting={true} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        name="confirmpassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmpassword"
                        value={this.state.confirmpassword}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormErrorMessage message={confPasswordValMessage} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormErrorMessage message={errorMessage} />
                    </Grid>
                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="signin" variant="body2">
                        Already have an account? Sign in
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
            </ThemeProvider>
        );
    }
}

export default RegisterForm;