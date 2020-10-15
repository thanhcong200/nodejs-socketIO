import React, { useEffect, useState, useRef } from 'react';
import "../Styles/Dashboard.css";
import { useSelector} from 'react-redux';
// import * as actionTypes from '../redux/actions/actionsType';

export default function Dashboard(props){

    const {socket} = props;
    const {chatrooms, users, messagesRoom, myAccount} = useSelector(state=>state.Chatrooms);
    const messageRef = useRef();
    // const dispatch = useDispatch();
    const [userId, setUserId] = useState( myAccount?._id);
    const [idRoom, setIdRoom] = useState(null);
    // const [chat, setChat] = useState();
    const [chatNavs, setChatNavs] = useState(chatrooms); 
    const [messages, setMessages] = useState([]);
    const [newRooms, setNewRooms] = useState([]);
    const [groupSearch, setGroupSearch] = useState(null);

    useEffect(() => {
      const scrollY = document.getElementById('conversation').scrollHeight;
      document.getElementById('conversation').scrollTop = scrollY;
    }, [messagesRoom, messages])

    useEffect(()=>{
      if(messagesRoom){
        setMessages(messagesRoom);
      }
    }, [messagesRoom])
    useEffect(()=>{
      if(socket){
        socket.emit('joinRoom', {
          idRoom: "5f86b91bc6d89737c8777eaf"
        });
      }
      return () => {
        if(socket){
          socket.emit('leaveRoom', {
            idRoom: "5f86b91bc6d89737c8777eaf"
          });

        }
      }
    }, [])
    useEffect(()=>{
      if(chatrooms && !idRoom){
        const idRoom = chatrooms[0]?._id;
        setIdRoom(idRoom);
      }
      if(socket){
        socket.on('Rooms', (rooms)=>{
          const newRooms = [...chatNavs, rooms];
          setChatNavs(newRooms);
        })
      }
    }, [chatrooms]);

    // useEffect(() => {
    //   if(socket){
    //     socket.on('Rooms', (rooms)=>{
    //       const newRooms = [...users, rooms];
    //       setNewRooms(newRooms);
    //       dispatch({
    //         type: actionTypes.NEW_CHATS,
    //         payload: rooms
    //       })
    //     })
    //   }
      
    // }, [users]);

    useEffect(() => {
      
      if(socket){
      
        socket.on("newMessage", (message) => {
          
          const newMessages = [...messages, message];
          setMessages(newMessages);
         
        });
      }
    });


    const sendMessage = () => {
      if(socket && idRoom){
        socket.emit('messageRoom', {
          idRoom: idRoom,
          userId: userId,
          message: messageRef.current.value
        });
        messageRef.current.value="";
      };
    };

    const handleUsername = (idUser) => {
      if(idUser === myAccount?._id) return "";
      const user = users.find(user => user._id === idUser);
      if(user) return <span className="message-time pull-right">
                             {user.name} 
                      </span> 
      else return <span></span>;
      
    }

    const handleKeyDownMessage = (e) => {
      if(e.keyCode === 13){
        sendMessage();
      }
    }

    const handleNewChat = () => {
      // const nameRoom = newChat.name;
      // dispatch()
    }

    const handleSearch = (e) => {
      if(e.target.value.length > 2){
        setGroupSearch(e.target.value);
      };
    };

    const handleKeyDown = (e) => {
      if(e.keyCode === 13){
        handleSearch();
      }
    }

    return (
      <div className="container app">
        <div className="row app-one">
          <div className="col-sm-4 side">
            <div className="side-one">
              <div className="row heading">
                <div className="col-sm-3 col-xs-3 heading-avatar">
                  <div className="heading-avatar-icon">
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png"/>
                  </div>
                </div>
                <div className="col-sm-1 col-xs-1  heading-dot  pull-right">
                  <i className="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
                </div>
                <div className="col-sm-2 col-xs-2 heading-compose  pull-right">
                  <i className="fa fa-comments fa-2x  pull-right" aria-hidden="true"></i>
                </div>
              </div>

              <div className="row searchBox">
                <div className="col-sm-12 searchBox-inner">
                  <div className="form-group has-feedback">
                    <input 
                      id="searchText" 
                      type="text" 
                      className="form-control" 
                      name="searchText" 
                      placeholder="Search" 
                      onChange = {handleSearch}
                      onKeyDown = {handleKeyDown}
                    />
                  </div>
                </div>
              </div>

              <div className="row sideBar">
              {
                  groupSearch?
                    newRooms?.map(newChat => (
                      <div className="row sideBar-body" key={Math.random()} onClick ={handleNewChat} >
                        <div className="col-sm-3 col-xs-3 sideBar-avatar">
                          <div className="avatar-icon">
                            <img src="https://bootdey.com/img/Content/avatar/avatar4.png"/>
                          </div>
                        </div>
                        <div className="col-sm-9 col-xs-9 sideBar-main">
                          <div className="row">
                            <div className="col-sm-8 col-xs-8 sideBar-name">
                              <span className="name-meta"> {newChat.name} </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  :
                    chatNavs?.map(chat => (
                      <div className="row sideBar-body" key = {Math.random()} >
                        <div className="col-sm-3 col-xs-3 sideBar-avatar">
                          <div className="avatar-icon">
                            <img src="https://bootdey.com/img/Content/avatar/avatar4.png"/>
                          </div>
                        </div>
                        <div className="col-sm-9 col-xs-9 sideBar-main">
                          <div className="row">
                            <div className="col-sm-8 col-xs-8 sideBar-name">
                              <span className="name-meta"> {chat.name} </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                }
              </div>
            </div>
          </div>

          <div className="col-sm-8 conversation">
            <div className="row heading">
              <div className="col-sm-2 col-md-1 col-xs-3 heading-avatar">
                <div className="heading-avatar-icon">
                  <img src="https://bootdey.com/img/Content/avatar/avatar6.png"/>
                </div>
              </div>
              <div className="col-sm-8 col-xs-7 heading-name">
                <a className="heading-name-meta"> {myAccount?.name} </a>
              </div>
              <div className="col-sm-1 col-xs-1  heading-dot pull-right">
                <i className="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
              </div>
            </div>

            <div className="row message" id="conversation" >

              {
                userId?
                  messages?.map(msg =>
                    
                    msg?.user === userId?
                      <div key={Math.random()} className="row message-body">
                        <div className="col-sm-12 message-main-sender">
                          <div className="sender">
                            <div className="message-text">
                              {msg.message}
                            </div>
                          
                          </div>
                        </div>
                      </div>
                    
                    :  
                      <div key={Math.random()} className="row message-body">
                        <div className="col-sm-12 message-main-receiver">
                          <div className="receiver">
                            <div className="message-text">
                            {msg.message}
                            </div>
                            {handleUsername(msg.user)}
                          </div>
                        </div>
                      </div>
                   
                  )
                :
                  <div></div>
              }
            </div>

            {
              userId?
                <div className="row reply">
                  <div className="col-sm-1 col-xs-1 reply-emojis">
                    <i className="fa fa-smile-o fa-2x"></i>
                  </div>
                  <div className="col-sm-9 col-xs-9 reply-main">
                    <textarea className="form-control" rows="1" id="comment" ref = {messageRef} onKeyDown={handleKeyDownMessage}></textarea>
                  </div>
                  <div className="col-sm-1 col-xs-1 reply-recording">
                    <i className="fa fa-microphone fa-2x" aria-hidden="true"></i>
                  </div>
                  <div className="col-sm-1 col-xs-1 reply-send">
                    <i className="fa fa-send fa-2x" aria-hidden="true" onClick={sendMessage}></i>
                  </div>
                </div>
              :
                <div></div>
            }
          </div>
        </div>
      </div>

    );
};