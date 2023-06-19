import "./scss/blogs.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from "axios";

import { BiTimeFive } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/pagination/pagination";
import Skeleton from "react-loading-skeleton";
import User from '../../components/user/user'
export default function Blogs() {
  const navigate = useNavigate();
  const title = document.querySelector(".title");
  const [cookies] = useCookies("user");

  const getBlogs = async () => {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/blog`);
    return res.data;
  };

  const { data, isLoading, isError, isFetched, refetch } = useQuery({
    queryFn: getBlogs,
    queryKey: ["blogs"],
    // keepPreviousData: true,
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
    console.log(id, userid);
    if (userid) {
      const url = `${process.env.REACT_APP_SERVER_API}/api/blog/${id}/liked/${userid}`;
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
      refetch();
    },
  });
  // console.log(mutate());
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
      // DataList[0].data
      title.textContent = e.target.textContent;
      setFilteredBlogs(filteredData);
      return;
    }
  };

  useEffect(() => {
    // setBlogs(blogs);
    setFilteredBlogs(blogs);
  }, [data, blogs]);

  const handleExtraFilter = async (e) => {
    // console.log(e.target.textContent);
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
    console.log(res);
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
            </div>
          </div>
          <div className="toolbar_filter">
            <button className="filterBtn" onClick={() => setToggle(!toggle)}>
              additional filter
              {toggle ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
            </button>
            {/* <select value={'options'} name="opt" className="filter_options" > */}

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

        <div className="cards_section">
          <div className="card_container">
            {Array.isArray(currentPosts) &&
              currentPosts?.map((blog) => {
                return (
                  <div className="card_div" key={blog?.id}>
                    <Card>
                      <Card.Img
                        variant="top"
                        src={blog?.photo} // || '/home/mamoun/fullstack_projects/OmegaBlogs/server/uploads/'
                        style={{ width: "inherit" }}
                        className="card_img"
                      />

                      <Card.Body>
                        <Card.Title className="category_title">
                          <span>{blog?.category}</span>
                          <span>
                            <BiTimeFive />
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
                            // onClick={() => navigate(`/blogs/${blog?.id}`)}
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
                          ) && <AiFillLike className="BlogLikedBtn" />) || (
                            <AiOutlineLike className="BlogNotLikedBtn" />
                          )}
                        </button>
                        <div className="footer_user_details">
                       <span>posted by<User blog={blog}/> </span> 
                            {'  ' } 
                          <span><AiOutlineEye /> {blog?.watched}</span>
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
