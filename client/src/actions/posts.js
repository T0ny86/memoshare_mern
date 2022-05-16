import * as api from "../api";

/* Action Creators: are functions that return Actions 
to handle asynchronous fetch data, we need to use 'redux-thunk'.
the usage like bellow " async(dispatch)=>{} "
this function return/or dispatch a function, so we can use async in Action Creator
and at the end we can "dispatch(action)", instead of "return action"
*/
// ref: https://youtu.be/VsUzmlZfYNg?t=3630
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: 'FETCH_ALL', payload: data })
    } catch (error) {
        console.log(error)
    }

}


export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: 'CREATE', payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: 'UPDATE', payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: 'DELETE', payload: id })
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({ type: 'LIKE', payload: data })
    } catch (error) {
        console.log(error)
    }
}