
import { useState,useRef } from 'react';
import './App.css';
import Auth from './components/Auth';
import Chat from './components/Chat';
import Cookies from 'universal-cookie'
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

const cookies =new Cookies;

function App() {
  const [isAuth,setIsAuth]= useState(cookies.get("auth-token"));
  const [room,setRoom]=useState("");
  const roomInputRef= useRef(null)

  async function signUserOut(){
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false)
    setRoom(null)
  }

  if (!isAuth){
    return (
      <div className="App">
        <div className='header'>
            <h1>Chat App</h1>
        </div>
        <Auth setIsAuth={setIsAuth}/>
      </div>
    );
  }
    return <div>
      <div className="signOut">
        <button onClick={signUserOut}>SignOut</button>
      </div>
      {room 
      ? 
      <div><Chat room={room}/></div>
      :
      <div className="roomName">
        <label>Enter Room Name:</label>
        <input type="text" ref={roomInputRef}/>
        <button onClick={()=>setRoom(roomInputRef.current.value)}>Click here to start Chat</button>
      </div>}

      </div>
  
 
    
  
}

export default App;
