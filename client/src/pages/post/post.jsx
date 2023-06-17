import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./scss/post.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import {useMutation } from "@tanstack/react-query";
export default function Post() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [cookies] = useCookies("user");

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
console.log('hamdle');
      const res = await axios.post(url, {
        title: title,
        desc: desc,
        category: category,
        watched: "12",
        // photo: `file:///c://home/mamoun/fullstack_projects/OmegaBlogs/server/uploads/${File}`,
        photo: `${process.env.REACT_APP_SERVER_API}/uploads/${File}`,
      });

      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const {mutate,isLoading,isError} = useMutation({
    mutationKey:['blog_upload'],
    mutationFn: handleFile,
    onSuccess:()=>{
      const update_btn = document.querySelector('.update_btn')
      update_btn.disabled = true
      let successfull_upload_cn = document.createElement('div')
      successfull_upload_cn.className = 'successfull_upload_cn'
      const parent = document.querySelector('.Post')
      successfull_upload_cn.textContent = 'blog uploaded successfully!'
      parent.prepend(successfull_upload_cn)
      
      setTimeout(()=>{
        const update_btn = document.querySelector('.update_btn')
        update_btn.disabled = false
        successfull_upload_cn.remove()
      },8000)
    },
    onerror:(error)=>{
      let successfull_upload_cn = document.createElement('div')
      successfull_upload_cn.className = 'successfull_upload_cn'
      const parent = document.querySelector('.Post')
      successfull_upload_cn.textContent = error
      parent.prepend(successfull_upload_cn)
      setTimeout(()=>{
        // successfull_upload_cn.textContent = ''
      
        successfull_upload_cn.remove()
      },8000)
    }
  })

  if(isLoading){
const update_btn = document.querySelector('.update_btn')
update_btn.disabled = true
  }
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
              required
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
              required
            />

            <div className="publishBtn">
              <button>Save as a draft</button>
              <button className="update_btn"
                onClick={() => mutate()
                  }
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
