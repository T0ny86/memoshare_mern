import React, { useEffect, useState } from "react"
import { Link, useHistory, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core"

import imgMemo from "../../images/memories.png";
import useStyles from "./styles"

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    useEffect(() => {
        const token = user?.token
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        history.push("/")
        setUser(null)
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit" >
            <div className={classes.brandContainer} >
                <Typography component={Link} to="/" className={classes.heading} variant="h3" align="center" > MemosShare </Typography>
                <img className={classes.image}
                    src={imgMemo} alt="memos" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile} >
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl} >
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6" >
                            {user.result.name}
                        </Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} > Logout </Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary" > Signin </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}


export default Navbar;