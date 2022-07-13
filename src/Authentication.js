import React, { useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {auth} from './firebase'


const Authentication = () => {
  const [signup, setSignup] = useState({
    email:'',
    password:'',
  });
  const [login, setLogin] = useState({
    email:'',
    password:'',
  });
  const [createData, setCreateData] = useState([]);
  const handleChange = (e,isCreate) => {
    const {name , value} = e.target;
    if(isCreate){
        setSignup((sign)=>{
            return {...sign, [name]:value}
        })
    }else{
        setLogin((log)=>{
            return {...log,[name]:value}
        })
    }
  };
  const submitData = async(isCreate) => {
    try{
        if(isCreate){
            const user = await createUserWithEmailAndPassword(
                auth,
                signup.email,
                signup.password
            )
            console.log(user);
        }else{
            const userLogin = await signInWithEmailAndPassword(
                auth,
                login.email,
                login.password
            )
        }
        
    }catch(e){
        console.log(e);
    }
  };
  const logout = async() =>{
    await  signOut(auth)
  }
const isCreate = true
  return (
    <>
      <div className="signup">
        <div>Register User</div>
        <div>
          <input
            name="email"
            value={signup.email}
            onChange={(e)=>handleChange(e,isCreate)}
            placeholder="Email.."
          />
          <input
            type="password"
            name="password"
            value={signup.password}
            onChange={(e)=>handleChange(e,isCreate)}
            placeholder="Password.."
          />
          <button onClick={(e)=> submitData(e,isCreate)}>Create User</button>
        </div>
      </div>
      <div className="login">
        <div>Login</div>
        <div>
          <input
            name="email"
            value={login.email}
            onChange={(e)=> handleChange(e,!isCreate)}
            placeholder="Email.."
          />
          <input
            type="password"
            name="password"
            value={login.password}
            onChange={(e)=> handleChange(e,!isCreate)}
            placeholder="Password.."
          />
          <button onClick={()=>submitData(!isCreate)}>login</button>
        </div>
      </div>
      <div>
        <div>User Logged In: {createData?.email}</div>
        <button onClick={logout}>Sign Out</button>
      </div>
    </>
  );
};

export default Authentication;
