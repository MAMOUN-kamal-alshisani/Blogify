import "./scss/blog.css";
import { GiNextButton } from "react-icons/gi";
import { GiPreviousButton } from "react-icons/gi";

import { useQueries } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Blog() {
  const navigate = useNavigate();
  const location = useLocation();

  const [filBlogs, setfilBlogs] = useState([]);
  const [StartIndex, setStartIndex] = useState(0);
  const [EndIndex, setEndIndex] = useState(3);

  // const id = location?.pathname.slice(location?.pathname.lastIndexOf("/") + 1);
  // const [userId,setUserId] = useState('')
  // const Arr = Array(6).fill(10);
  const [blogId, setBlogId] = useState(
    location?.pathname.slice(location?.pathname.lastIndexOf("/") + 1)
  );

  const getBlog = async () => {
    const res = await axios.get(`http://localhost:4000/api/blog/${blogId}`);
    return res.data;
  };

  const getBlogs = async () => {
    const res = await axios.get(
      `http://localhost:4000/api/blogs/user/${blogId}`
    );
    return res.data;
  };

  const getAllBlogs = async () => {
    const res = await axios.get(`http://localhost:4000/api/blog`);
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
  const blog = results[0];
  const blogs = results[1];
  // const AllBlogs = results[2]
  // console.log(results[2]);
  useEffect(() => {
    if (blogs.isSuccess) {
      const filteredData = blogs?.data?.filter((bl) => {
        return bl.id !== blog.data.id;
      });
      setfilBlogs(filteredData);
    } else {
      setfilBlogs(results[1].data);
    }

    setAllBlogs(results[2]?.data?.slice(6, 9));
  }, [blogs.isSuccess, location.pathname]);

  const blogChange = (id) => {
    navigate(`/blogs/${id}`);
    setBlogId(id);
  };

  return (
    <div className="SBlog">
      <div className="blog_cn">
        <div className="personalBlog">
          <div className="mainBlog">
            <article className="card_article">
              <img src={blog?.data?.photo} alt="img" className="mainBlogImg" />
              <div className="title_div">
                <p>{blog?.data?.category}</p>
                <p>
                  {blog?.data?.createdAt.slice(
                    0,
                    blog?.data?.createdAt.indexOf("T")
                  )}
                </p>
              </div>
              <div className="desc_div">
                <p>{blog?.data?.desc}</p>
              </div>
              <div className="write_div">
                <p>{blog?.data?.watched}</p>
                <p>by admin</p>
              </div>
            </article>

            {/* <article className="card_article">
              <img
                src="https://tse2.mm.bing.net/th?id=OIP.MAZUZHHJlOQ2EjGcIZcbkQHaEo&pid=Api&P=0"
                alt="img"
                className="mainBlogImg"
              />
              <div className="title_div">
                <p>title</p>
                <p>2023/5/4</p>
              </div>
              <div className="desc_div">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Similique natus impedit velit atque, necessitatibus quam.
                  Deleniti hic vitae necessitatibus. Beatae laudantium
                  doloremque quis fuga a quisquam consequatur eaque minima
                  officiis.r
                </p>
              </div>
              <div className="write_div">
                <p>1000 views</p>
                <p>by admin</p>
              </div>
            </article> */}
          </div>

          <div className="sideBlog_cr">
            {filBlogs?.map((sideBlog) => {
              return (
                <div className="sideBlogCards" key={sideBlog.id}>
                  <img
                    style={{ width: "200px", height: "200px" }}
                    src={sideBlog.photo}
                    alt="img"
                    className="sideBlogImg"
                  />

                  <div className="title_div">
                    <p>{sideBlog?.category}</p>
                    {/* <p>2023/5/4</p> */}
                  </div>

                  <div className="desc_div">
                    <p>
                      {sideBlog?.desc}
                      <button onClick={() => blogChange(sideBlog.id)}>
                        read more...
                      </button>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        
        <div className="allBlogs">
          <div className="allBlogs_cn">
          <button onClick={HandlePrev} className="blogs_cards_btn"><GiPreviousButton/></button>

            
            {/* <Slider {...settings}>

              {Arr.map(item=>{
                return(
                  <div>
                    <h1>this is the one</h1>
                    <h1>this is the one</h1>

                  </div>
                )
              })} */}
            {allBlogs?.map((blog, index) => {
              return (
                <div className="card_div" key={index}>
                  <img
                    // style={{ width: "200px", height: "200px" }}
                    src={blog.photo}
                    alt={blog.id}
                    className="footer_side_photo"
                  />

                  <div className="allBlogs_title">
                    <p>{blog?.title}</p>
                    <p>
                  
                      {blog?.createdAt.slice(0, blog?.createdAt.indexOf("T"))}
                    </p>
                  </div>

                  <div className="desc_div">
                    <p>{blog?.desc}</p>
                  </div>
                </div>
              );
            })}
            {/* </Slider> */}
            <button onClick={HandleNext} className="blogs_cards_btn"><GiNextButton/></button>
          </div>
        </div>
      </div>
    </div>
  );
}
