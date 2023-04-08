import "./scss/blogs.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
export default function Blogs() {
  const navigate = useNavigate()
  // const categoryBtn = document.querySelector('.categoryBtn')
  const title = document.querySelector(".title");
  const getBlogs = async () => {
    const res = await axios.get(`http://localhost:4000/api/blog`);

    return res.data;
  };

  const { data, isLoading, isError } = useQuery({
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
  const [category, setCategory] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [blogs, setBlogs] = useState(data);

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
            <span>additional filter</span>
          </div>
        </div>

        <div className="cards_section">
          <div className="card_container">
            {filteredBlogs?.map((blog) => {
              return (
                <div className="card_div" key={blog.id}>
                  <Card >
                    <Card.Img
                      variant="top"
                      src={blog.photo}
                      style={{ width: "inherit" }}
                      className="card_img"
                    />
                    <Card.Body>
                      <Card.Title>
                        {blog.category}
                        <p>
                        <BiTimeFive/> { blog.createdAt.slice(0, blog.createdAt.indexOf("T"))}
                        </p>
                      </Card.Title>
                      <Card.Title>{blog.title}</Card.Title>

                      <Card.Text>{blog.desc.substring(100)}<Button variant="primary" className="cardBtn" onClick={()=>navigate(`/blogs/${blog.id}`)}>read more...</Button></Card.Text>
                      

                      <Card.Text><AiOutlineEye/> {blog.watched}</Card.Text>
                        
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
          {/* {arr.map(blog=>{

            return(
              <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://msl-ltd.co.uk/wp-content/uploads/2016/10/shutterstock_451991974-1.jpg"  style={{width:"inherit",}}/>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
            )
          })} */}
        </div>
      </div>
    </div>
  );
}
