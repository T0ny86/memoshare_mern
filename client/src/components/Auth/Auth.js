import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import useStyles from "./styles"
import Input from "./Input"

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleSubmit = () => { }

    const handleChange = () => { }

    const switchMode = () => {
        setIsSignup((prevState) => !prevState)
        handleShowPassword()
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