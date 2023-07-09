import React,{useState, useRef, useEffect} from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import "./scss/header.css";
import axios from "axios";
import { BsFillPersonLinesFill } from "react-icons/bs";

export default function Header() {

  const cookies = new Cookies();
  const [toggle, setToggle] = useState(false);
  let toggleBar = useRef(null)

  useEffect(() => {
    // Add event listener to the document object
    document.addEventListener('mousedown', handleOutsideBarClick);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleOutsideBarClick);
    };
  }, [toggleBar]);

  function handleOutsideBarClick(event) {
    if (toggleBar.current && !toggleBar.current.contains(event.target)) {
      // Clicked outside the side navigation bar, close it
      setToggle(false)
      
      // Implement your close side navigation bar logic here
    }else{
      setToggle(true)
    }
  }



  const logout = async () => {
    const url = `${process.env.REACT_APP_SERVER_API}/api/signout`;
    const res = await axios.post(url);
    if (cookies.get("token")) {
      return cookies.remove("token");
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
          <div className="dropdown show"   ref={toggleBar}>
            <div>
            <BsFillPersonLinesFill
              className="icon"
              // onClick={() => setToggle(!toggle)}
            />
            </div>
         
            {toggle && (
              <div className="dropdown_menu" >
                <div className="dropdown_item" onClick={()=> mutate()}>
                  {cookies.get("token") ? (
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
