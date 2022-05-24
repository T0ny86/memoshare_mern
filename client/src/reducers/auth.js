import Auth from "../components/Auth/Auth";
import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            // https://youtu.be/VsUzmlZfYNg?t=12641
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action?.data }
        case LOGOUT:
            localStorage.clear()
            return { ...state, authData: null }
        default:
            return state;
    }
}

export default authReducer;