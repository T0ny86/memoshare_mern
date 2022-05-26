import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { GoogleLogin } from 'react-google-login'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import GoogleIcon from './GoogleIcon'
import useStyles from "./styles"
import Input from "./Input"
import { signup , signin} from "../../actions/auth"

const initialState = {
    firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
}

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState)


    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(formData)
        if (isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))

        }
    }

    const handleChange = (e) => {
        // [e.target.name] :: is a placeholder for 'key' name in formData object
        // so we can match each key with his value, fo all elements in form
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const switchMode = () => {
        setIsSignup((prevState) => !prevState)
        // handleShowPassword()
        setShowPassword(false)
    }

    const googleSuccess = async (res) => {
        console.log(res)
        const result = res?.profileObj
        const token = res?.tokenId
        try {
            dispatch({ type: 'AUTH', data: { result, token } })
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = (error) => {
        console.log(error)
        console.log("Google Signin was unsuccessful. Try again later")
    }

    return (
        <Container component={"main"} maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5"> {isSignup ? 'Signup' : 'Signin'} </Typography>
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name='email' label="Email Address" handleChange={handleChange} type='email' />
                        <Input name='password' label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} />}
                    </Grid>

                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} >
                        {isSignup ? 'Signup' : 'Signin'}
                    </Button>

                    <GoogleLogin
                        clientId="42722662710-91202lne5a3moakpanlf86c4jjv7dep7.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<GoogleIcon />} variant='contained' >
                                Google Signin
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode} >
                                {isSignup ? "Already have an account? Singin" : "Don't have an account? Signup"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth