import axios from "axios";
import "./comment.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context/Contaxt";

export default function Post() {
  let { id } = useParams();
  const [Postdata, setPostdata] = useState({});
  const [comments, setcomments] = useState([]);
  const [addcommnt, setaddcommnt] = useState("");
  const [username, setusername] = useState("");
  const navigate = useNavigate();
  const uservalidate = useGlobalContext();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/post/byId/${id}`)
      .then((result) => {
        setPostdata(result.data[0]);
      })

    axios
      .get(`http://localhost:8000/comments/${id}`, {
        headers: {
          seingtoken: localStorage.getItem("SetData"),
        },
      })
      .then((result) => {
        if (!!localStorage.getItem("SetData")) {
          setusername(result.data.commentUserId);
          setcomments(result.data.result || []);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, navigate]);

  const addComments = (postId, commentInput) => {
    if (
      localStorage.getItem("SetData") === "dhat tori mai ke Ch...." ||
      localStorage.getItem("SetData") === null
    ) {
      navigate("/login");
    } else {
      axios
        .post(
          `http://localhost:8000/comments`,
          {
            postId: postId,
            comments: commentInput,
          },
          {
            headers: {
              seingtoken: localStorage.getItem("SetData"),
            },
          }
        )
        .then((result) => {
          setcomments([
            ...comments,
            {
              comments: commentInput,
              commentUserId: JSON.stringify([username]),
            },
          ]);
        });
    }
  };

  const deletComment = (id) => {
    axios
      .delete(`http://localhost:8000/comments/${id}`, {
        headers: {
          seingtoken: localStorage.getItem("SetData"),
        },
      })
      .then((result) => {
        setcomments(
          comments.filter((val) => {
            return val.id !== result.data;
          })
        );
      });
  };

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
        navigate("/");
      });
  };

  return (
    <>
      <div className="Singlepost">
        <div className="Singletitle">{Postdata.title}</div>
        <div className="SinglepostText">{Postdata.postText}</div>
        <div className="Singleusername">
          <label className="textodusername">{Postdata.username}</label>
          {uservalidate.virifi.userName === Postdata.username && (
            <button
              className="deletbtn"
              onClick={(e) => {
                deletPost(Postdata.id);
              }}
            >
              Delet Post
            </button>
          )}
        </div>
      </div>
      <div className="rightSaid">
        <div className="addComments">
          <input
            type="text"
            placeholder="Comment here......"
            autoComplete="off"
            onChange={(e) => {
              setaddcommnt(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              addComments(Postdata.id, addcommnt);
            }}
          >
            Add Comments
          </button>
        </div>
        <div className="listComments">
          {comments.map((comment, key) => {
            return (
              <>
                <div className="commentlistContainer" key={key}>
                  <div>
                    {comment.comments}
                    <label className="commenter">{` Post by ${
                      JSON.parse(comment.commentUserId)[0] || " "
                    }`}</label>
                  </div>
                  {uservalidate.virifi.userName ===
                    JSON.parse(comment.commentUserId)[0] && (
                    <button
                      className="deletbtn"
                      onClick={() => {
                        deletComment(comment.id);
                      }}
                    >
                      {" "}
                      Delete
                    </button>
                  )}
                </div>
                <br />
              </>
            );
          })}
        </div>
      </div>
      <hr />
      <br />
    </>
  );
}
