import React, {useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import '../Styles/Common.css';
import * as actionChatrooms from '../redux/actions/chatrooms';
import makeToast from './Toaster';

export default function Loggin(props) {
    
    const emailRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();
    const {auth} = useSelector(state => state.Chatrooms);

    useEffect(() => {
        if(auth) {
            props.history.push('/dashboard');
        }
    })

    const loginUser = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        dispatch(actionChatrooms.login(email, password));
        if(auth) makeToast("success", "Logged!");
        else makeToast("error", "Loggin fail!");
    };

    
    return (
        <div className="card">
            <div className="cardHeader">Login</div>
                <div className="cardBody">
                    <div className="inputGroup">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="abc@example.com"
                            ref={emailRef}
                        />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Your Password"
                            ref={passwordRef}
                        />
                    </div>
                <button onClick={loginUser}>Login</button>
                <h5>Have you account? <Link to='/register' style={{color: 'red'}}> SignUp</Link></h5>
            </div>
        </div>
    );
};
