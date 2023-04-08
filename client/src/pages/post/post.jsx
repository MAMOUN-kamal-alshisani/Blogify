import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./scss/post.css";

import { useEffect } from "react";
import axios from "axios";
export default function Post() {
  const [value, setValue] = useState("");

  //   useEffect(()=>{

  // const getUser = async()=>{

  //   const url = 'http://localhost:4000/api/user'
  //   // console.log(req.cookies);
  //   const res = await axios.get(url,{withCredentials:true})
  // console.log(res);
  //   return res.data
  // }
  // getUser()
  //   },[])
  return (
    <div className="Post">
      <div className="Post_cn">
        <div className="TextCn1">
          <div className="titleContainer">
            <input type="text" id="title" name="title" placeholder="Title" />
          </div>
          <div className="edithContainer">
            <ReactQuill theme="snow" value={value} onChange={setValue} />
          </div>
        </div>

        <div className="TextCn2">
          <div className="categoryContainer">
            <h1>Category</h1>
            <div className="inputContainer">
              <input type="radio" name="travel" value="travel" />
              <label htmlFor="travel">Travel</label>
            </div>

            <div className="inputContainer">
              <input type="radio" name="art" value="art" />
              <label htmlFor="art">Art</label>
            </div>

            <div className="inputContainer">
              <input type="radio" name="science" value="science" />
              <label htmlFor="science">Science</label>
            </div>

            <div className="inputContainer">
              <input type="radio" name="technology" value="technology" />
              <label htmlFor="technology">Technology</label>
            </div>
            <div className="inputContainer">
              <input type="radio" name="food" value="food" />
              <label htmlFor="food">Food</label>
            </div>
          </div>

          <div className="publishContainer">
            <h1>Publish</h1>
            <span>
              <b>Status: </b> Draft
            </span>
            <span>
              <b>Visibility: </b> Public
            </span>
            <label htmlFor="file">upload image</label>
            <input
              type="file"
              id="file"
              name="file"
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
            />

            <div className="publishBtn">
              <button>Save as a draft</button>
              <button>Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
