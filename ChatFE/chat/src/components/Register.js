import React, { useRef, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import '../Styles/Common.css';
import * as actionChatrooms from '../redux/actions/chatrooms';

export default function Register(props){

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();
    const {auth} = useSelector(state => state.Chatrooms);

    useEffect(() => {
      if(auth) {
          props.history.push('/login');
      }
    })

    const registerUser = () => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        dispatch(actionChatrooms.signup(name, email, password));
    };

    return (
        <div className="card">
          <div className="cardHeader">Registration</div>
          <div className="cardBody">
            <div className="inputGroup">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your name"
                ref={nameRef}
              />
            </div>
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
          <button onClick={registerUser}>Register</button>
        </div>
    );
};