import React, {useRef} from 'react'
import axios from 'axios';
import makeToast from './Toaster';
import { Link } from 'react-router-dom';


export default function Loggin(props) {
    
    const emailRef = useRef();
    const passwordRef = useRef();

    const loginUser = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        axios.post('http://localhost:3000/user/login',{
            email, 
            password
        })
        .then(res => {
            makeToast('success', res.data.message);
            localStorage.setItem('CC_Token', res.data.token);
            props.history.push('/dashboard');
        })
        .catch(err => {
            if(err && err.response && err.response.data && err.response.data.message){
                makeToast('error', err.response.data.message);
            }
        });
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
                <h4>Have you account? <Link to='/register' style={{color: 'red'}}> SignUp</Link></h4>
            </div>
        </div>
    );
};
