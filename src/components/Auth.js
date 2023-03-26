import React from 'react';
import {auth,provider} from '../firebase';
import {signInWithPopup}from 'firebase/auth';
import Cookies from "universal-cookie";
import '../App.css'

const cookies = new Cookies;

function Auth(props) {
    async function SignInWithGoogle(){
        try{
        const result=await signInWithPopup(auth,provider);
        cookies.set("auth-token",result.user.refreshToken);
        props.setIsAuth(true)
        console.log(result);
        }
        catch(err){
            console.log(err);
        }
        
    }
  return (
    <div className='auth'>
        <p>Sign in with Google to Continue</p>
        <button onClick={SignInWithGoogle}>Sign in with Google</button>
    </div>
  )
}

export default Auth