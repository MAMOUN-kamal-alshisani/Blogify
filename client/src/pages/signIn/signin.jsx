import "./scss/signin.css";
import { AiOutlineEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { ImSpinner2 } from "react-icons/im";
import { AiOutlineHome } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

export default function SignIn() {
  const cookies = new Cookies()
  const navigate = useNavigate();
  const [visable, setVisable] = useState(false);
  const [formInput, setFormInput] = useState({
    Email: "",
    Password: "",
  });

  // const [cookies, setCookies] = useCookies();

  const inputError = document.querySelector(".password_error");
  const emailError = document.querySelector(".email_error");

  const handleChange = (e) => {
    setFormInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignIn = async () => {
    const url = `${process.env.REACT_APP_SERVER_API}/api/signin`;
    const res = await axios.post(url, formInput, { withCredentials: true });
    cookies.set("user", res.data.user,{maxAge:60*60*24});
  };
  const { mutate, isLoading, error } = useMutation({
    mutationFn: handleSignIn,
    onError: (error) => {
      emailError.textContent = "";
      inputError.textContent = "";
      if (error?.response?.data.includes("password or email is incorrect!")) {
        inputError.textContent = error?.response?.data;
      }
      if (error?.response?.data.includes("email is invalid!")) {
        emailError.textContent = error?.response?.data;
      }
    },
    onSuccess: () => {
      emailError.textContent = "";
      inputError.textContent = "";
      navigate("/");
    },
  });

  useEffect(()=>{
    if (cookies.get('user')) {
      // signinBtn.disabled = true
        alert('a user already is signed in, logout first!')
        navigate("/");
    }
  },[])

  return (
    <div className="signin">
      <div className="signin_cn">
        <div className="signin_innerCn">
          <div className="signin_header">
            <h1>Omega</h1>
            <div className="link_cn">
              <Link to={"/"} className="link">
                Home page <AiOutlineHome />
              </Link>
            </div>
          </div>

          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <div className="form_header">
              <h1>Sign In</h1>
              <p>signIn now and enjoy omega social!</p>
            </div>

            <div className="input_cn">
              <input
                type="email"
                placeholder="Enter Email"
                name="Email"
                value={formInput.Email}
                onChange={handleChange}
                autoFocus
              />
              <AiOutlineMail className="email_icon icon icon" />
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
              {/* {visable ? 'ssds' : 'sdsad'} */}
              <div className="password_error err"></div>
            </div>

            <div className="sign_btn_cn">
              <button
                disabled={isLoading}
                className="signin_btn"
                onClick={() => mutate()}
              >
                signin
                {isLoading && <ImSpinner2 className="spinnerIcon" />}
              </button>
            </div>
          </form>
          <div className="signin_footer">
            <p>don't have an account?</p>

            <Link to={"/signup"} className="link">
              signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
