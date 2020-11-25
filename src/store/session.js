import { fetch } from './csrf';

export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const DELETE_USER = 'DELETE_USER';

//ACTIONS
const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
}

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await fetch('/api/session', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    dispatch(setUser(response.data.user));
    return response;
};

export const restoreUser = () => async (dispatch) => {
    const response = await fetch('api/session');
    dispatch(setUser(response.data.user));
    return response;
};

export const signup = (user) => async (dispatch) => {
    const { username, email, password } = user;
    const response = await fetch('api/users', {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password
        }),
    });
    dispatch(setUser(response.data.user));
    return response;
};

export const logout = () => async (dispatch) => {
    const response = await fetch('api/session', {
        method: "DELETE",
        headers: {
            'Content-Type': "application/json",
        },
    })
    dispatch(removeUser());
    return response;
};

// REDUCER
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.user;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state
    }
};

export default sessionReducer;
