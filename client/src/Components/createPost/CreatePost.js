import React from "react";
import "./createPost.css";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const initalValue = {
    title: "",
    postText: "",
    username: "",
  };

  const navigation = useNavigate();

  const validatioinScherma = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().required(),
  });

  const submit = (data) => {

    if (!!localStorage.getItem("SetData")) {
      axios
      .post("http://localhost:8000/post", data, {
        headers: {
          seingtoken: localStorage.getItem("SetData"),
        },  
      })
      .then((result) => {
        console.log("Data Insertd");
        navigation("/");
      });
    } else {
     navigation("/login") 
    }
  };

  return (
    <div className="postContainer">
      <h1>Create your new post</h1>
      <div className="createPost">
        <Formik
          initialValues={initalValue}
          onSubmit={submit}
          validationSchema={validatioinScherma}
        >
          <Form className="inputContainer">
            <div className="postlable">
              <label>Title: </label>
              <ErrorMessage name="title" component="span" />
              <Field
                id="inputCreatePost"
                name="title"
                placeholder="(Ex. Titel....)"
              />
            </div>

            <div className="postlable">
              <label>Post: </label>
              <ErrorMessage name="postText" component="span" />
              <Field
                id="inputCreatePost"
                name="postText"
                placeholder="(Ex. Post....)"
              />
            </div>
            <button type="submit">Creat Post</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
