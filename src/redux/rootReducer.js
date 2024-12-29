import * as actionTypes from "./actions/actionTypes";

const initialState = {
    userName : 'test',
    password : '123456',
    isAuthenticated : false,
}

const reducer = (state = initialState, action) => {

    switch(action.type){

        case actionTypes.SIGN_IN:
            return {
                ...state,
                isAuthenticated : action.signInRes
            }

        default:
            return state;

    }
}

export { reducer, initialState };