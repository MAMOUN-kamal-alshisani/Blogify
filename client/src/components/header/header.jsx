import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { VscListFilter } from "react-icons/vsc";

import { BsFillPersonLinesFill } from "react-icons/bs";
import { useMutation } from "@tanstack/react-query";
// import { useCookies } from "react-cookie";
import Cookies from "universal-cookie";
import "./scss/header.css";
import axios from "axios";
export default function Header() {
  // const [user, setUser] = useState(
  //   JSON.parse(localStorage.getItem("user") || null)
  // );
  const cookies = new Cookies();
  const [toggle, setToggle] = useState(false);
  // const [cookies,setCookies,removeCookies] = useCookies('user')
  const logout = async () => {
    const url = `${process.env.REACT_APP_SERVER_API}/api/signout`;
    const res = await axios.post(url);
    if (cookies.get("user")) {
      return cookies.remove("user");
    }
  };

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      return window.location.reload();
    },
  });
  return (
    <div className="header">
      <div className="header_cn">
        <div className="header_links">
          <Link to={"/"} className="link">
            Home
          </Link>

          <Link to={"/blogs"} className="link">
            Blogs
          </Link>
        </div>
        <div className="categoryList">
          <ul>
            <li>Travel</li>
            <li>Technology</li>
            <li>Food</li>
            <li>Science</li>
            <li>Design</li>
          </ul>
        </div>
        <div className="personal_cn">
          <div className="write_link">
            <Link to={"/post"} className="link">
              Write
            </Link>
          </div>
          <div className="dropdown show">
            <BsFillPersonLinesFill
              className="icon"
              onClick={() => setToggle(!toggle)}
            />
            {toggle && (
              <div className="dropdown_menu">
                <div className="dropdown_item" onClick={()=> mutate()}>
                  {cookies.get("user") ? (
                    <Link  className="link"/*"logout_btn*/>
                      Logout
                    </Link>
                  ) : (
                    <Link to={"/signin"} className="link">
                      Login
                    </Link>
                  )}
                </div>
                <div className="dropdown_item">
                  <Link to={"/signup"} className="link">
                    Register
                  </Link>
                </div>
                <div className="dropdown_item">
                  <Link to={"/profile"} className="link">
                    Profile
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
