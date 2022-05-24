import { combineReducers } from "redux"

import posts from "./posts"
import authReducer from "./auth"

export default combineReducers({
    //we can just write posts (key name) because the key and value the same in our case
    posts: posts,
    auth: authReducer
})