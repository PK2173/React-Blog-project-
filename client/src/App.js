import { useGlobalContext } from "./Components/context/Contaxt";
import CreatePost from "./Components/createPost/CreatePost";
import Home from "./Components/home/Home";
import Login from "./Components/login/Login";
import Post from "./Components/post/Comment";
import Profile from "./Components/profile/Profile";
import Register from "./Components/registration/Register";
import "./app.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  let data = useGlobalContext();  
  const loguot = ()=>{
    localStorage.removeItem("SetData")
    loguot.setvirifi({...data.virifi,status:false})
  }
  return (
    <>
      <div className="appContainer">
        <Router>
          <div className="navbar">
            <h1>This is our project</h1>
            <div className="linktags">
              <Link to="/"> Home</Link>
              <Link to="./CreatHomeePost"> CreatePost</Link>
              {!data.virifi.status ? (
                <>
                  <Link to="./login"> login</Link>
                  <Link to="./register"> Register</Link>
                </>
              ): <>
              <Link onClick={()=>{loguot()}}> Logout</Link>
              <h2 className="usernam" >{data.virifi.userName}</h2>
              </>}
            </div>  
          </div>
          <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/CreatePost" exact Component={CreatePost} />
            <Route path="/post/:id" exact Component={Post} />
            <Route path="/login" exact Component={Login} />
            <Route path="/register" exact Component={Register} />
            <Route path="/profile/:id" exact Component={Profile} />
            <Route path="/*" exact Component={Home} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
