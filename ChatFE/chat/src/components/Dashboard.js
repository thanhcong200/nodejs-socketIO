import React from 'react';

export default function Dashboard(){

    return (
        <div className="card">
          <div className="cardHeader">Chatrooms</div>
          <div className="cardBody">
            <div className="inputGroup">
              <label htmlFor="chatroomName">Chatroom Name</label>
              <input
                type="text"
                name="chatroomName"
                id="chatroomName"
              />
            </div>
          </div>
          <button>Create Chatroom</button>
          <div className="chatrooms">
           
            <div className="chatroom">
              <div>Your chat</div>
              <div className="join">Join</div>
            </div>
          </div>
        </div>
    );
};