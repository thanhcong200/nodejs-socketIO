
import * as actionTypes from '../actions/actionsType';

const initState = {
    auth: false,
    token: null,
    myAccount: null,
    chatrooms: [],
    messagesRoom: [],
    users: [],
}

const reducerChatrooms = (state=initState, {type, payload}) => {
    switch(type){
        case actionTypes.AUTH_SIGNUP_FAIL:
            localStorage.removeItem('CC_Token');
            return state 
        case actionTypes.AUTH_LOGIN_FAIL:
            localStorage.removeItem('CC_Token');
            return state
        case actionTypes.AUTH_LOGOUT:
            localStorage.removeItem('CC_Token');
            return state
        case actionTypes.AUTH_SIGNUP_SUCCESS:
            localStorage.setItem('account', payload.user)
            return state = {...state, ...payload}
        case actionTypes.AUTH_LOGIN_SUCCESS:
            localStorage.setItem('account', payload.user)
            return state = {...state, ...payload} 
        case actionTypes.CHAT_ROOMS:
            return state = {...state, ...payload}
        case actionTypes.CREATE_CHAT:
            return state = {...state, ...payload}
        case actionTypes.MESSAGES:
            return state = {...state, ...payload}
        default:
            return state;

    }
}


export default reducerChatrooms;