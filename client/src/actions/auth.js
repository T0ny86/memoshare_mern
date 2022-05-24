import { AUTH } from "../constants/actionTypes";
import * as api from "../api";

export const singin = (formData, history) => async (dispatch) => {
    try {

        history.push("/")
    } catch (error) {
        console.log(error)
    }
}

export const singup = (formData, history) => async (dispatch) => {
    try {

        history.push("/")
    } catch (error) {
        console.log(error)
    }
}