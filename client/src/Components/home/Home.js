import axios from "axios";
import "./home.css";
import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [listOfPost, setlistOfPost] = useState([]);
  const history = useNavigate();
  const lokepost = (postid) => {
    axios
      .post(
        "http://localhost:8000/like",
        { PostId: postid },
        {
          headers: {
            seingtoken: localStorage.getItem("SetData"), 
          },
        }
      )
      .then((result) => {
        if (result.data === "token has expaire") {
          history("/login");
        } else {
          setlistOfPost(
            listOfPost.map((post) => {
              if (post.id === postid && result.data === "sucess") {
                return { ...post, Likes: [...post.Likes, 0] };
              } else if (post.id === postid && result.data === "remove like") {
                let likearray = post.Likes;
                likearray.pop();
                return { ...post, Likes: likearray };
              } else {
                return post;
              }
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/post")
      .then((result) => {
        setlistOfPost(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const profile = (id)=>{
    history(`/profile/${id}`)
  }

  console.log(listOfPost);
  return (
    <>
      <div className="PostContainer">
        {listOfPost.map((value, key) => { 
          return (
            <>
              <div className="post" key={key}>
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
                  <label className="usernametext" onClick={(e)=>{profile(value.userId)}}>{value.username}</label>
                  <button
                    className="likepost fa fa-thumbs-up"
                    onClick={() => {
                      lokepost(value.id);
                    }}
                  >
                  <label>{` ${value.Likes.length}`}</label>
                  </button>
                </div>
              </div>
              <hr />
              <br />
            </>
          );
        })}
      </div>
    </>
  );
}
