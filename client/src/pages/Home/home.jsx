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
import React from "react";

export default function Home() {
  const navigate = useNavigate();


  const getRecentBlogs = async () => {
    const url = `${process.env.REACT_APP_SERVER_API}/api/blog/latest`;
    const res = await axios.get(url);
    return res.data;
  };

  const getAdminBlogs = async () => {
    const url = `${process.env.REACT_APP_SERVER_API}/api/blog/admin`;
    // const url = `https://omega-8pd2.onrender.com/api/blog/admin`
    const res = await axios.get(url);
    return res.data;
  };

  const getFeaturedBlogs = async () => {
    const url = `${process.env.REACT_APP_SERVER_API}/api/blog/featured`;
    const res = await axios.get(url);
    return res.data;
  };

  const getBlogsCategoryCount = async () => {
    const url = `${process.env.REACT_APP_SERVER_API}/api/blogs/count`;
    const res = await axios.get(url);
    return res.data[0];
  };
  //// react query api 
  const results = useQueries({
    queries: [
      {
        queryKey: ["RecentBlogs"],
        queryFn: getRecentBlogs,
        onSuccess: (data) => {
          console.log(data);
        },
      },
      {
        queryKey: ["AdminBlogs"],
        queryFn: getAdminBlogs,
      },

      {
        queryKey: ["BlogsCount"],
        queryFn: getBlogsCategoryCount,
      },

      {
        queryKey: ["FeaturedBlogs"],
        queryFn: getFeaturedBlogs,
      },
    ],
  });

  //// query api data
  const RecentBlog = results[0];
  const AdminBlog = results[1];
  const categoryCount = results[2].data;
  const FeaturedBlogs = results[3];

  //// increase blog views when clicked on readmore
  const increaseWatch = (watch, id) => {
    const url = `${process.env.REACT_APP_SERVER_API}/api/blog/${id}`;
    watch = Number(watch);
    const res = axios.put(url, {
      watched: (watch += 1).toString(),
    });

    navigate(`/blogs/${id}`);
  };

  //// display loading Skeleton before data fetching is complete
  if (results[0]?.isLoading || results[1].isLoading) {
    return <Skeleton count={10} />;
  }

  return (
    <div className="home">
      <div className="home_cn">
        <section className="row0_section0">
          <div className="header_cn">
            <div className="text_part">
              <h1>Be Part Of MNBlog Write And Review Diverse Topics</h1>
            </div>
            <div className="img_part">
              <p>
                MNBlog provides diverse categories of topics where you can read
                or write a topic of your interest
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
                src={AdminBlog?.data[0]?.photo}
                alt={AdminBlog?.data[0]?.category}
                className="mainImage img1"
              />
              <div className="img_textarea textarea">
                <p className="text2">{AdminBlog?.data[0]?.title}</p>
                <div className="text1">
                  <h5>{AdminBlog?.data[0]?.category}</h5>-
                  <h5>
                    {" "}
                    {AdminBlog?.data[0]?.createdAt.slice(
                      0,
                      AdminBlog?.data[0]?.createdAt.indexOf("T")
                    )}
                  </h5>
                </div>
              </div>
            </div>
            <div className="secondCard">
              <div className="card_Img1 cards">
                <img
                  loading={"lazy"}
                  src={AdminBlog?.data[1]?.photo}
                  alt={AdminBlog?.data[1]?.category}
                  className="mainImage img2"
                />
                <div className="img_textarea textarea">
                  <p className="text2">{AdminBlog?.data[1]?.title}</p>

                  <div className="text1">
                    <h5>{AdminBlog?.data[0]?.category}</h5>-
                    <h5>
                      {AdminBlog?.data[0]?.createdAt.slice(
                        0,
                        AdminBlog?.data[0]?.createdAt.indexOf("T")
                      )}
                    </h5>
                  </div>
                </div>
              </div>
              <div className="card_Img2 cards">
                <div className="card_Img2_text">
                  <img
                    loading={"lazy"}
                    src={AdminBlog?.data[2]?.photo}
                    alt={AdminBlog?.data[2]?.category}
                    className="mainImage img3"
                  />

                  <div className="img_smalltext textarea">
                    <p className="text4">{AdminBlog?.data[2]?.title}</p>
                  </div>
                </div>

                <div className="card_Img2_text">
                  <img
                    loading={"lazy"}
                    src={AdminBlog?.data[3]?.photo}
                    alt={AdminBlog?.data[3]?.category}
                    className="mainImage img4"
                  />
                  <div className="img_smalltext textarea">
                    <p className="text4">{AdminBlog?.data[3]?.title}</p>
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

                {FeaturedBlogs?.isFetched && (
                  <div className="part1_cn">
                    <img
                      loading={"lazy"}
                      src={
                        FeaturedBlogs?.data[0]?.photo ||
                        AdminBlog?.data[0]?.photo
                      }
                      alt={
                        FeaturedBlogs?.data[0]?.category ||
                        AdminBlog?.data[0]?.category
                      }
                      className="mainImg"
                    />
                    <div className="blog_detailsCn1">
                      <span className="sp_text">
                        <h4>
                          {FeaturedBlogs?.data[0]?.category ||
                            AdminBlog?.data[0]?.category}
                        </h4>
                        <b className="timeIcon">
                          <BsCalendarDate />
                          {FeaturedBlogs?.data[0]?.createdAt.slice(
                            0,
                            AdminBlog?.data[0]?.createdAt.indexOf("T")
                          ) ||
                            AdminBlog?.data[0]?.createdAt.slice(
                              0,
                              AdminBlog?.data[0]?.createdAt.indexOf("T")
                            )}
                        </b>
                      </span>
                      <p className="mainImg_desc">
                        {FeaturedBlogs?.data[0]?.title ||
                          AdminBlog?.data[0]?.title}
                      </p>
                    </div>
                  </div>
                )}

                <div className="part2_cn">
                  {FeaturedBlogs?.isFetched && (
                    <article className="artical1 artical">
                      <img
                        loading={"lazy"}
                        src={
                          FeaturedBlogs?.data[1]?.photo ||
                          AdminBlog?.data[1]?.photo
                        }
                        alt={
                          FeaturedBlogs?.data[1]?.category ||
                          AdminBlog?.data[1]?.category
                        }
                        className="articalImg"
                      />
                      <p className="title_paragraph">
                        {FeaturedBlogs?.data[1]?.title ||
                          AdminBlog?.data[1]?.title}
                      </p>
                      <div className="articalDetails">
                        <span className="user_cn">
                          <BsPersonFill className="user_icon" />
                          <User
                            blog={FeaturedBlogs?.data[1] || AdminBlog?.data[1]}
                          />
                        </span>

                        <span className="time_cn">
                          <b className="timeIcon">
                            <BsCalendarDate />
                          </b>
                          {FeaturedBlogs?.data[1]?.createdAt?.slice(
                            0,
                            FeaturedBlogs?.data[1]?.createdAt?.indexOf("T")
                          ) ||
                            AdminBlog?.data[1]?.createdAt?.slice(
                              0,
                              AdminBlog?.data[1]?.createdAt?.indexOf("T")
                            )}
                        </span>
                      </div>
                    </article>
                  )}

                  {FeaturedBlogs?.isFetched && (
                    <article className="artical2 artical">
                      <img
                        loading={"lazy"}
                        src={
                          FeaturedBlogs?.data[2]?.photo ||
                          AdminBlog?.data[2]?.photo
                        }
                        alt={
                          FeaturedBlogs?.data[2]?.category ||
                          AdminBlog?.data[2]?.category
                        }
                        className="articalImg"
                      />
                      <p className="title_paragraph">
                        {FeaturedBlogs?.data[2]?.title ||
                          AdminBlog?.data[2]?.title}
                      </p>

                      <div className="articalDetails">
                        <span className="user_cn">
                          <BsPersonFill className="user_icon" />
                          <User
                            blog={FeaturedBlogs?.data[2] || AdminBlog?.data[2]}
                          />
                        </span>
                        <span className="time_cn">
                          <b className="timeIcon">
                            <BsCalendarDate />
                          </b>
                          {FeaturedBlogs?.data[2]?.createdAt.slice(
                            0,
                            FeaturedBlogs?.data[2]?.createdAt.indexOf("T")
                          ) ||
                            AdminBlog?.data[2]?.createdAt.slice(
                              0,
                              AdminBlog?.data[2]?.createdAt.indexOf("T")
                            )}
                        </span>
                      </div>
                    </article>
                  )}
                </div>

                {FeaturedBlogs?.isFetched && (
                  <div className="part1_cn var_part3">
                    <img
                      loading={"lazy"}
                      src={
                        FeaturedBlogs?.data[3]?.photo ||
                        AdminBlog?.data[3]?.photo
                      }
                      alt={
                        FeaturedBlogs?.data[3]?.category ||
                        AdminBlog?.data[3]?.category
                      }
                      className="mainImg"
                    />
                    <div className="blog_detailsCn1">
                      <span className="sp_text">
                        <h4>
                          {FeaturedBlogs?.data[3]?.category ||
                            AdminBlog?.data[3]?.category}
                        </h4>
                        <b className="timeIcon">
                          <BsCalendarDate />
                          {FeaturedBlogs?.data[3]?.createdAt.slice(
                            0,
                            FeaturedBlogs?.data[3]?.createdAt.indexOf("T")
                          ) ||
                            AdminBlog?.data[3]?.createdAt.slice(
                              0,
                              AdminBlog?.data[3]?.createdAt.indexOf("T")
                            )}
                        </b>
                      </span>
                      <p className="mainImg_desc">
                        {FeaturedBlogs?.data[3]?.title ||
                          AdminBlog?.data[3]?.title}
                      </p>
                    </div>
                  </div>
                )}
              </div>
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
                            onClick={() =>
                              increaseWatch(data?.watched, data?.id)
                            }
                          >
                            <img
                              loading={"lazy"}
                              src={data.photo}
                              alt={data.id}
                              className="sideBlogImg"
                            />
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
                      {categoryCount?.map((blog, i) => {
                        return (
                          <li
                            className="categoryItem"
                            key={blog.category}
                            onClick={() => navigate("/blogs")}
                          >
                            <span>{blog.category}</span>
                            <span>{blog.count}</span>
                          </li>
                        );
                      })}
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
      </div>
    </div>
  );
}
