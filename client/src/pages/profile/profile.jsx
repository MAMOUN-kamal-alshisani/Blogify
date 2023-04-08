import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function Profile() {

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div>

<Slider {...settings}>

{Array(4).fill(20).map(item=>{
  return(
    <div>
      <span>this is the one</span>
    </div>
  )
})}
{/* {Arr?.map((ele) => {
return (
  <div className="card_div">
    <img
      style={{ width: "200px", height: "200px" }}
      src="https://donpk.com/wp-content/uploads/2017/01/nature-wallpaper-hd-pictures-free-download-2.jpg"
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
})} */}
</Slider>

    </div>
  )
}
