import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import shareVideo from '../assets/doctor.mp4'
import logo from '../assets/logowhite.png'
import { auth, provider } from '../firebase'
// import GoogleLogin from 'react-google-login'

import { client } from '../client'

const Login = () => {

  // before v6 was useHistory
  const navigate = useNavigate();

// when using google cloud platform
/* 
  const responseGoogle = (response) =>{
    // console.log(response);
    localStorage.setItem('user',JSON.stringify(response.profileObject));
    const { name, googleId, imageUrl } = response.profileObj;

    // sanity doc
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    }

    client.createIfNotExists(doc)
    .then(()=>{
      // second parameter is serialized data to be passed to the destination page
      navigate('/',{replace:true})
    })
  }
*/

// using google firebase

  const signIn = ()=>{
    signInWithPopup(auth, provider).then((result) => {
       
        // console.log(response);
        localStorage.setItem('user',JSON.stringify(result.user));
        
        // // sanity doc
        // const doc = {
        //   _id: result.user.uid,
        //   _type: 'user',
        //   userName: result.user.displayName,
        //   image: result.user.photoURL,
        // }

        // client.createIfNotExists(doc)
        // .then(()=>{
        //   // second parameter is serialized data to be passed to the destination page
          navigate('/',{replace:true})
        // })
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

}

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
        <div className="p-5">
          <img src={logo} width="130px" alt="logo"/>
        </div>
        <div className="shadow-2x1">{/*
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
            render={(renderProps)=>(
              <button
                type="button"
                className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle className="mr-4"/>Sign in with Google
              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
            />*/}
            <button
                type="button"
                className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                onClick={signIn}
              >
                <FcGoogle className="mr-4"/>Sign in with Google
            </button>
        </div>
      </div>
    </div>
  )
}

export default Login