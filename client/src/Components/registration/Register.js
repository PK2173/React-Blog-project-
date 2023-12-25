import './register.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const initalValue = {
    userName: "",
    password: ""
  };

  const navigation = useNavigate();

  
  const validatioinScherma = Yup.object().shape({
    userName: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(3).max(20).required(),
  });

  const submit = (data) => {
    axios.post("http://localhost:8000/auth/", data).then((result) => {
      navigation('/login')
    }).catch((err)=>{
      alert("Try again")
      navigation('/')
    });
  };

  return (
    <>
    <h1>Register Here</h1>
    <div className="postContainer">
      <div className="createPost">
        <Formik
          initialValues={initalValue}
          onSubmit={submit}
          validationSchema={validatioinScherma}
        >
          <Form className="inputContainer">
            <div className="postlable">
              <label>userName: </label>
              <ErrorMessage name="userName" component="span" />
              <Field
                id="inputCreatePost"
                name="userName"
                placeholder="(Ex. userName....)"
              />
            </div>

            <div className="postlable">
              <label>password: </label>
              <ErrorMessage name="password" component="span" />
              <Field
                id="inputCreatepassword"
                name="password"
                type="password"
                placeholder="(Ex. password....)"
              />
            </div>
            <button type="submit">Creat Post</button>
          </Form>
        </Formik>
      </div>
    </div>
    </>
  )
}