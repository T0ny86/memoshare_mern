import React from "react"
import { useSelector } from "react-redux"
import { Grid, CircularProgress } from "@material-ui/core"
import Post from "./Post/Post"
import useStyles from "./styles"

const Posts = ({setCurrentId}) => {
    const posts = useSelector((state) => state.posts)
    const classes = useStyles();
    console.log(posts)
    return (
        !posts ? <CircularProgress /> : (
            <Grid className={classes.container} container alignitems="stretch" spacing={3} >
                {posts.map((post) => (
                    <Grid item key={post._id} md={6} xs={12}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts;