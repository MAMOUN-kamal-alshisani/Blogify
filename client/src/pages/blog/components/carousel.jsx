import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState } from "react";
export default function CarouselCT() {
  const [userId, setUserId] = useState("");
  const location = useLocation();
  const id = location?.pathname.slice(location?.pathname.lastIndexOf("/") + 1);
  const Arr = Array(6).fill(10);
  const getBlog = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/api/blog/${id}`
    );
    return res.data;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userBlogs", userId],
    queryFn: getBlog,

    onSuccess: (data) => {
      setUserId(data.UserId);
    },
  });

  return (
    <>
      <div className="carousel">
        <div className="sideBlog_cr">
          {Arr.map((sideBlog) => {
            return (
              <div className="sideBlogCards">
                <img
                  style={{ width: "200px", height: "200px" }}
                  src="http://wonderfulengineering.com/wp-content/uploads/2016/01/nature-wallpapers-33.jpg"
                  alt="img"
                  className="sideBlogImg"
                />

                <div className="allBlogs_title">
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
              </div>
            );
          })}
        </div>
      </div>
      {/* <Carousel responsive={responsive}>
    
    <div className="sideBlog_cr">

            {Arr.map((sideBlog) => {
              return (
                <div className="sideBlogCards">
                  <img
                    style={{ width: "200px", height: "200px" }}
                    src="http://wonderfulengineering.com/wp-content/uploads/2016/01/nature-wallpapers-33.jpg"
                    alt="img"
                  />

                  <div className="allBlogs_title">
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
                </div>
              );
            })}
          </div>
    </Carousel> */}
    </>
  );
}
