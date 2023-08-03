import React from "react";
import "./scss/signup.css";
// AiOutlineEye
// AiFillEyeInvisible
import { AiOutlineEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
// import { FaLongArrowAltRight } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { AiOutlineHome } from "react-icons/ai";


import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [visable, setVisable] = useState(false);
  const [confirmVisable, setConfirmVisable] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");
  const [formInput, setFormInput] = useState({
    UserName: "",
    Email: "",
    Password: "",
  });

  const EmailErr = document.querySelector(".email_error");
  const NameErr = document.querySelector(".name_error");
  const PassErr = document.querySelector(".Password_error");

  const signUp = async () => {
    // const url = `https://omega-8pd2.onrender.com/api/signup`;
    const url = `${process.env.REACT_APP_SERVER_API}/api/signup`;
    const res = await axios.post(url, formInput);
  };

  const { isLoading, mutate, error} = useMutation({
    mutationFn: signUp,
    onError: (error) => {
      //  console.log(error.response.data[0].message);
      if (error?.response?.data[0]?.message?.includes("email")) {
        EmailErr.textContent = "";
        EmailErr.textContent = error.response.data[0].message;
      }
      if (error?.response?.data?.details !== null) {
        error?.response?.data?.details.map((err) => {
          if (err.message.includes("UserName")) {
            NameErr.textContent = err.message;
          }
          if (err.message.includes("Email")) {
            EmailErr.textContent = err.message;
          }
          if (err.message.includes("Password")) {
            PassErr.textContent = err.message;
          }
        });
      }
      // if(error.response.data.includes('email')){
      //   EmailErr.textContent =''
      //   EmailErr.textContent = error.response.data
      // }
    },
    onSuccess: () => {
      NameErr.textContent = "";
      EmailErr.textContent = "";
      PassErr.textContent = "";
    },
    onSuccess:()=>{
      navigate('/signin')
    }
  });
  console.log(error);
  const handleChange = (e) => {
    setFormInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const handleSubmit = (e)=>{
  //   e.preventDefault()

  // }

  if (confirmPass !== "" && formInput.Password !== "") {
    const conPass = document.querySelector(".passwordSec_error");
    const btn = document.querySelector(".signup_btn");
    if (confirmPass !== formInput.Password) {
      conPass.textContent = "password doesnt match";

      // setTimeout(()=>{

      // },2000)
    } else {
      conPass.textContent = "";
    }
  }

  // if(isError){
  //   if(error.message.includes())
  // }
  return (
    <div className="signup">
      <div className="signup_cn">
        <div className="signup_innerCn">
          <div className="signup_header">
            <h1>Blogify</h1>
            <div className="link_cn">
              <Link to={"/"} className="link">
                Home page <AiOutlineHome />
              </Link>
            </div>
          </div>

          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <div className="form_header">
              <h1>Sign Up</h1>
              <p>signup now and enjoy Blogify!</p>
            </div>

            <div className="input_cn">
              <input
                type="text"
                placeholder="Enter Name"
                name="UserName"
                value={formInput.UserName}
                onChange={handleChange}
                autoFocus
              />
              <HiOutlineUserCircle className="name_icon icon" />
              <div className="name_error err"></div>
            </div>

            <div className="input_cn">
              <input
                type="email"
                placeholder="Enter Email"
                name="Email"
                value={formInput.Email}
                onChange={handleChange}
              />
              <AiOutlineMail className="email_icon icon" />
              <div className="email_error err"></div>
            </div>

            <div className="input_cn">
              <input
                type={visable ? "text" : `password`}
                placeholder={`Enter Password`}
                name="Password"
                value={formInput.Password}
                onChange={handleChange}
              />
              {visable ? (
                <AiFillEyeInvisible
                  className="visible_icon icon"
                  onClick={() => setVisable(!visable)}
                />
              ) : (
                <AiOutlineEye
                  className="visible_icon icon"
                  onClick={() => setVisable(!visable)}
                />
              )}
              <div className="Password_error err"></div>
            </div>

            <div className="input_cn">
              <input
                type={confirmVisable ? "text" : `password`}
                placeholder="Confirm Password"
                name="confirmPass"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
              {confirmVisable ? (
                <AiFillEyeInvisible
                  className="visible_icon icon"
                  onClick={() => setConfirmVisable(!confirmVisable)}
                />
              ) : (
                <AiOutlineEye
                  className="visible_icon icon"
                  onClick={() => setConfirmVisable(!confirmVisable)}
                />
              )}

              <div className="passwordSec_error err"></div>
            </div>
            <div className="sign_btn_cn">
              <button
                disabled={isLoading}
                className="signup_btn"
                onClick={() => mutate()}
              >
                signup {isLoading && <ImSpinner2 className="spinnerIcon" />}
              </button>
            </div>
          </form>
          <div className="signup_footer">
            <p>already have an account?</p>

            <Link to={"/signin"} className="link">
              Sign-in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
