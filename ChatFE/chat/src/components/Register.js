import React, { useRef } from 'react';
import axios from 'axios';
import makeToast from './Toaster';


export default function Register(props){

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const registerUser = () => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        axios.post('http://localhost:3000/user/register', {
            name,
            email,
            password
        })
        .then(res => {
            makeToast('success', res.data.message);
            props.history.push('/login');
        })
        .catch(err=> {
            if(err && err.response && err.response.data && err.response.data.message) {
                makeToast('error', err.response.data.message);
            };
        });
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