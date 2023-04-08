import { AiOutlineEye } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { SiMicrodotblog } from "react-icons/si";

import { Link, useNavigate } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import User from "./components/user";
import axios from "axios";
import "./scss/home.css";

export default function Home() {
  const navigate = useNavigate();

  const getRecentBlogs = async () => {
    const url = "http://localhost:4000/api/blog/latest";
    const res = await axios.get(url);
    return res.data;
  };

  const getAdminBlogs = async () => {
    const url = "http://localhost:4000/api/blog/admin";
    const res = await axios.get(url);
    return res.data;
  };

  const results = useQueries({
    queries: [
      {
        queryKey: ["RecentBlogs"],
        queryFn: getRecentBlogs,
      },
      {
        queryKey: ["AdminBlogs"],
        queryFn: getAdminBlogs,
      },
    ],
  });

  const mainBlog = results[1];

  console.log(results);
  return (
    <div className="home">
      <div className="all_cn">
        <div className="home_cn">
          <div className="section_cn1">
            {mainBlog?.isFetched && (
              <div className="part1_cn">
                <img
                  src={mainBlog?.data[0]?.photo}
                  alt={mainBlog.data[0].category}
                  className="mainImg"
                />
                <div className="blog_detailsCn1">
                  <span>{mainBlog.data[0].category}</span>
                  <span>
                    {mainBlog.data[0].createdAt.slice(
                      0,
                      mainBlog.data[0].createdAt.indexOf("T")
                    )}
                  </span>
                  {/* <span>posted by mamoun bursi</span> */}
                </div>
                <h3 className="mainImg_header">{mainBlog?.data[0]?.desc}</h3>
              </div>
            )}
            {mainBlog?.isLoading && (
              <div className="part1_cn">
                <img
                  src="https://tse1.mm.bing.net/th?id=OIP.Ac34bXms4TJ0yVy40JOx8AHaEo&pid=Api&P=0"
                  alt="tech"
                  className="mainImg"
                />
                <div className="blog_detailsCn1">
                  <span>technology</span>
                  <span>3/21/2023</span>
                  {/* <span>posted by mamoun bursi</span> */}
                </div>
                <h3 className="mainImg_header">
                  A look at 4th quarter 2022, data suggests that new threat
                  surfaces notwithstanding, low-code cybersecurity business
                  email compromises including phishing...
                </h3>
              </div>
            )}

            <div className="part2_cn">
              {mainBlog?.isFetched && (
                <div className="artical1">
                  <img
                    src={mainBlog.data[1].photo}
                    alt={mainBlog.data[1].category}
                    className="articalImg"
                  />
                  <p>{mainBlog.data[1].desc}</p>
                  <div className="articalDetails">
                    <p>
                      <User blog={mainBlog?.data[1]} />
                    </p>
                    <p>
                      {mainBlog?.data[1].createdAt.slice(
                        0,
                        mainBlog?.data[1]?.createdAt.indexOf("T")
                      )}
                    </p>
                  </div>
                </div>
              )}

              {mainBlog.isLoading && (
                <div className="artical1">
                  <img
                    src="http://www.lovethispic.com/uploaded_images/111430-Random-Photo-Taken-Via-Smartphone.jpg?1"
                    alt="articalImg1"
                    className="articalImg"
                  />
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex
                    ad quod ipsum, saepe neque soluta at nesciunt eligendi quis
                    in culpa doloribus sit dignissimos illum et illo assumenda
                    rem similique!
                  </p>
                </div>
              )}

              {mainBlog?.isFetched && (
                <div className="artical1">
                  <img
                    src={mainBlog.data[2].photo}
                    alt={mainBlog.data[2].category}
                    className="articalImg"
                  />
                  <p>{mainBlog.data[2].desc}</p>
                  <div className="articalDetails">
                    <p>
                      <User blog={mainBlog?.data[1]} />
                    </p>
                    <p>
                      {mainBlog?.data[1].createdAt.slice(
                        0,
                        mainBlog?.data[1]?.createdAt.indexOf("T")
                      )}
                    </p>
                  </div>
                </div>
              )}

              {mainBlog.isLoading && (
                <div className="artical1">
                  <img
                    src="http://www.lovethispic.com/uploaded_images/111430-Random-Photo-Taken-Via-Smartphone.jpg?1"
                    alt="articalImg1"
                    className="articalImg"
                  />
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex
                    ad quod ipsum, saepe neque soluta at nesciunt eligendi quis
                    in culpa doloribus sit dignissimos illum et illo assumenda
                    rem similique!
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="section_cn2">
            <div className="header_cn2">
              <span>Recent Blogs</span>
              <div className="sideBlogBtnDiv">
                <button
                  className="sideBlogBtn"
                  onClick={() => navigate("/blogs")}
                >
                  View All
                </button>
              </div>
            </div>

            <div className="blogList">
              {results[0]?.data?.map((blog) => {
                return (
                  <div className="sideBlog_cn" key={blog.id}>
                    <div
                      className="img_Section"
                      onClick={() => navigate(`/blogs/${blog.id}`)}
                    >
                      <img
                        src={blog.photo}
                        alt={blog.id}
                        className="sideBlogImg"
                      />
                      <p className="readmoreText">read more...</p>
                    </div>

                    <div className="details_Section">
                      <div className="blog1Div">
                        <h4>{blog.category}</h4>
                        <p>
                          {blog.createdAt.slice(0, blog.createdAt.indexOf("T"))}
                        </p>
                      </div>

                      <div className="blog2Div">
                        <p>{blog.title.substring(blog.title.length - 100)}</p>
                      </div>

                      <div className="blog3Div">
                        <User blog={blog} />
                        <span>
                          <AiOutlineEye /> {blog.watched}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="section_cn3">
          {results[1].isFetched && (
            <div className="cn3_firstPart">
              <img
                src={
                  results[1]?.data[3]?.photo
                    ? results[1]?.data[3]?.photo
                    : "https://tse1.mm.bing.net/th?id=OIP.Ac34bXms4TJ0yVy40JOx8AHaEo&pid=Api&P=0"
                }
                alt={results[1]?.data[3]?.category}
                className="footerImg"
              />
              <div className="blog_detailsCn1">
                <span>{results[1]?.data[3]?.category}</span>
                <span>
                  {results[1]?.data[3]?.createdAt.slice(
                    0,
                    results[1]?.data[3].createdAt.indexOf("T")
                  )}
                </span>
                {/* <span>posted by mamoun bursi</span> */}
              </div>
              <h3 className="mainImg_header">{results[1]?.data[3]?.desc}</h3>
            </div>
          )}

          {/* {results[1]?.isLoading && (
            <div className="cn3_firstPart">
              <img
                src="https://tse1.mm.bing.net/th?id=OIP.Ac34bXms4TJ0yVy40JOx8AHaEo&pid=Api&P=0"
                alt="tech"
                className="footerImg"
              />
              <div className="blog_detailsCn1">
                <span>technology</span>
                <span>3/21/2023</span>
              </div>
              <h3 className="mainImg_header">
                A look at 4th quarter 2022, data suggests that new threat
                surfaces notwithstanding, low-code cybersecurity business email
                compromises including phishing...
              </h3>
            </div>
          )} */}
          <div className="cn3_secondPart">
            <div className="secondPart_list">
              <div className="about_cn">
                <div className="about_header">
                  <h6>follow us</h6>
                </div>

                <div className="links_cn">
                  <Link
                    to={
                      "https://github.com/MAMOUN-kamal-alshisani?tab=repositories"
                    }
                    className="link"
                  >
                    <AiFillGithub className="navbar_icon" /> GitHub
                  </Link>
                </div>
                <div className="links_cn">
                  <Link to={"mailto:mamoun.bursi@yahoo.com"} className="link">
                    <AiOutlineMail className="navbar_icon" /> Mail
                  </Link>
                </div>
                <div className="links_cn">
                  <Link
                    to={"http://linkedin.com/in/mamounalshishani-350277210"}
                    className="link"
                  >
                    <AiFillLinkedin className="navbar_icon" /> LinkedIn
                  </Link>
                </div>

                <p>sign up and be part of Omega now!</p>
                <button className="signBtn">signup</button>
              </div>

              <div className="category_cn">
                <p>write up a blog and be part of the community!</p>
                {/* <h4>Categories</h4> */}
                {/* <ul>
                  <li>Technology</li>
                  <li>food</li>
                  <li>travel</li>
                  <li>games</li>
                  <li>fashion</li> */}
                <button className="signBtn" onClick={() => navigate("/post")}>
                  post a blog! <SiMicrodotblog />
                </button>
                {/* </ul> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// low-code cybersecurity business email compromises
//               including phishing, as well as MFA bombing are still the prevalent
//               exploits favored by threat actors

{
  /* <div className="secondPart_list">
<div className="about_cn">
  <h1>About</h1>
  <p>OmegaBlog where one can read, review and post blogs.</p>
  <p>sign up and be part of Omega now!</p>
  <button className="signBtn">signup</button>
</div>

<div className="category_cn">
  <h3>write up a blog and be part of the community!</h3>
  <h4>Categories</h4>
  <ul>
    <li>Technology</li>
    <li>food</li>
    <li>travel</li>
    <li>games</li>
    <li>fashion</li>
    <button className="signBtn" onClick={() => navigate("/post")}>
      post a blog!
    </button>
  </ul>
</div>
</div> */
}
