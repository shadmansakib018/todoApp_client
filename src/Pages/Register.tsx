import React, { useState, useContext } from 'react'
import axios, { AxiosResponse } from 'axios';
import { myContext } from '../Pages/Context';
import { Link } from 'react-router-dom';



export default function Register() {
  const ctx = useContext(myContext);

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")


  const register = () => {
    if (!username || !password){
      alert("please enter username and password");

    }
    axios.post("http://localhost:4000/register", {
      username,
      password
    }, {
      withCredentials: true
    }).then((res : AxiosResponse) => {
      if (res.data === "success") {
       window.location.href = "/"
     }
    })
  }

  return (
    <div className="container card mt-4 shadow-lg p-3 mb-5 bg-body rounded">
              <h1 className='text-center'>Todo App!</h1>

      <h1>Register</h1>
        <div className='card-body '>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">@</span>
         <input onChange={e => setUsername(e.target.value)} type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">@</span>
         <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>


      
      <button className="btn btn-primary mt-3" onClick={register}>Register</button>
      </div>
      {ctx ? (
        <>
          <Link to="/profile">Profile</Link>
        </>
      ) : (
        <><span><p>Already have an account? <Link to="/">Login</Link></p></span>
            
        </>
      )
      }
    </div>
  )
}
