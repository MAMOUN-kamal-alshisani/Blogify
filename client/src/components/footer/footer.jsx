import { Link } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import "./scss/footer.css";
export default function Footer() {
  return (
    <div className="footer">
      <div className="footer_cn">
        <div className="second_section">
          <h1>MNBlog</h1>
          <p>
            MNBlog is created for the purpose of building a community for users
            to interact with, share information,thoughts and ideas with each
            other!
          </p>
        </div>
        <div className="first_section">
          <div className="first_cn">
            <div className="links_cn">
              <Link
                to={
                  "https://github.com/MAMOUN-kamal-alshisani?tab=repositories"
                }
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
          <div className="second_cn">
            <Link to={"/"} className="link">
              Home
            </Link>
            <Link to={"/blogs"} className="link">
              blogs
            </Link>
            <Link to={"/post"} className="link">
              post a blog
            </Link>
          </div>
          <div className="third_cn">
            <h5>Copyright &copy; Mamoun Kamal Ismael Alshishani</h5>
            <h5>mamoun.bursi@yahoo.com</h5>
          </div>
        </div>
        <div className="third_section">
          <h1>Subscribe</h1>
          <div className="input_cn">
            <p>recieve notification of our newest blogs!</p>
            <input type="text" placeholder="Email" />
            <button className="subscribeBtn">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
}
