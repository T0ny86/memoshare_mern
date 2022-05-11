import {combineReducers} from "redux"

import posts from "./posts"

export default combineReducers({
    //we can just write posts (key name) because the key and value the same in our case
    posts: posts ,
})