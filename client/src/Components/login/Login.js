import { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/Contaxt";

export default function Login() {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const validater = useGlobalContext();
  const navigation = useNavigate()

  const login = () => {
    const data = { userName: userName, password: password };
    axios
      .post("http://localhost:8000/auth/login", data)
      .then((result) => {
        if (result.data === 'Dhat ...') {
          navigation('/register')
        }else{
          localStorage.setItem("SetData",result.data.token)
          validater.setvirifi({userName: result.data.userName,
            id: result.data.id,
            status: true,}) 
          navigation('/')     
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
    <h1>Login Here</h1>
      <div className="inputContainer">
        <div className="postlable">
        <label>userName: </label>
          <input
            type="text"
            onChange={(event) => {
              setuserName(event.target.value);
            }}
          />
        </div>
        <div className="postlable">
        <label>Password: </label>
          <input
            type="password"
            onChange={(event) => {
              setpassword(event.target.value);
            }}
          />
        </div>
        <button type="submit" onClick={login}>
          Login
        </button>
      </div>
    </>
  );
}
