import { GiNextButton } from "react-icons/gi";
import { GiPreviousButton } from "react-icons/gi";
// import { AiOutlineEye } from "react-icons/ai";
// import { AiFillLike } from "react-icons/ai";
// import { AiOutlineLike } from "react-icons/ai";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { FaRegArrowAltCircleRight } from "react-icons/fa";


// import { FcLikePlaceholder } from "react-icons/fc";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useQueries, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import User from "../../components/user/user";
import "./scss/blog.css";
import { CiCalendarDate } from "react-icons/ci";
import {
  AiFillTwitterSquare,
  AiOutlineMail,
  AiFillLinkedin,
} from "react-icons/ai";

export default function Blog() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const [cookies] = useCookies("user");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [StartIndex, setStartIndex] = useState(0);
  const [EndIndex, setEndIndex] = useState(3);
  const [blogId, setBlogId] = useState(
    location?.pathname.slice(location?.pathname.lastIndexOf("/") + 1)
  );
  const [allCarouselBlogs, setAllCarouselBlogs] = useState();
  const [userSocialMedia, setUserSocialMedia] = useState("");
  //// to calculate how many days long a blog was posted
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const DateNow = year + "-" + month + "-" + day;

  function getNumberOfDays(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();
    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    if (diffInDays === 0) return "today";
    else if (diffInDays === 1) return diffInDays + " Day Ago";
    return diffInDays + " Days Ago";
  }

  /////////////////////////
  const getBlog = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/api/blog/${blogId}`
    );
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
  const getUserSocials = async (blog) => {
    if (blog.UserId !== undefined) {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/api/user/profile/${blog?.UserId}`
      );
      console.log(res.data);
      return res.data;
    }
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
        onSuccess: (data) => {
          setAllCarouselBlogs(data?.slice(0, 3));
        },
      },
      {
        queryKey: ["usersSocials", blogId],
        queryFn: getUserSocials,
        onSuccess: (data) => {
          setUserSocialMedia(data);
        },
      },
    ],
  });
  /// query api blogs data
  const blog = results[0].data;
  const blogs = results[1];
  const CarouselBlogs = results[2].data;

  //// function for liking and unliking blog button
  const handleBlogLikes = async (id, userid) => {
    if (userid) {
      const url = `${process.env.REACT_APP_SERVER_API}/api/blog/${id}/liked/${userid}`;
      const res = await axios.put(url);
      return res.data;
    } else {
      navigate("/signin");
    }
  };

  const mutateBlogLikes = useMutation({
    mutationFn: ([id, userid]) => handleBlogLikes(id, userid),
    onSuccess: () => {
      queryClient.invalidateQueries(["userBlog"]);
      // results[0].refetch();
    },
  });
  ///////////////////////////

  //// increment blogs watch number when the blog is clicked on
  const increaseWatch = (watch, id) => {
    const url = `${process.env.REACT_APP_SERVER_API}/api/blog/${id}`;
    watch = Number(watch);
    const res = axios.put(url, {
      watched: (watch += 1).toString(),
    });
    setBlogId(id);
    navigate(`/blogs/${id}`);
  };

  /// blogs Carousel handling function
  const HandleNext = () => {
    // EndIndex
    if (EndIndex < results[2]?.data.length) {
      setEndIndex((prev) => (prev += 3));
      setStartIndex((prev) => (prev += 3));
      const sliceBlog = CarouselBlogs?.slice(StartIndex, EndIndex);
      setAllCarouselBlogs(sliceBlog);
    }
  };

  const HandlePrev = () => {
    if (StartIndex > 0) {
      setEndIndex((prev) => (prev -= 3));
      setStartIndex((prev) => (prev -= 3));
      const sliceBlog = CarouselBlogs?.slice(StartIndex, EndIndex);
      setAllCarouselBlogs(sliceBlog);
    }
  };

  useEffect(() => {
    if (blogs.isSuccess) {
      const filteredData = blogs?.data?.filter((bl) => {
        return bl.id !== blog?.id;
      });
      setFilteredBlogs(filteredData);
    } else {
      setFilteredBlogs(results[1].data);
    }
  }, [blogs.isSuccess, location.pathname]);
  // CarouselBlogs
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
  if (results[0].isError || (results[1].isError && results[2].isError)) {
    return "something went wrong please try again";
  }
  return (
    <div className="SBlog">
      <div className="blog_cn">
        <div className="personalBlog">
          <div className="mainBlog">
            <article className="card_article">
              <h1>{blog?.title}</h1>
              <div className="user_infomation">
                <div className="user_para">
                  <span>posted by</span> <User blog={blog} />
                </div>
                <div className="socials_div">
                  <div className="icon_cn">
                    <a
                      href={userSocialMedia?.twitter || ""}
                      className="twitter_icon socials"
                      target="_blank"
                    >
                      <AiFillTwitterSquare />
                    </a>
                  </div>

                  <div className="icon_cn">
                    <a
                      href={`mailto:${userSocialMedia?.socialMail}`}
                      className="mail_icon socials"
                      target="_blank"
                    >
                      <AiOutlineMail />
                    </a>
                  </div>
                  <div className="icon_cn">
                    <a
                      href={userSocialMedia?.linkedIn || ""}
                      className="linkedin_icon socials"
                      target="_blank"
                    >
                      <AiFillLinkedin />
                    </a>
                  </div>
                </div>
              </div>
              <div className="img_cn">
                <LazyLoadImage
                  src={
                    blog?.photo ||
                    "https://tse4.mm.bing.net/th?id=OIP.kgfkdioyvqIrLPdA5bXckAHaE8&pid=Api&P=0&h=220"
                  }
                  alt={blog?.category}
                  className="mainBlogImg"
                />
                <div className="dateTime">
                  <CiCalendarDate />{" "}
                  {blog?.createdAt.slice(
                    0,
                    blog?.createdAt.indexOf("T"),
                    DateNow
                  )}
                </div>
              </div>
              {/* <div className="moreDetailsCn"> */}
              {/* <div className="write_div">
                  <span className="DateCn">
                    {" " +
                      getNumberOfDays(
                        blog?.createdAt.slice(0, blog?.createdAt.indexOf("T")),
                        DateNow
                      ) +
                      " "}
                  </span>
                  <span>
                    <AiOutlineEye />
                    {blog?.watched}
                  </span>
                </div> */}
              {/* </div> */}
              <div className="cardInfoCn">
                <div className="textAreaDiv">
                  <div className="category_div">
                    <p>{blog?.category}</p>
                  </div>
                  <div className="body_details_div">
                    <div className="blogDesc">
                      {/* this div is not empty! using dom to display text in     */}
                    </div>
                  </div>

                  <div className="footer_blog_details">
                    <span className="likeBtnCn">
                      <button
                        className="likeBtn"
                        onClick={() =>
                          mutateBlogLikes.mutate([blog?.id, cookies?.user?.id])
                        }
                      >
                        {(blog?.liked?.includes(
                          parseInt(cookies?.user?.id)
                        ) && <FcLike className="BlogLikedBtn" />) || (
                          <FcLikePlaceholder className="BlogNotLikedBtn" />
                        )}
                      </button>
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
                filteredBlogs?.map((sideBlog) => {
                  return (
                    <div
                      className="sideBlogCards"
                      key={sideBlog.id}
                      // onClick={() =>
                      //   increaseWatch(sideBlog.watched, sideBlog.id)
                      // }
                    >
                      <div className="sideBlogTime">
                        {sideBlog?.createdAt.slice(
                          0,
                          sideBlog?.createdAt.indexOf("T"),
                          DateNow
                        )}
                      </div>
                      <h3 className="sideBlogTitle">
                        {sideBlog?.title?.length > 100
                          ? sideBlog?.title.substring(0, 60)
                          : sideBlog?.title}
                      </h3>
                      <div className="sideBlogFooter">
                        <span className="sideBlogCategory">
                          {sideBlog?.category}
                        </span>
                        <button
                          onClick={() =>
                            increaseWatch(sideBlog.watched, sideBlog.id)
                          }
                          className="sideBlogBtn"
                        >
                         <FaRegArrowAltCircleRight />
                        </button>
                      </div>

                      {/* <div className="sideBlogTime">
                        {blog?.createdAt.slice(
                          0,
                          blog?.createdAt.indexOf("T"),
                          DateNow
                        )}
                      </div> */}
                      {/* <div className="sideBlogTitle">
                        {blog?.title?.length > 100
                          ? blog?.title.substring(0, 60)
                          : blog?.title}
                      </div> */}

                      {/* <div className="sideBlogDesc">
                      {blog?.desc?.length > 100
                          ? blog?.desc.substring(0, 60)
                          : blog?.desc}
                          ... 
                      </div> */}
                      {/* <LazyLoadImage
                        src={
                          sideBlog.photo ||
                          "https://tse4.mm.bing.net/th?id=OIP.kgfkdioyvqIrLPdA5bXckAHaE8&pid=Api&P=0&h=220"
                        }
                        alt="img"
                        className="sideBlogImg"
                      /> */}

                      {/* <div className="textAreaCr">
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
                              sideBlog?.createdAt.slice(
                                0,
                                sideBlog?.createdAt.indexOf("T")
                              ),
                              DateNow
                            )}
                          </h5>
                        </div>
                      </div> */}
                    </div>
                  );
                })
              )}
              {filteredBlogs?.length == 0 && (
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

            {allCarouselBlogs?.map((blog, index) => {
              return (
                <div className="card_div" key={index}>
                  <LazyLoadImage
                    src={
                      blog.photo ||
                      "https://tse4.mm.bing.net/th?id=OIP.kgfkdioyvqIrLPdA5bXckAHaE8&pid=Api&P=0&h=220"
                    }
                    alt={blog.id}
                    className="footer_side_photo"
                  />

                  <div className="allBlogsText_Cr">
                    <div className="allBlogs_title">
                      <p>{blog?.category}</p>
                      <p>
                        <User blog={blog} />
                      </p>
                    </div>

                    <div className="desc_div">
                      <p>{blog?.title.substring(0, 100)}...</p>
                    </div>

                    <button
                      className="allBlogs_Btn"
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
