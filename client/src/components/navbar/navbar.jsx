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
            <h2>OmegaBlog</h2>
            <div className="nav_text">
            <a href="!#" className="tags">BLOG</a> /
            <a href="" className="tags"> ARCHIVES </a> /
            <a href="" className="tags"> CONTACT</a>

          </div>
          </div>
        
        <div className="log_links">
          <div className="search_Input">

            <input type="text" name="search"  id="search" placeholder="Search..." className="input"/>
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





// import React from "react";
// import { Link } from "react-router-dom";
// import "./scss/navbar.css";
// import { AiFillGithub } from "react-icons/ai";
// import { AiOutlineMail } from "react-icons/ai";
// import { AiFillLinkedin } from "react-icons/ai";
// import { VscListFilter } from "react-icons/vsc";
// import { useState } from "react";

// export default function Navbar() {
//   const [toggle, setToggle] = useState(false);
//   return (
//     <div className="Navbar">
//       <div className="navbar_cn">
//         <div className="navbar_links">
         

//           <Link to={"/"} className="link">
//             Home
//           </Link>
//           <Link to={"/post"} className="link">
//            Write
//           </Link>

//           <Link to={"/single"} className="link">
//             Blogs
//           </Link>
//         </div>
//         <div className="siteName_cn">
//             <h2>OmegaBlogs</h2>
//           </div>
//         <div className="log_links">
//           <div className="link_icon">
//             <Link
//               to={"https://github.com/MAMOUN-kamal-alshisani?tab=repositories"}
//               className="link"
//             >
//               <AiFillGithub className="navbar_icon" />
//             </Link>

//             <Link to={"mailto:mamoun.bursi@yahoo.com"} className="link">
//               <AiOutlineMail className="navbar_icon" />
//             </Link>

//             <Link
//               to={"http://linkedin.com/in/mamounalshishani-350277210"}
//               className="link"
//             >
//               <AiFillLinkedin className="navbar_icon" />
//             </Link>
//           </div>
//           <div className="dropdown show">
//             <VscListFilter
//               className="icon"
//               onClick={() => setToggle(!toggle)}
//             />
//             {toggle && (
//               <div className="dropdown_menu">
//                 <Link to={"/signin"} className="link">
//                   Login
//                 </Link>
//                 <Link to={"/signup"} className="link">
//                   Register
//                 </Link>
//                 <Link to={"/profile"} className="link">
//                   Profile
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
