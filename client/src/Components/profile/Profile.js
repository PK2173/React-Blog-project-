import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Profile() {
  let { id } = useParams();
  const [virifi, setvirifi] = useState("");
  const [username, setusername] = useState({});
  const [listOfPost, setlistOfPost] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/auth/auth", {
        headers: {
          seingtoken: localStorage.getItem("SetData"),
        },
      })
      .then((er) => {
        setvirifi(er.data.id); 
      });
    axios
      .get(`http://localhost:8000/profile/basicinnfo/${id}`)
      .then((result) => {
        console.log(result.data[0][0]);
        setusername(result.data[0][0]);
        setlistOfPost(result.data[1]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const deletPost = (postId) => {
    axios
      .post(
        "http://localhost:8000/post/delet",
        {
          postId: postId,
        },
        {
          headers: {
            seingtoken: localStorage.getItem("SetData"),
          },
        }
      )
      .then((result) => {
        history("/");
      });
  };

  return (
    <>
      <div className="profilepageContainer">
        <div className="basicInfo">
          <h1>User name : {username.userName}</h1>
        </div>
        <div className="listofpost"></div>
      </div>
      <div className="PostContainer">
        {listOfPost.map((value, key) => {
          return (
            <>
              {username.userName === value.username && (
                <div className="post profile" key={key}>
                  <div className="title">{value.title}</div>
                  <div
                    className="postText"
                    onClick={(e) => {
                      history(`./post/${value.id}`);
                    }}
                  >
                    {value.postText}
                  </div>
                  <div className="username">
                    <label className="usernametext">{value.username}</label>
                    {username.id === virifi && (
                      <button
                        className="deletbtn"
                        onClick={(e) => {
                          deletPost(value.id);
                        }}
                      >
                        Delet Post
                      </button>
                    )}
                    <button className="likepost fa fa-thumbs-up">
                      <label>{` ${value.Likes.length}`}</label>
                    </button>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </>
  );
}

export default Profile;
