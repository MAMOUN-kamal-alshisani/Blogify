import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./scss/post.css";
import { useCookies } from "react-cookie";
// import { useEffect } from "react";
import axios from "axios";
// import dotenv from 'dotenv'
// dotenv.config()
export default function Post() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [cookies] = useCookies("user");

  // console.log(cookies);
  // const [img,setImg] = useState('')
  // console.log(cookies.user.id);
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
  // console.log(img);
  // console.log(imgFile?.name);

  // console.log(process.env.REACT_APP_SERVER_API);
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", imgFile);
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/api/upload`,
        formData
      );
      console.log(res.data);
      // setImg(res.data)
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleFile = async () => {
    try {
      const File = await upload();
      const url = `${process.env.REACT_APP_SERVER_API}/api/blog/${cookies.user.id}`;

      const res = await axios.post(url, {
        title: title,
        desc: desc,
        category: category,
        watched: "12",
        // photo: `file:///c://home/mamoun/fullstack_projects/OmegaBlogs/server/uploads/${File}`,
        photo:`${process.env.REACT_APP_SERVER_API}/uploads/${File}`
      });
      
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="Post">
      <div className="Post_cn">
        <div className="TextCn1">
          <div className="titleContainer">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="editeContainer">
            <ReactQuill theme="snow" value={desc} onChange={setDesc} />
          </div>
        </div>

        <div className="TextCn2">
          <div className="categoryContainer">
            <h1>Category</h1>
            <div className="inputContainer">
              <input
                type="radio"
                name="category"
                value="travel"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="travel">Travel</label>
            </div>

            <div className="inputContainer">
              <input
                type="radio"
                name="category"
                value="art"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="art">Art</label>
            </div>

            <div className="inputContainer">
              <input
                type="radio"
                name="category"
                value="science"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="science">Science</label>
            </div>

            <div className="inputContainer">
              <input
                type="radio"
                name="category"
                value="technology"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="technology">Technology</label>
            </div>
            <div className="inputContainer">
              <input
                type="radio"
                name="category"
                value="food"
                onChange={(e) => setCategory(e.target.value)}
              />
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
              // accept="image/png, image/jpeg"
              style={{ display: "none" }}
              onChange={(e) => setImgFile(e.target.files[0])}
            />

            <div className="publishBtn">
              <button>Save as a draft</button>
              <button
                onClick={() => {
                  handleFile();
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
