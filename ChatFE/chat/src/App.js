import React, {useEffect, useState} from 'react';
import io from "socket.io-client";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Loggin from './components/Loggin';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Index from './components/index';
import makeToast from './components/Toaster';

function App() {

  const [socket, setSocket] = useState(null);
  const {token} = useSelector(state=>state.Chatrooms);
  const setUpSocket = () => {
    
    if(token &&  !socket){
      const newSocket = io('http://localhost:5000');

      newSocket.on('disconnect', ()=>{
        setSocket(null);
        setTimeout(setUpSocket, 3000);
        makeToast('error', 'Disconnected!')
      });

      newSocket.on("connect", () => {
        makeToast("success", "Socket Connected!");
      });

      setSocket(newSocket);
    }
  }

  useEffect(()=>{
    setUpSocket();
  },[token]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component = {Index}/>
        <Route path='/login' exact component = {Loggin}/>
        <Route path='/register' exact component = {Register}/>
        <Route path='/dashboard' exact render={() => <Dashboard socket = {socket}/>}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
