import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages)
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
    try {
        await newPost.save();
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    const deletedPost = await PostMessage.findByIdAndRemove(_id)
    // res.json({ message: 'Post deleted successfully' })
    res.json(deletedPost)
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const newPost = { ...post, _id } // because the post object dosen't content _id value
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, newPost, { new: true })
    res.json(updatedPost)
}

export const likePost = async (req, res) => {
    const { id: _id } = req.params;
    if (!req.userId) return res.json({ message: 'Unauthenticated' })

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with this id');
    const post = await PostMessage.findById(_id);
    //  if there is index => the user has already added his LIKE
    // and next click => remove the like (dislike) LikesCount-1
    const index = post.likes.findIndex((id) => id === String(req.userId))
    if (index === -1) {
        post.likes.push(req.userId)
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }
    // const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true })
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true })
    res.json(updatedPost) // I found it important to return the response of updatedPost , and that effect to update the interface (likes count) without page refresh
}