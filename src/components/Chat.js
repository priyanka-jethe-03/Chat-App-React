import React, { useState,useEffect } from 'react'
import {database,auth} from '../firebase'
import {addDoc,collection, onSnapshot, orderBy, query, serverTimestamp, where} from 'firebase/firestore'
import App from '../App';
import '../App.css'

 function Chat(props) {
    const {room}=props
    const[newMessage,setNewMessage]= useState("");
    const [messages,setMessages]= useState([])
    const messageRef= collection(database,"message");

    useEffect(function(){
        const queryMessages = query(messageRef,where("room","==",room),orderBy("createdAt"));
        const unsubscribe=onSnapshot(queryMessages,(snapshot)=>{
           // console.log("New Message"+auth.currentUser.email)
           let messages=[]
           snapshot.forEach((doc)=>{
            messages.push({...doc.data(),id:doc.id});
            setMessages(messages)
           });
        })
        return ()=>unsubscribe();
    },[])


    async function handleSubmit(output){
        output.preventDefault();
        console.log(newMessage)
        if (newMessage==="")return;
         await addDoc(messageRef,{
            text : newMessage,
            createdAt : serverTimestamp(),
            user : auth.currentUser.displayName,
            room: props.room,
            email: auth.currentUser.email,
        });
        setNewMessage("")
    };
    return (
      <div className="chat-app">
          <div className='welcome'>
              <h2>Welcome to {props.room} chatroom</h2>
          </div>
      
       <div>
          {messages.map((message)=>
          <div className="message-box">
            <div className="message"> 
              <h2>{message.text}</h2>
            </div>
            <div className="user">
              <h4 style={{color:'red'}}>{message.user} {message.email} </h4>
            </div>
        
          </div>
            )}
       </div>
        <form onSubmit={handleSubmit}>
            <input className='new-message' placeholder="Type your message here" onChange={(i)=>{setNewMessage(i.target.value)}} value={newMessage}/>
            <button className='send-message' type="submit">Send</button>
        </form>
      </div>
  )
}

export default Chat