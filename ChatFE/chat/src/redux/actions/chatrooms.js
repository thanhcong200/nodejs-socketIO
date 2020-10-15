import axios from 'axios';
import makeToast from '../../components/Toaster';
import * as actionTypes from './actionsType';


export const signup = (name, email, password) => {
    return dispatch => {
        axios.post('http://localhost:5000/user/register', {
            name,
            email,
            password
        })
        .then(res => {
            makeToast('success', res.data.message);
            dispatch({
                type: actionTypes.AUTH_SIGNUP_SUCCESS, 
                payload: {
                    auth: true,
                    token: res.data.token,
                    myAccount: res.data.user,
                    messagesRoom: []
                }
            });
        })
        .catch(err=> {
            if(err && err.response && err.response.data && err.response.data.message) {
                makeToast('error', err.response.data.message);
                dispatch({
                    type: actionTypes.AUTH_SIGNUP_FAIL,
                    payload: null
                });
            };
        });

    }
}

export const login = (email, password) => {
    return dispatch => {
        axios.post('http://localhost:5000/user/login',{
            email, 
            password
        })
        .then(res => {
            
            dispatch({
                type: actionTypes.AUTH_LOGIN_SUCCESS, 
                payload: {
                    auth: true,
                    token: res.data.token,
                    myAccount: res.data.user,
                    messagesRoom: []
                }
            });

            dispatch({
                type: actionTypes.CHAT_ROOMS,
                payload: {
                    auth: true,
                    chatrooms: res.data.rooms,
                    users: res.data.users,
                    messagesRoom: []
                }
            });

            axios.get('http://localhost:5000/message')
            .then(res => {
                dispatch({
                    type: actionTypes.MESSAGES,
                    payload: {
                        messagesRoom: res.data,
                    }
                })
                console.log(res.data.users)
            })
            .catch(err => console.log(err));

        })
        .catch(err => {
            if(err && err.response && err.response.data && err.response.data.message){
                dispatch({
                    type: actionTypes.AUTH_LOGIN_FAIL, 
                    payload: null
                });
            }
        });
    }
}

export const createChat = (nameRoom) => {
    return dispatch => {
        axios.post('http://localhost:5000/chat',{
            name: nameRoom
        })
        .then(res => {
            dispatch({
                type: actionTypes.CREATE_CHAT,
                payload: {
                    auth: true,
                    chatrooms: res.data.rooms,
                    users: res.data.users,
                    messagesRoom: []
                }
            })
        })
        .catch(err => console.log(err));
    }
}
