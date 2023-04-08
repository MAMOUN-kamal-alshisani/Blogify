
import { Link } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import './scss/footer.css'
export default function Footer() {
  return (
    <div className='footer'>
      <div className='footer_cn'>

        <div className='first_section'>
        <div className='first_cn'>
        <div className="link_icon">

          <div className="links_cn">
            <Link
              to={"https://github.com/MAMOUN-kamal-alshisani?tab=repositories"}
              className="link"
            >
              <AiFillGithub className="navbar_icon" />
            </Link>
            </div>
              <div className="links_cn">
            <Link to={"mailto:mamoun.bursi@yahoo.com"} className="link">
              <AiOutlineMail className="navbar_icon" />
            </Link>
 </div>
  <div className="links_cn">
            <Link
              to={"http://linkedin.com/in/mamounalshishani-350277210"}
              className="link"
            >
              <AiFillLinkedin className="navbar_icon" />
            </Link>
             </div>
          </div>
        </div>
        <div className='second_cn'>
        <Link to={"/"} className="link">
            Home
          </Link>
          <Link to={"/blogs"} className="link">
            blogs
          </Link>

          <Link to={"/single"} className="link">
            single
          </Link>
        </div>
        <div className='third_cn'>

        {/* <Link to={"/contact"} className="link">
            Contact
          </Link>
          <Link to={"/blogs"} className="link">
            Blogs
          </Link>

          <Link to={"/single"} className="link">
            Cater
          </Link> */}
        </div>
        </div>

      <div className='second_section'>
          <h4>&copy; Mamoun Kamal Ismael Alshishani</h4>
          <h5>mamoun.bursi@yahoo.com</h5>
      </div>

      </div>
    </div>
  )
}
