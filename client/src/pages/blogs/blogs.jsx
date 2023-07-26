import "./scss/blogs.css";
import {Button,Card} from "react-bootstrap";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/pagination/pagination";
import Skeleton from "react-loading-skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import User from "../../components/user/user";
import axios from "axios";


import { AiOutlineEye } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
// import { AiFillLike } from "react-icons/ai";
// import { AiOutlineLike } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { FcLike,FcLikePlaceholder } from "react-icons/fc";

export default function Blogs() {
  const queryClient  = useQueryClient()
  const navigate = useNavigate();
  const title = document.querySelector(".title");
  const [cookies] = useCookies("user");

  const getBlogs = async () => {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/blog`);
    return res.data;
  };

  const { data, isLoading } = useQuery({
    queryFn: getBlogs,
    queryKey: ["blogs"],
    onSuccess: (data) => {
      setBlogs(data);
      setCategory([
        "All",
        ...new Set(
          data.map((item) => {
            return item.category;
          })
        ),
      ]);
    },
  });

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
      queryClient.invalidateQueries(["blogs"])
    },
  });
  const [category, setCategory] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [blogs, setBlogs] = useState(data);
  const [toggle, setToggle] = useState(false);

  /// set up pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogs?.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCategory = async (e) => {
    if (e.target.textContent == "All") {
      title.textContent = "Blogs";
      setFilteredBlogs(data);
      return;
    } else {
      const filteredData = blogs?.filter((blog) => {
        return blog.category === e.target.textContent;
      });
      title.textContent = e.target.textContent;
      setFilteredBlogs(filteredData);
      return;
    }
  };

  useEffect(() => {
    setFilteredBlogs(blogs);
  }, [data, blogs]);

  const handleExtraFilter = async (e) => {
    if (e.target.textContent === "most recent") {
      const api = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/api/blog/recent`
      );
      setFilteredBlogs(api.data);
    }
    if (e.target.textContent === "most viewed") {
      const api = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/api/blogs/viewed`
      );
      setFilteredBlogs(api.data);
    }
    if (e.target.textContent === "featured") {
      const api = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/api/blog/featured`
      );
      setFilteredBlogs(api.data);
    }
  };

  const increaseWatch = (watch, id) => {
    const url = `${process.env.REACT_APP_SERVER_API}/api/blog/${id}`;
    watch = Number(watch);
    const res = axios.put(url, {
      watched: (watch += 1).toString(),
    });
    navigate(`/blogs/${id}`);
  };

  if (isLoading) {
    return <Skeleton count={10} />;
  }

  return (
    <div className="blogs">
      <div className="blogs_cn">
        <div className="toolbar_section">
          <div className="toolbar_category">
            <div className="titleContainer">
              <span className="title">Blogs</span>
            </div>
            <div className="categoryBtnContainer">
              {category?.map((category, i) => {
                return (
                  <button
                    key={i}
                    onClick={(e) => handleCategory(e)}
                    className="categoryBtn"
                  >
                    {category}
                  </button>
                );
              })}
              <div className="toolbar_filter">
                <button
                  className="filterBtn"
                  onClick={() => setToggle(!toggle)}
                >
                  additional filter
                  {toggle ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </button>

                {toggle && (
                  <div className="filter_option_cr">
                    <div className="filterBtn_cr">
                      <div
                        className="optionBtn"
                        onClick={(e) => handleExtraFilter(e)}
                      >
                        most recent
                      </div>
                    </div>
                    <div className="filterBtn_cr">
                      <div
                        className="optionBtn"
                        onClick={(e) => handleExtraFilter(e)}
                      >
                        most viewed
                      </div>
                    </div>
                    <div className="filterBtn_cr">
                      <div
                        className="optionBtn"
                        onClick={(e) => handleExtraFilter(e)}
                      >
                        featured
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="cards_section">
          <div className="card_container">
            {Array.isArray(currentPosts) &&
              currentPosts?.map((blog) => {
                return (
                  <div className="card_div" key={blog?.id}>
                    <Card>
                      <LazyLoadImage
                        variant="top"
                        src={blog?.photo}
                        className="card_img"
                      />

                      <Card.Body>
                        <Card.Title className="category_title">
                          <span>{blog?.category}</span>
                          <span>
                            <MdDateRange />
                            {blog?.createdAt?.slice(
                              0,
                              blog?.createdAt?.indexOf("T")
                            )}
                          </span>
                        </Card.Title>
                        <Card.Text>
                          {blog?.title?.length > 100
                            ? blog?.title.substring(0, 100)
                            : blog?.title}
                          <Button
                            variant="primary"
                            className="cardBtn"
                            onClick={() => increaseWatch(blog.watched, blog.id)}
                          >
                            read more...
                          </Button>
                        </Card.Text>
                      </Card.Body>

                      <Card.Footer>
                        <button
                          className="likeBtn"
                          onClick={() =>
                            mutateBlogLikes.mutate([
                              blog?.id,
                              cookies?.user?.id,
                            ])
                          }
                        >
                          {(blog?.liked?.includes(
                            parseInt(cookies?.user?.id)
                          ) && <FcLike className="BlogLikedBtn" />) || (
                            <FcLikePlaceholder className="BlogNotLikedBtn" />
                          )}
                        </button>
                        <div className="footer_user_details">
                          <span>
                            posted by
                            <User blog={blog} />{" "}
                          </span>
                          {"  "}
                          <span>
                            <AiOutlineEye /> {blog?.watched}
                          </span>
                        </div>
                      </Card.Footer>
                    </Card>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="pages__section">
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={filteredBlogs?.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
}
