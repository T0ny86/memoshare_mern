import PostMessage from "../models/postMessage.js"

export const getPosts = (req, res)=>{
    res.send("this works")
}

export const createPost = (req,res) =>{
    res.send("post creation")
}

export const deletePost = (req,res) =>{
    res.send("post deleted")
}

export const updatePost = (req,res) =>{
    res.send("post updated")
}
