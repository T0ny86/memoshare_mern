import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from "../constants/actionTypes";
// state/post must be al always something, so assigning default value
// reducer function:
export default (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;

        case CREATE:
            return [...posts, action.payload];

        case UPDATE:
        case LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);

        case DELETE:
            return posts.filter((post) => post._id !== action.payload); // payload content only the 'id' value, look at line:42 in actions (deletePost)

        default:
            return posts;
    }
}