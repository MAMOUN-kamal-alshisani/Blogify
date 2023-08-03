import React from "react";
import { Link } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import "./scss/navbar.css";
export default function Navbar() {
  return (
    <div className="Navbar">
      <div className="navbar_cn">
        <div className="siteName_cn">
          <h2>Blogify</h2>
          <div className="nav_text">
            <a href="!#" className="tags">
              BLOG
            </a>{" "}
            /
            <a href="" className="tags">
              {" "}
              ARCHIVES{" "}
            </a>{" "}
            /
            <a href="" className="tags">
              {" "}
              CONTACT
            </a>
          </div>
        </div>

        <div className="log_links">
          <div className="search_Input">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search..."
              className="input"
            />
            <button className="search_btn">Search</button>
          </div>
          <div className="link_icon">
            <Link
              to={"https://github.com/MAMOUN-kamal-alshisani?tab=repositories"}
              className="link"
            >
              <AiFillGithub className="navbar_icon" />
            </Link>

            <Link to={"mailto:mamoun.bursi@yahoo.com"} className="link">
              <AiOutlineMail className="navbar_icon" />
            </Link>

            <Link
              to={"http://linkedin.com/in/mamounalshishani-350277210"}
              className="link"
            >
              <AiFillLinkedin className="navbar_icon" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
