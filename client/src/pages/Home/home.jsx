import { AiFillGithub } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { SiMicrodotblog } from "react-icons/si";
import { FaSignInAlt } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";


import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LazyLoadImage } from "react-lazy-load-image-component";
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
    return res.data;
  };
  //// react query api
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
      watched: (watch += 1).toString()
    });
    console.log(res);
    navigate(`/blogs/${id}`);
  };

  //// display loading Skeleton before data fetching is complete
  if (results[1]?.isLoading) {
    return <Skeleton count={10} />;
  }

  // const allBoxes = document.querySelectorAll(".box");
  // window.addEventListener("scroll", () => checkBoxes());
  // function checkBoxes() {
  //   const triggerBottom = (window.innerHeight / 5 * 4) ;
  //   allBoxes.forEach(box=>{
  //     const topBox =box.getBoundingClientRect().top

  //     if(topBox < triggerBottom){
  //       box.classList.add('show')
  //     }else{
  //       box.classList.remove('show')
  //     }
  //   })
  // }
  return (
    <div className="home">
              <section className="row0_section0 box">
          <div className="first_section_cn">
            <div className="text_part">
              <h1>Be Part Of Blogify Write And Review Diverse Topics</h1>
            </div>
            <div className="img_part">
              <p>
                Blogify provides diverse categories of topics where you can read
                or write a topic of your interest
              </p>
            </div>
            <button className="sg_btn" onClick={() => navigate("/signin")}>
              start-up
            </button>
          </div>
        </section>
      <div className="home_cn">


        <section className="row1_section1 box">
          <div className="container">
            {AdminBlog.isFetched && (
              <div className="firstCard">
                <LazyLoadImage 
                  src={AdminBlog?.data[0]?.photo}
                  alt={AdminBlog?.data[0]?.category}
                  className="mainImage img1"
                  loading="lazy"
                />
                <div className="img_textarea textarea">
                  <p className="text2">{AdminBlog?.data[0]?.title}</p>
                  <div className="text1">
                    <h5>{AdminBlog?.data[0]?.category}</h5>-
                    <h5>
                      {" "}
                      {AdminBlog?.data[0]?.createdAt?.slice(
                        0,
                        AdminBlog?.data[0]?.createdAt?.indexOf("T")
                      )}
                    </h5>
                  </div>
                </div>
              </div>
            )}

            {AdminBlog.isLoading && (
              <div className="firstCard">
                <LazyLoadImage
                  src="https://cdn.projectexpedition.com/photos/43793touractivityislandhopping5_sized.jpg"
                  alt="Travel"
                  className="mainImage img1"
                />
                <div className="img_textarea textarea">
                  <p className="text2">Tour of two Towns: Trogir and Split</p>
                  <div className="text1">
                    <h5>Travel</h5>-<h5>2023-06-11</h5>
                  </div>
                </div>
              </div>
            )}
            {AdminBlog.isFetched && (
              <div className="secondCard">
                <div className="card_Img1 cards">
                  <LazyLoadImage
                    loading={"lazy"}
                    src={AdminBlog?.data[1]?.photo}
                    alt={AdminBlog?.data[1]?.category}
                    className="mainImage img2"
                  />
                  <div className="img_textarea textarea">
                    <p className="text2">{AdminBlog?.data[1]?.title}</p>

                    <div className="text1">
                      <h5>{AdminBlog?.data[1]?.category}</h5>-
                      <h5>
                        {AdminBlog?.data[1]?.createdAt.slice(
                          0,
                          AdminBlog?.data[1]?.createdAt.indexOf("T")
                        )}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="card_Img2 cards">
                  <div className="card_Img2_text">
                    <LazyLoadImage
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
                    <LazyLoadImage
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
            )}
            {AdminBlog.isLoading && (
              <div className="secondCard">
                <div className="card_Img1 cards">
                  <LazyLoadImage
                    loading={"lazy"}
                    src="https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_540,w_960,x_0,y_0/dpr_1.5/c_limit,w_690/fl_lossy,q_auto/v1/galleries/2010/09/02/15-worst-hurricanes/destructive-hurricanes---andrew_jh8sjo"
                    alt="science"
                    className="mainImage img2"
                  />
                  <div className="img_textarea textarea">
                    <p className="text2">15 Worst Hurricanes of All Time</p>

                    <div className="text1">
                      <h5>science</h5>-<h5>2023-06-11</h5>
                    </div>
                  </div>
                </div>
                <div className="card_Img2 cards">
                  <div className="card_Img2_text">
                    <LazyLoadImage
                      loading={"lazy"}
                      src="https://fromscratchfast.com/wp-content/uploads/2016/12/Whipped-Ricotta-Crostini-4.jpg"
                      alt="food"
                      className="mainImage img3"
                    />
                    <div className="img_smalltext textarea">
                      <p className="text4">
                        Whipped Ricotta Toast Crostini With Roasted Tomatoes
                      </p>
                    </div>
                  </div>
                  <div className="card_Img2_text">
                    <LazyLoadImage
                      loading={"lazy"}
                      src="https://static01.nyt.com/images/2021/03/01/obituaries/Goodenough-01/Goodenough-01-facebookJumbo.jpg"
                      alt="technology"
                      className="mainImage img4"
                    />
                    <div className="img_smalltext textarea">
                      <p className="text4">
                        Lithium-ion battery creator John Goodenough dies at 100
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="row2_section2 box">
          <div className="section2_cn">
            <div className="container">
              <div className="part1 section">
                <div className="featured_div">
                  <h1 className="featured_header">Featured Blogs</h1>
                </div>
                {results[3].isError ||
                  (results[3].isLoading && (
                    <div className="part1_cn">
                      <LazyLoadImage
                        loading={"lazy"}
                        src={
                          "https://imageio.forbes.com/specials-images/imageserve/61d52d4e3a76ed81ac034ea8/The-10-Tech-Trends-That-Will-Transform-Our-World/960x0.jpg?height=399&width=711&fit=bounds"
                        }
                        alt={"technology"}
                        className="mainImg"
                      />
                      <div className="blog_detailsCn1">
                        <span className="sp_text">
                          <h4>{"technology"}</h4>
                          <b className="timeIcon">
                            <BsCalendarDate />
                            2023/7/1
                          </b>
                        </span>
                        <p className="mainImg_desc">
                          what is new in tech world
                        </p>
                      </div>
                    </div>
                  ))}
                {results[3].isFetched && (
                  <div className="part1_cn">
                    <LazyLoadImage
                      loading={"lazy"}
                      src={
                        results[3]?.data[0]?.photo
                        //  || AdminBlog?.data[0]?.photo
                      }
                      alt={
                        results[3]?.data[0]?.category
                        // || AdminBlog?.data[0]?.category
                      }
                      className="mainImg"
                    />
                    <div className="blog_detailsCn1">
                      <span className="sp_text">
                        <h4>
                          {
                            results[3]?.data[0]?.category
                            // || AdminBlog?.data[0]?.category
                          }
                        </h4>
                        <b className="timeIcon">
                          {/* <BsCalendarDate /> */}
                          {
                            results[3]?.data[0]?.createdAt?.slice(
                              0,
                              results[3]?.data[0]?.createdAt?.indexOf("T")
                            )
                            // ||
                            //   AdminBlog?.data[0]?.createdAt?.slice(
                            //     0,
                            //     AdminBlog?.data[0]?.createdAt?.indexOf("T")
                            //   )
                            // || FeaturedBlogs?.data[0]?.createdAt?.slice(
                            //   0,FeaturedBlogs?.data[0]?.createdAt?.indexOf("T")
                          }
                        </b>
                      </span>
                      <p className="mainImg_desc">
                        {
                          results[3]?.data[0]?.title
                          // ||AdminBlog?.data[0]?.title
                        }
                      </p>
                      <span className="user_span">
                        {" "}
                        {/* by{" "} */}
                        <b>
                          <User blog={results[3]?.data[0]} />
                        </b>
                      </span>
                    </div>
                  </div>
                )}
                {
                  results[3].isLoading ||
                    (results[3].isError && (
                      <div className="part1_cn">
                        <LazyLoadImage
                          loading={"lazy"}
                          src={
                            "https://imageio.forbes.com/specials-images/imageserve/61d52d4e3a76ed81ac034ea8/The-10-Tech-Trends-That-Will-Transform-Our-World/960x0.jpg?height=399&width=711&fit=bounds"
                          }
                          alt={"technology"}
                          className="mainImg"
                        />
                        <div className="blog_detailsCn1">
                          <span className="sp_text">
                            <h4>{"technology"}</h4>
                            <b className="timeIcon">
                              <BsCalendarDate />
                              {"2023/7/1"}
                            </b>
                          </span>
                          <p className="mainImg_desc">
                            {"what is new in tech world"}
                          </p>
                        </div>
                      </div>
                    ))
                  // )
                }

                <div className="part2_cn">
                  {FeaturedBlogs?.isFetched && (
                    <article className="artical1 artical">
                      <LazyLoadImage
                        loading={"lazy"}
                        src={
                          FeaturedBlogs?.data[1]?.photo
                          // || AdminBlog?.data[1]?.photo
                        }
                        alt={
                          FeaturedBlogs?.data[1]?.category

                          // || AdminBlog?.data[1]?.category
                        }
                        className="articalImg"
                      />
                      <p className="title_paragraph">
                        {
                          FeaturedBlogs?.data[1]?.title
                          //  || AdminBlog?.data[1]?.title
                        }
                      </p>
                      <div className="articalDetails">
                        <span className="user_cn">
                          {/* <BsPersonFill className="user_icon" /> */}

                          <User
                            blog={
                              FeaturedBlogs?.data[1]
                              // || AdminBlog?.data[1]
                            }
                          />
                        </span>

                        <span className="time_cn">
                          <b className="timeIcon">
                            <BsCalendarDate />
                          </b>
                          {
                            FeaturedBlogs?.data[1]?.createdAt?.slice(
                              0,
                              FeaturedBlogs?.data[1]?.createdAt?.indexOf("T")
                            )
                            // ||
                            //   AdminBlog?.data[1]?.createdAt?.slice(
                            //     0,
                            //     AdminBlog?.data[1]?.createdAt?.indexOf("T")
                            //   )
                          }
                        </span>
                      </div>
                    </article>
                  )}

                  {FeaturedBlogs?.isFetched && (
                    <article className="artical2 artical">
                      <LazyLoadImage
                        loading={"lazy"}
                        src={
                          FeaturedBlogs?.data[2]?.photo

                          // || AdminBlog?.data[2]?.photo
                        }
                        alt={
                          FeaturedBlogs?.data[2]?.category
                          // || AdminBlog?.data[2]?.category
                        }
                        className="articalImg"
                      />
                      <p className="title_paragraph">
                        {
                          FeaturedBlogs?.data[2]?.title
                          // ||  AdminBlog?.data[2]?.title
                        }
                      </p>

                      <div className="articalDetails">
                        <span className="user_cn">
                          {/* <BsPersonFill className="user_icon" /> */}
                          <User
                            blog={
                              FeaturedBlogs?.data[2]
                              // || AdminBlog?.data[2]
                            }
                          />
                        </span>
                        <span className="time_cn">
                          <b className="timeIcon">
                            <BsCalendarDate />
                          </b>
                          {
                            FeaturedBlogs?.data[2]?.createdAt.slice(
                              0,
                              FeaturedBlogs?.data[2]?.createdAt.indexOf("T")
                            )
                            // ||
                            //   AdminBlog?.data[2]?.createdAt.slice(
                            //     0,
                            //     AdminBlog?.data[2]?.createdAt.indexOf("T")
                            //   )
                          }
                        </span>
                      </div>
                    </article>
                  )}
                </div>

                {FeaturedBlogs?.isFetched && (
                  <div className="part1_cn var_part3">
                    <LazyLoadImage
                      loading={"lazy"}
                      src={
                        FeaturedBlogs?.data[3]?.photo

                        // || AdminBlog?.data[3]?.photo
                      }
                      alt={
                        FeaturedBlogs?.data[3]?.category

                        // || AdminBlog?.data[3]?.category
                      }
                      className="mainImg"
                    />
                    <div className="blog_detailsCn1">
                      <span className="sp_text">
                        <h4>
                          {
                            FeaturedBlogs?.data[3]?.category
                            //  || AdminBlog?.data[3]?.category
                          }
                        </h4>
                        <b className="timeIcon">
                          {/* <BsCalendarDate /> */}
                          {
                            FeaturedBlogs?.data[3]?.createdAt.slice(
                              0,
                              FeaturedBlogs?.data[3]?.createdAt.indexOf("T")
                            )
                            // ||
                            //   AdminBlog?.data[3]?.createdAt.slice(
                            //     0,
                            //     AdminBlog?.data[3]?.createdAt.indexOf("T")
                            //   )
                          }
                        </b>
                      </span>
                      <p className="mainImg_desc">
                        {
                          FeaturedBlogs?.data[3]?.title
                          // ||
                          //   AdminBlog?.data[3]?.title
                        }
                      </p>
                      <span className="user_span">
                        {" "}
                        {/* by{" "} */}
                        <b>
                          <User blog={FeaturedBlogs?.data[3]} />
                        </b>
                      </span>
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
                    {RecentBlog.isFetched === true
                      ? RecentBlog?.data?.blogs?.map((data) => {
                          return (
                            <div className="sideBlog_cn" key={data.id}>
                              <div
                                className="img_Section"
                                onClick={() =>
                                  increaseWatch(data?.watched, data?.id)
                                }
                              >
                                <LazyLoadImage
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
                        })
                      : Array(4)
                          .fill(4)
                          .map((item, i) => {
                            return (
                              <div className="sideBlog_cn" key={i}>
                                <div className="img_Section">
                                  <LazyLoadImage
                                    loading={"lazy"}
                                    src={
                                      "https://tse1.mm.bing.net/th?id=OIP.E7432LcRmDnfzlwAN_DhEQHaEz&pid=Api&P=0&h=180"
                                    }
                                    alt="photo"
                                    className="sideBlogImg"
                                  />
                                </div>
                                <div className="details_Section">
                                  <div className="blog1Div">
                                    <h4>Travel</h4>
                                  </div>
                                  <div className="blog2Div">
                                    <p>Your Ultimate Guide To Dubai</p>
                                  </div>
                                  <div className="blog1Div">
                                    <span>
                                      <b className="timeIcon">
                                        <BsCalendarDate />
                                      </b>
                                      2023/6/12
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
                      {results[2].isLoading || results[2].isError
                        ? Array(5)
                            .fill(0)
                            .map((category, i) => {
                              return (
                                <li
                                  className="categoryItem"
                                  key={i}
                                  onClick={() => navigate("/blogs")}
                                >
                                  <span>{"technology"}</span>
                                  <span>{i}</span>
                                </li>
                              );
                            })
                        : results[2].isFetched &&
                          categoryCount?.map((blog, i) => {
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
                    <div className="links_cn github">
                      <Link
                        to={
                          "https://github.com/MAMOUN-kamal-alshisani?tab=repositories"
                        }
                        className="link"
                        target="_blank"
                      >
                        <AiFillGithub className="navbar_icon" /> GitHub
                      </Link>
                    </div>
                    <div className="links_cn facebook">
                      <Link
                        to={"https://www.facebook.com/mamoun.bursi"}
                        className="link"
                        target="_blank"
                      >
                        <FaFacebook className="navbar_icon" /> Facebook
                      </Link>
                    </div>
                    <div className="links_cn linkedin">
                      <Link
                        to={"http://linkedin.com/in/mamounalshishani-350277210"}
                        className="link"
                        target="_blank"
                      >
                        <AiFillLinkedin className="navbar_icon" /> LinkedIn
                      </Link>
                    </div>
                    <div className="links_cn mail">
                      <Link
                        to={"mailto:mamoun.bursi@yahoo.com"}
                        className="link"
                        target="_blank"
                      >
                        <AiOutlineMail className="navbar_icon" /> Mail
                      </Link>
                    </div>

                    <div className="post_cn">
                      <p className="para">
                        sign-up for free and enjoy access to variety of topics!
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
                          post <SiMicrodotblog />
                        </button>
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
