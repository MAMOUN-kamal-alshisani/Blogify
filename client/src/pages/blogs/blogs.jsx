import "./scss/blogs.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useQuery, useQueries } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";


import { useNavigate } from "react-router-dom";
// import User from "../../components/user/user";
import Pagination from "../../components/pagination/pagination";

export default function Blogs() {
  const navigate = useNavigate();
  // const categoryBtn = document.querySelector('.categoryBtn')
  const title = document.querySelector(".title");

  const getBlogs = async () => {
    const res = await axios.get(`http://localhost:4000/api/blog`);
    return res.data;
  };
  // const { data, error } = useQuery({
  //   queryKey: ["blogs"],
  //   queryFn: () => getUser(blog),
  // });

  const { data, isLoading, isError, isFetched } = useQuery({
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
  const [category, setCategory] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [blogs, setBlogs] = useState(data);
  const [toggle, setToggle] = useState(false);

  // const [page, setPage] = useState(1);
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
    // setBlogs(blogs);
    setFilteredBlogs(blogs);
  }, [data, blogs]);

  const handleExtraFilter = async (e) => {
    console.log(e.target.textContent);
    if (e.target.textContent === "most recent") {
      const api = await axios.get("http://localhost:4000/api/blog/recent");
      setFilteredBlogs(api.data);
    }
    if (e.target.textContent === "most viewed") {
      const api = await axios.get("http://localhost:4000/api/blog/recent");
      const sortFromMostToLeast = api.data.map((blg) => {
        return blg.watched;
      });
      setFilteredBlogs(api.data);
    }
  };

  const increaseWatch = (watch, id) => {
    const url = `http://localhost:4000/api/blog/${id}`;
    watch = Number(watch);
    const res = axios.put(url, {
      watched: (watch += 1).toString(),
    });
    console.log(res);
    navigate(`/blogs/${id}`);
  };

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
                  <div className="optionBtn">most viewed</div>
                </div>
                <div className="filterBtn_cr">
                  <div className="optionBtn">recent</div>
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
                          <p>{blog?.category}</p>
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
                        <Card.Title>
                          <p>
                            <BiTimeFive />
                            {blog?.createdAt?.slice(
                              0,
                              blog?.createdAt?.indexOf("T")
                            )}
                          </p>
                          <p>
                            <AiOutlineEye /> {blog?.watched}
                          </p>
                        </Card.Title>
                        {/* <User blog={blog}/> */}
                        {/* <Card.Text>
                        
                        </Card.Text> */}
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

// function diamond(n) {
//   let item = "";
//   for (let i = 0; i <= n; i += 2) {
//     item += "*";

//     for (let j = 0; j < i; j += 1) {
//       item += "*";
//     }

//     item += "\n";

//   }
// // console.log(item.split('\n'));
//   return item += item.split('\n').reverse().join('\n');
// }

// console.log(diamond(3));
