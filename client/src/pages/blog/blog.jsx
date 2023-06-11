import "./scss/blog.css";
import { GiNextButton } from "react-icons/gi";
import { GiPreviousButton } from "react-icons/gi";
import { AiOutlineEye } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";

import { useCookies } from "react-cookie";
import { useQueries, useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import User from "../../components/user/user";
export default function Blog() {
    
  const [cookies] = useCookies("user");
  const navigate = useNavigate();
  const location = useLocation();
  const [filBlogs, setfilBlogs] = useState([]);

  const [StartIndex, setStartIndex] = useState(0);
  const [EndIndex, setEndIndex] = useState(3);

  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const DateNow = year + "-" + month + "-" + day;

  const [blogId, setBlogId] = useState(
    location?.pathname.slice(location?.pathname.lastIndexOf("/") + 1)
  );
  /////////////////////////
  const getBlog = async () => {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/blog/${blogId}`);
    return res.data;
  };

  const getBlogs = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/api/blogs/user/${blogId}`
    );
    return res.data;
  };

  const getAllBlogs = async () => {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/blog`);
    return res.data;
  };

  const results = useQueries({
    queries: [
      {
        queryKey: ["userBlog", blogId],
        queryFn: getBlog,
      },
      {
        queryKey: ["usersBlogs", blogId],
        queryFn: getBlogs,
      },
      {
        queryKey: ["Blogs", blogId],
        queryFn: getAllBlogs,
      },
    ],
  });


  const handleBlogLikes = async (id, userid) => {
    if (userid) {
      const url = `${process.env.REACT_APP_SERVER_API}/api/blog/liked/${id}/${userid}`;
      const res = await axios.put(url);

      return res.data;
    } else {
      navigate("/signin");
    }
  };
  const mutateBlogLikes = useMutation({
    mutationKey: ["blogs"],
    mutationFn: ([id, userid]) => handleBlogLikes(id, userid),
    onSuccess: () => {
      results[0].refetch();
    },
  });
  ///////////////////////////
  const [allBlogs, setAllBlogs] = useState(results[2]?.data?.slice(0, 3));
  // console.log(results);

  const HandleNext = () => {
    // EndIndex
    if (EndIndex < results[2]?.data.length) {
      setEndIndex((prev) => (prev += 3));
      setStartIndex((prev) => (prev += 3));
      const sliceBlog = results[2]?.data?.slice(StartIndex, EndIndex);
      setAllBlogs(sliceBlog);
    }
  };

  const HandlePrev = () => {
    if (StartIndex > 0) {
      setEndIndex((prev) => (prev -= 3));
      setStartIndex((prev) => (prev -= 3));
      const sliceBlog = results[2]?.data?.slice(StartIndex, EndIndex);
      setAllBlogs(sliceBlog);
    }
  };
  const blog = results[0].data;
  const blogs = results[1];
  // const AllBlogs = results[2]
  // console.log(results[2]);
  useEffect(() => {
    if (blogs.isSuccess) {
      const filteredData = blogs?.data?.filter((bl) => {
        return bl.id !== blog?.id;
      });
      setfilBlogs(filteredData);
    } else {
      setfilBlogs(results[1].data);
    }

    setAllBlogs(results[2]?.data?.slice(6, 9));
  }, [blogs.isSuccess, location.pathname]);


  function getNumberOfDays(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);

    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();
    // console.log(diffInTime);
    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);
    // console.log(diffInDays);
    if (diffInDays === 0) return "today";
    else if (diffInDays === 1) return diffInDays + " Day Ago";
    return diffInDays + " Days Ago";
  }
  //// increment blogs watch number when the blog is clicked on
  const increaseWatch = (watch, id) => {
    const url = `${process.env.REACT_APP_SERVER_API}/api/blog/${id}`;
    watch = Number(watch);
    const res = axios.put(url, {
      watched: (watch += 1).toString(),
    });
    // console.log(res);
    setBlogId(id);
    navigate(`/blogs/${id}`);
  };
  // console.log(getNumberOfDays("2/1/2021", "3/1/2021"));

  useEffect(() => {
    if (blog) {
      ///////// api data comes with html elements so using innerhtml to kinda filter them out ////

      const blogDesc = document.querySelector(".blogDesc");
      blogDesc.innerHTML = blog?.desc;
    }
  }, [blog]);

  if (results[0].isLoading && results[1].isLoading && results[2].isLoading) {
    return <Skeleton count={10} />;
  }
  return (
    <div className="SBlog">
      <div className="blog_cn">
        <div className="personalBlog">
          <div className="mainBlog">
            <article className="card_article">
              <div className="img_cn">
                <img
                  src={blog?.photo}
                  alt={blog?.category}
                  className="mainBlogImg"
                />
                <div className="moreDetailsCn">
                  <div className="write_div">
                    <p>
                      posted by <User blog={blog} />
                    </p>
                    <p>
                      <AiOutlineEye /> {blog?.watched} views
                    </p>
                  </div>
                </div>
              </div>

              <div className="cardInfoCn">
                <div className="textAreaDiv">
                  <div className="category_div">
                    <p>{blog?.category}</p>
                  </div>
                  <div className="body_details_div">
                    <h2>{blog?.title}</h2>
                    <div className="blogDesc">
                      {/* this div is not empty! using dom to display text in     */}
                    </div>
                  </div>

                  <div className="footer_blog_details">
                    <span className="likeBtnCn">
                    <button className="likeBtn"
                          onClick={() =>
                            mutateBlogLikes.mutate([
                              blog?.id,
                              cookies?.user?.id,
                            ])
                          }
                        >
                          {(blog?.liked?.includes(
                            parseInt(cookies?.user?.id)
                          ) && <AiFillLike className="BlogLikedBtn"/>) || <AiOutlineLike className="BlogNotLikedBtn"/>}
                        </button>
                    </span>
                      <span className="DateCn">
                    
                      {" " +
                        getNumberOfDays(
                          blog?.createdAt.slice(
                            0,
                            blog?.createdAt.indexOf("T")
                          ),
                          DateNow
                        ) +
                        " "}
                    </span> 
                  </div>
                </div>
              </div>
            </article>
          </div>
       
          <div className="sideBlog_Div">
            <h4>
              blogs from <User blog={blog} />
            </h4>

            <div className="sideBlog_cr">
              {blogs.isLoading == true ? (
                <Skeleton count={10} />
              ) : (
                filBlogs?.map((sideBlog) => {
                  return (
                    <div
                      className="sideBlogCards"
                      key={sideBlog.id}
                      onClick={() =>
                        increaseWatch(sideBlog.watched, sideBlog.id)
                      }
                    >
                      <img
                        // style={{ width: "200px", height: "200px" }}
                        src={sideBlog.photo}
                        alt="img"
                        className="sideBlogImg"
                      />

                      <div className="textAreaCr">
                        <div className="desc_div">
                          {blog?.title?.length > 100
                            ? blog?.title.substring(0, 60)
                            : blog?.title}{" "}
                          ...
                        </div>
                        <div className="title_div">
                          <h5>{sideBlog?.category}</h5>
                          <h5>
                            {getNumberOfDays(
                              blog?.createdAt.slice(
                                0,
                                blog?.createdAt.indexOf("T")
                              ),
                              DateNow
                            )}
                          </h5>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              {filBlogs?.length == 0 && (
                <div
                  className="sideBlog_cr"
                  style={{
                    /* justifyContent: "flex-end", */ overflow: "hidden",
                  }}
                >
                  <div className="sideBlogCards" style={{ overflow: "hidden" }}>
                    <p
                      style={{
                        color: "white",
                        background: "#403a3ab3",
                        padding: "10px",
                      }}
                    >
                      no other blogs are posted by the user yet!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="allBlogs">
          <h2>more blogs just like this</h2>

          <div className="allBlogs_cn">
            <button onClick={HandlePrev} className="blogs_cards_btn">
              <GiPreviousButton className="blogs_cards_icon" />
            </button>

            {allBlogs?.map((blog, index) => {
              return (
                <div className="card_div" key={index}>
                  <img
                    src={blog.photo}
                    alt={blog.id}
                    className="footer_side_photo"
                  />

                  <div className="allBlogsText_Cr">
                    <div className="allBlogs_title">
                      <p>{blog?.category}</p>
                      <p>
                        <User blog={blog} />
                        {/* {getNumberOfDays(blog?.createdAt.slice(0, blog?.createdAt.indexOf("T")),DateNow)} */}
                        {/* {blog?.createdAt.slice(0, blog?.createdAt.indexOf("T"))} */}
                      </p>
                    </div>

                    <div className="desc_div">
                      <p>{blog?.title.substring(0, 100)}...</p>
                    </div>

                    <button
                      className="allBlogs_Btn"
                      // onClick={() => blogChange(blog?.id)}
                      onClick={() => increaseWatch(blog.watched, blog.id)}
                    >
                      read more...
                    </button>
                  </div>
                </div>
              );
            })}
            <button onClick={HandleNext} className="blogs_cards_btn">
              <GiNextButton className="blogs_cards_icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
