import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';

export default function Index(props){
    const {token} = useSelector(state => state.Chatrooms);
    localStorage.setItem('CC_Token', token);
    console.log(token);
    useEffect(() => {
        
        if( !token ){
            props.history.push('/login');
        } else {
            props.history.push('/dashboard');
        };

    }, [])
    
    return(
        <>
        </>
    )
}