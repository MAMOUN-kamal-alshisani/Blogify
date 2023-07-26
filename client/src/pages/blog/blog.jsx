import { GiNextButton } from "react-icons/gi";
import { GiPreviousButton } from "react-icons/gi";
import { AiOutlineEye } from "react-icons/ai";
// import { AiFillLike } from "react-icons/ai";
// import { AiOutlineLike } from "react-icons/ai";
import { FcLike,FcLikePlaceholder } from "react-icons/fc";
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
          console.log(data?.slice(0, 3));
          setAllCarouselBlogs(data?.slice(0, 3));
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
  if (results[0].isError || results[1].isError && results[2].isError) {
    return 'something went wrong please try again'
  }
  return (
    <div className="SBlog">
      <div className="blog_cn">
        <div className="personalBlog">
          <div className="mainBlog">
            <article className="card_article">
              <div className="img_cn">
                <LazyLoadImage
                  src={blog?.photo}
                  alt={blog?.category}
                  className="mainBlogImg"
                />
              </div>
              <div className="moreDetailsCn">
                <div className="write_div">
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
                    <span className="user_para">
                      posted by <User blog={blog} />
                    </span>
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
                      onClick={() =>
                        increaseWatch(sideBlog.watched, sideBlog.id)
                      }
                    >
                      <LazyLoadImage
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
                              sideBlog?.createdAt.slice(
                                0,
                                sideBlog?.createdAt.indexOf("T")
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
                    src={blog.photo}
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
