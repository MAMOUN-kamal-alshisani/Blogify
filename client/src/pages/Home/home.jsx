import { AiFillGithub } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { SiMicrodotblog } from "react-icons/si";
import { FaSignInAlt } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useNavigate } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import User from "../../components/user/user";
import axios from "axios";
import "./scss/home.css";
import { useEffect, useState } from "react";
import React from "react";
// import dotenv from 'dotenv'
// dotenv.config()
// import env from "react-dotenv";
// import { SlNote } from "react-icons/sl";
// import { AiOutlineEye } from "react-icons/ai";
// import { BiTimeFive } from "react-icons/bi";
// import { SlNote } from "react-icons/sl";
// let imgg = ''
// import img from imgg

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  // let [img,setImg] = useState([])
  // console.log(img);
  // const [localImg, setLocalImg] = useState([]);
  const getRecentBlogs = async () => {
    // const url = "http://localhost:4000/api/blog/latest";
    const url = `https://omega-8pd2.onrender.com/api/blog/latest`
    const res = await axios.get(url);
    // res.data.blogs.map(blog=>{
    //   setImg(prev=> [...prev, blog.photo])
    // })
 
    return res.data;
  };

  const getAdminBlogs = async () => {
    // const url = "http://localhost:4000/api/blog/admin";
    const url = `https://omega-8pd2.onrender.com/api/blog/admin`
    const res = await axios.get(url);
    return res.data;
  };

  // /api/blogs/count
  const getBlogsCategoryCount = async () => {
    // const url = "http://localhost:4000/api/blogs/count";
    const url = `https://omega-8pd2.onrender.com/api/blogs/count`

    const res = await axios.get(url);
    return res.data[0];
  };

  // const getUser = async (blog) => {
  //   const res = await axios.get(
  //     `http://localhost:4000/api/user/get/${blog?.UserId}`
  //   );
  //   // console.log(res.data);
  //   return res.data;
  // };
  // const Photos =React.lazy(() => import(img));
  // const arr = ["Travel", "Technology", "Food", "Science", "Design"];
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
      // {
      //   queryKey: ["BlogsCount"],
      //   queryFn: getBlogsCategoryCount,
      // },
    ],
  });
  const RecentBlog = results[0];
  const mainBlog = results[1];
  const userData = results[0]?.data?.users;
  // const categoryCount = results[2]?.data;

  // console.log(results);
  useEffect(() => {
    if (userData) {
      const r = userData?.filter((elem) =>
        RecentBlog?.data?.blogs.find(({ UserId }) => elem.id === UserId)
      );
      setUser(r);
    }
  }, [userData]);

  const increaseWatch = (watch, id) => {
    const url = `http://localhost:4000/api/blog/${id}`;
    watch = Number(watch);
    const res = axios.put(url, {
      watched: (watch += 1).toString(),
    });

    navigate(`/blogs/${id}`);
  };

  if (results[0]?.isLoading || results[1].isLoading) {
    return <Skeleton count={10} />;
  }
  return (
    <div className="home">
             <img
                              loading={"lazy"}
                              src={'Photos'}
                              alt={'213'}
                              className="sideBlogImg"
                            />
      <div className="home_cn">
        <section className="row0_section0">
          <div className="header_cn">
            <div className="text_part">
              <h1>Be Part Of OmegaBlog, Write And Review Diverse Topics</h1>
            </div>
            <div className="img_part">
              <p>
                omegaBlog provides diverse categories of topics where you can
                read or write a topic of your interest
              </p>
            </div>
            <button className="sg_btn" onClick={() => navigate("/signin")}>
              start-up
            </button>
          </div>
        </section>

        <section className="row1_section1">
          <div className="container">
            <div className="firstCard">
              <img
                src="https://tse1.mm.bing.net/th?id=OIP.ALbc1y5sbJcfhItXEKIrFAHaDa&pid=Api&P=0"
                alt="main"
                className="mainImage img1"
              />
              <div className="img_textarea textarea">
                <p className="text2">
                  here comes title of the blog , it is absolute for me
                </p>
                <div className="text1">
                  <h5>category</h5> -<h5>2025/5/12</h5>
                </div>
              </div>
            </div>
            <div className="secondCard">
              <div className="card_Img1 cards">
                <img
                  loading={"lazy"}
                  src="https://tse4.mm.bing.net/th?id=OIP._Q_kEGcoZ6A4IvhYC9xcmgHaEK&pid=Api&P=0"
                  alt="img2"
                  className="mainImage img2"
                />
                <div className="img_textarea textarea">
                  <p className="text2">
                    here comes title of the blog , it is absolute for me
                  </p>

                  <div className="text1">
                    <h5>category</h5>
                    <h5>2025/5/12</h5>
                  </div>
                </div>
              </div>
              <div className="card_Img2 cards">
                <div className="card_Img2_text">
                  <img
                    loading={"lazy"}
                    src="https://cdn.dribbble.com/users/1731254/screenshots/11649852/media/5551243bcbf041d5aa0b30abb6168215.png"
                    alt="img2"
                    className="mainImage img3"
                  />

                  <div className="img_smalltext textarea">
                    <p className="text4">
                      here comes title of the blog , it is absolute for me
                    </p>
                  </div>
                </div>

                <div className="card_Img2_text">
                  <img
                    loading={"lazy"}
                    src="https://d3ui957tjb5bqd.cloudfront.net/images/screenshots/products/56/565/565674/env_07-o.jpg?1444727677"
                    alt="img2"
                    className="mainImage img4"
                  />
                  <div className="img_smalltext textarea">
                    <p className="text4">
                      here comes title of the blog , it is absolute for me
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="row2_section2">
          <div className="section2_cn">
            <div className="container">
              <div className="part1 section">
                <div className="featured_div">
                  <h1 className="featured_header">Featured Blogs</h1>
                </div>

                {mainBlog?.isFetched && (
                  <div className="part1_cn">
                    <img
                      loading={"lazy"}
                      src={mainBlog?.data[0]?.photo}
                      alt={mainBlog?.data[0].category}
                      className="mainImg"
                    />
                    <div className="blog_detailsCn1">
                      <span className="sp_text">
                        <h4>{mainBlog?.data[0]?.category}</h4>
                        <b className="timeIcon">
                          <BsCalendarDate />
                          {mainBlog?.data[0]?.createdAt.slice(
                            0,
                            mainBlog?.data[0]?.createdAt.indexOf("T")
                          )}
                        </b>
                      </span>
                      <p className="mainImg_desc">{mainBlog?.data[0]?.desc}</p>
                    </div>
                  </div>
                )}

                <div className="part2_cn">
                  {mainBlog?.isFetched && (
                    <article className="artical1 artical">
                      <img
                        loading={"lazy"}
                        src={mainBlog?.data[1]?.photo}
                        alt={mainBlog?.data[1]?.category}
                        className="articalImg"
                      />
                      <p className="title_paragraph">
                        {mainBlog?.data[1]?.title}
                      </p>
                      <div className="articalDetails">
                        <span className="user_cn">
                          <BsPersonFill className="user_icon" />
                          <User blog={mainBlog?.data[1]} />
                        </span>

                        <span className="time_cn">
                          <b className="timeIcon">
                            <BsCalendarDate />
                          </b>
                          {mainBlog?.data[1]?.createdAt?.slice(
                            0,
                            mainBlog?.data[1]?.createdAt?.indexOf("T")
                          )}
                        </span>
                      </div>
                    </article>
                  )}

                  {mainBlog?.isFetched && (
                    <article className="artical2 artical">
                      <img
                        loading={"lazy"}
                        src={mainBlog?.data[2]?.photo}
                        alt={mainBlog?.data[2]?.category}
                        className="articalImg"
                      />
                      <p className="title_paragraph">
                        {mainBlog?.data[2]?.title}
                      </p>

                      <div className="articalDetails">
                        <span className="user_cn">
                          <BsPersonFill className="user_icon" />
                          <User blog={mainBlog?.data[2]} />
                        </span>
                        <span className="time_cn">
                          <b className="timeIcon">
                            <BsCalendarDate />
                          </b>
                          {mainBlog?.data[2]?.createdAt.slice(
                            0,
                            mainBlog?.data[2]?.createdAt.indexOf("T")
                          )}
                        </span>
                      </div>
                    </article>
                  )}
                </div>

                {mainBlog?.isFetched && (
                  <div className="part1_cn var_part3">
                    <img
                      loading={"lazy"}
                      src={mainBlog?.data[0]?.photo}
                      alt={mainBlog?.data[0]?.category}
                      className="mainImg"
                    />
                    <div className="blog_detailsCn1">
                      <span className="sp_text">
                        <h4>{mainBlog?.data[0]?.category}</h4>
                        <b className="timeIcon">
                          <BsCalendarDate />
                          {mainBlog?.data[0]?.createdAt.slice(
                            0,
                            mainBlog?.data[0]?.createdAt.indexOf("T")
                          )}
                        </b>
                      </span>
                      <p className="mainImg_desc">{mainBlog?.data[0]?.desc}</p>
                    </div>
                  </div>
                )}
              </div>
              {/* //////////////////////////////// */}
{/* <img src={require('../../uploads/1682787207019wolf-seg.jpeg')} alt="" /> */}
              <div className="part2 section">
                <div className="blog_cn">
                  <div className="header_cn2">
                    <h1>Recent Blogs</h1>
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
                    {RecentBlog?.data?.blogs?.map((data) => {
                      return (
                        <div className="sideBlog_cn" key={data.id}>
                          <div
                            className="img_Section"
                            onClick={() => increaseWatch(data?.watched, data?.id)}
                          >
                              {/* src={data.photo.startsWith('.') ? require(data.photo) : data.photo} */}

                            {/* <img
                              loading={"lazy"}
                              src={require(data.photo)}
                              alt={data.id}
                              className="sideBlogImg"
                            /> */}
                            {/* <div className="blog1Div">
                              <h4>{data.category}</h4>
                              <span>
                                <b className="timeIcon">
                                  <BsCalendarDate />
                                </b>
                                {data.createdAt.slice(
                                  0,
                                  data.createdAt.indexOf("T")
                                )}
                              </span>
                            </div> */}

                            {/* <p className="readmoreText">read more...</p> */}
                          </div>

                          <div className="details_Section">
                            <div className="blog1Div">
                              <h4>{data?.category}</h4>
                            </div>

                            <div className="blog2Div">
                              <p>
                                {data?.title.substring(
                                  data?.title?.length - 100
                                )}
                              </p>
                            </div>

                            <div className="blog1Div">
                              <span>
                                <b className="timeIcon">
                                  <BsCalendarDate />
                                </b>
                                {data?.createdAt.slice(
                                  0,
                                  data?.createdAt.indexOf("T")
                                )}
                              </span>
                            </div>
                            {/* <div className="blog3Div">
                            <span>
                              <b>
                                <BsPersonFill />
                              </b>
                              {user.map((user) => {
                                return user.id === data.UserId && user.UserName;
                              })}
                            </span>

                            <span>
                              <AiOutlineEye /> {data.watched}
                            </span>
                          </div> */}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="part3 section">
                  <div className="header_cn3">
                    <h1>Post Categories</h1>
                  </div>

                  <div className="post_categories">
                    <ul className="categoryList">
                      {/* {categoryCount?.map((blog, i) => {
                        return (
                          <li
                            className="categoryItem"
                            key={blog.category}
                            onClick={() => navigate("/blogs")}
                          >
                            <span>{blog.category}</span>
                            <span>{blog.Count}</span>
                          </li>
                        );
                      })} */}
                    </ul>
                  </div>
                </div>
                <div className="part4">
                  <div className="about_header">
                    <h1>follow us</h1>
                  </div>
                  <div className="about_list">
                    <div className="about_cn">
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
                        <Link
                          to={"mailto:mamoun.bursi@yahoo.com"}
                          className="link"
                        >
                          <AiOutlineMail className="navbar_icon" /> Mail
                        </Link>
                      </div>
                      <div className="links_cn">
                        <Link
                          to={
                            "http://linkedin.com/in/mamounalshishani-350277210"
                          }
                          className="link"
                        >
                          <AiFillLinkedin className="navbar_icon" /> LinkedIn
                        </Link>
                      </div>

                      <div className="post_cn">
                        <p className="para">
                          sign-up for free and enjoy access to variety of
                          topics!
                        </p>
                        <div className="btn_cr">
                          <button
                            className="signBtn"
                            onClick={() => navigate("/signup")}
                          >
                            sign-up <FaSignInAlt />
                          </button>
                        </div>
                      </div>

                      <div className="post_cn">
                        <p className="para">
                          write up a blog and be part of the community!
                        </p>
                        <div className="btn_cr">
                          <button
                            className="signBtn"
                            onClick={() => navigate("/post")}
                          >
                            post a blog! <SiMicrodotblog />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 
        <div className="section section4">
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
                <h4>{results[1]?.data[3]?.category}</h4>

                <span>
                  <b className="timeIcon">
                    <BsCalendarDate />
                  </b>
                  {results[1]?.data[3]?.createdAt.slice(
                    0,
                    results[1]?.data[3].createdAt.indexOf("T")
                  )}
                </span>
              </div>
              <p className="mainImg_header">{results[1]?.data[3]?.desc}</p>
            </div>
          )}
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
                <div className="btn_cr">
                  <button
                    className="signBtn"
                    onClick={() => navigate("/signup")}
                  >
                    sign-up
                  </button>
                </div>
              </div>

              <div className="category_cn">
                <p>write up a blog and be part of the community!</p>
                <div className="btn_cr">
                  <button className="signBtn" onClick={() => navigate("/post")}>
                    post a blog! <SiMicrodotblog />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

// import { AiOutlineEye } from "react-icons/ai";
// import { AiFillGithub } from "react-icons/ai";
// import { AiOutlineMail } from "react-icons/ai";
// import { AiFillLinkedin } from "react-icons/ai";
// import { SiMicrodotblog } from "react-icons/si";
// import { SlNote } from "react-icons/sl";
// import { BsCalendarDate } from "react-icons/bs";

// // import { BiTimeFive } from "react-icons/bi";
// // import { SlNote } from "react-icons/sl";

// import { Link, useNavigate } from "react-router-dom";
// import { useQueries } from "@tanstack/react-query";
// import User from "../../components/user/user";
// import axios from "axios";
// import "./scss/home.css";
// import { useEffect, useState } from "react";

// export default function Home() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState([]);
//   const getRecentBlogs = async () => {
//     const url = "http://localhost:4000/api/blog/latest";
//     const res = await axios.get(url);
//     return res.data;
//   };

//   const getAdminBlogs = async () => {
//     const url = "http://localhost:4000/api/blog/admin";
//     const res = await axios.get(url);
//     return res.data;
//   };

//   const results = useQueries({
//     queries: [
//       {
//         queryKey: ["RecentBlogs"],
//         queryFn: getRecentBlogs,
//       },
//       {
//         queryKey: ["AdminBlogs"],
//         queryFn: getAdminBlogs,
//       },
//     ],
//   });
//   const RecentBlog = results[0];
//   const mainBlog = results[1];
//   const userData = results[0]?.data?.users;

//   useEffect(() => {
//     if (userData) {
//       const r = userData.filter((elem) =>
//         RecentBlog.data.blogs.find(({ UserId }) => elem.id === UserId)
//       );
//       setUser(r);
//     }
//   }, [userData]);

//   const increaseWatch = (watch, id) => {
//     const url = `http://localhost:4000/api/blog/${id}`;
//     watch = Number(watch);
//     const res = axios.put(url, {
//       watched: (watch += 1).toString(),
//     });

//     navigate(`/blogs/${id}`);
//   };
//   return (
//     <div className="home">

//       <div className="all_cn">

//         <div className="header_cn">

//           <div className="firstCard">
//             <img
//               src="https://tse1.mm.bing.net/th?id=OIP.ALbc1y5sbJcfhItXEKIrFAHaDa&pid=Api&P=0"
//               alt="main"
//               className="mainImage img1"
//             />
//           </div>

//           <div className="secondCard">

//             <div className="card_Img1 cards">

//               <img
//                 src="http://images4.fanpop.com/image/photos/22000000/random-photos-beautiful-pictures-22034298-800-600.jpg"
//                 alt=""
//                 className="mainImage img2"
//               />
//             </div>

//             <div className="card_Img2 cards">
//               <img
//                 src="http://images4.fanpop.com/image/photos/22000000/random-photos-beautiful-pictures-22034298-800-600.jpg"
//                 alt=""
//                 className="mainImage img3"
//               />
//               <img
//                 src="http://images4.fanpop.com/image/photos/22000000/random-photos-beautiful-pictures-22034298-800-600.jpg"
//                 alt=""
//                 className="mainImage img5"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="home_cn">
//           <div className="section_cn1">
//             {mainBlog?.isFetched && (
//               <div className="part1_cn">
//                 <img
//                   src={mainBlog?.data[0]?.photo}
//                   alt={mainBlog.data[0].category}
//                   className="mainImg"
//                 />
//                 <div className="blog_detailsCn1">
//                   <h4>{mainBlog.data[0].category}</h4>
//                   <span>
//                     <b className="timeIcon">
//                       <BsCalendarDate />
//                     </b>
//                     {mainBlog.data[0].createdAt.slice(
//                       0,
//                       mainBlog.data[0].createdAt.indexOf("T")
//                     )}
//                   </span>
//                 </div>
//                 <p className="mainImg_header">{mainBlog?.data[0]?.desc}</p>
//               </div>
//             )}

//             <div className="part2_cn">
//               {mainBlog?.isFetched && (
//                 <div className="artical1">
//                   <img
//                     src={mainBlog.data[1].photo}
//                     alt={mainBlog.data[1].category}
//                     className="articalImg"
//                   />
//                   <p>{mainBlog.data[1].title}</p>
//                   <div className="articalDetails">
//                     <p>
//                       <SlNote className="user_icon" />{" "}
//                       <User blog={mainBlog.data[1]} />
//                     </p>

//                     <span>
//                       <b className="timeIcon">
//                         <BsCalendarDate />
//                       </b>
//                       {mainBlog?.data[1].createdAt.slice(
//                         0,
//                         mainBlog?.data[1]?.createdAt.indexOf("T")
//                       )}
//                     </span>
//                   </div>
//                 </div>
//               )}

//               {mainBlog?.isFetched && (
//                 <div className="artical1">
//                   <img
//                     src={mainBlog.data[2].photo}
//                     alt={mainBlog.data[2].category}
//                     className="articalImg"
//                   />

//                   <p>{mainBlog.data[2].title}</p>
//                   <div className="articalDetails">
//                     <p>
//                       <SlNote className="noteIcon" />
//                       <User blog={mainBlog.data[2]} />
//                     </p>
//                     <span>
//                       <b className="timeIcon">
//                         <BsCalendarDate />
//                       </b>
//                       {mainBlog?.data[2].createdAt.slice(
//                         0,
//                         mainBlog?.data[2].createdAt.indexOf("T")
//                       )}
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="section_cn2">
//             <div className="header_cn2">
//               <span>Recent Blogs</span>
//               <div className="sideBlogBtnDiv">
//                 <button
//                   className="sideBlogBtn"
//                   onClick={() => navigate("/blogs")}
//                 >
//                   View All
//                 </button>
//               </div>
//             </div>

//             <div className="blogList">
//               {RecentBlog?.data?.blogs?.map((data) => {
//                 return (
//                   <div className="sideBlog_cn" key={data.id}>
//                     <div
//                       className="img_Section"
//                       onClick={() => increaseWatch(data.watched, data.id)}
//                     >

//                       <img
//                         src={
//                           data.photo
//                         }
//                         alt={data.id}
//                         className="sideBlogImg"
//                       />
//                       <p className="readmoreText">read more...</p>
//                     </div>

//                     <div className="details_Section">
//                       <div className="blog1Div">
//                         <h4>{data.category}</h4>
//                         <span>
//                           <b className="timeIcon">
//                             <BsCalendarDate />
//                           </b>
//                           {data.createdAt.slice(0, data.createdAt.indexOf("T"))}
//                         </span>
//                       </div>

//                       <div className="blog2Div">
//                         <p>
//                           {data?.title.substring(data?.title?.length - 100)}
//                         </p>
//                       </div>

//                       <div className="blog3Div">
//                         <span>
//                           <b>
//                             <SlNote />
//                           </b>
//                           {user.map((user) => {
//                             return user.id === data.UserId && user.UserName;
//                           })}
//                         </span>

//                         <span>
//                           <AiOutlineEye /> {data.watched}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         <div className="section_cn3">
//           {results[1].isFetched && (
//             <div className="cn3_firstPart">
//               <img
//                 src={
//                   results[1]?.data[3]?.photo
//                     ? results[1]?.data[3]?.photo
//                     : "https://tse1.mm.bing.net/th?id=OIP.Ac34bXms4TJ0yVy40JOx8AHaEo&pid=Api&P=0"
//                 }
//                 alt={results[1]?.data[3]?.category}
//                 className="footerImg"
//               />
//               <div className="blog_detailsCn1">
//                 <h4>{results[1]?.data[3]?.category}</h4>

//                 <span>
//                   <b className="timeIcon">
//                     <BsCalendarDate />
//                   </b>
//                   {results[1]?.data[3]?.createdAt.slice(
//                     0,
//                     results[1]?.data[3].createdAt.indexOf("T")
//                   )}
//                 </span>
//               </div>
//               <p className="mainImg_header">{results[1]?.data[3]?.desc}</p>
//             </div>
//           )}
//           <div className="cn3_secondPart">
//             <div className="secondPart_list">
//               <div className="about_cn">
//                 <div className="about_header">
//                   <h6>follow us</h6>
//                 </div>

//                 <div className="links_cn">
//                   <Link
//                     to={
//                       "https://github.com/MAMOUN-kamal-alshisani?tab=repositories"
//                     }
//                     className="link"
//                   >
//                     <AiFillGithub className="navbar_icon" /> GitHub
//                   </Link>
//                 </div>
//                 <div className="links_cn">
//                   <Link to={"mailto:mamoun.bursi@yahoo.com"} className="link">
//                     <AiOutlineMail className="navbar_icon" /> Mail
//                   </Link>
//                 </div>
//                 <div className="links_cn">
//                   <Link
//                     to={"http://linkedin.com/in/mamounalshishani-350277210"}
//                     className="link"
//                   >
//                     <AiFillLinkedin className="navbar_icon" /> LinkedIn
//                   </Link>
//                 </div>

//                 <p>sign up and be part of Omega now!</p>
//                 <div className="btn_cr">
//                   <button
//                     className="signBtn"
//                     onClick={() => navigate("/signup")}
//                   >
//                     sign-up
//                   </button>
//                 </div>
//               </div>

//               <div className="category_cn">
//                 <p>write up a blog and be part of the community!</p>
//                 <div className="btn_cr">
//                   <button className="signBtn" onClick={() => navigate("/post")}>
//                     post a blog! <SiMicrodotblog />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
