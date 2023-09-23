import React, { useState } from "react";
import "./scss/profile.css";
import { useQueries, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import axios from "axios";
import DeleteModal from "./components/deleteModal/deleteModal";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { CgGenderMale } from "react-icons/cg";
import { CgGenderFemale } from "react-icons/cg";
import { CgSpinnerAlt } from "react-icons/cg";
import { TbMapPins } from "react-icons/tb";
import { TbMapPinFilled } from "react-icons/tb";
import { BsFillPersonFill } from "react-icons/bs";
import { RiPhoneFill } from "react-icons/ri";
import { BsCalendarDate } from "react-icons/bs";
import { AiFillTwitterSquare } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { AiOutlineUpload } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";

export default function Profile() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // const [profilePictureData,setProfilePictureData] = useState(null)
  const [navBtn, setNavBtn] = useState("content");
  const [showModal, setShowModal] = useState(false);
  const [showPopUpDelete, setShowPopUpDelete] = useState(false);
  const [showEditSec, setShowEditSec] = useState(false);
  const [blogId, setBlogId] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  const [userBlogs, setUserBlogs] = useState([]);
  const [cookies] = useCookies("user");
  const [imgFile, setImgFile] = useState("");
  const [blogFile, setBlogFile] = useState("");
  const [editBlogData, setEditBlogData] = useState({
    title: "",
    desc: "",
    category: "",
    photo: "",
  });

  const [profileInput, setProfileInput] = useState({
    fullName: "",
    birthDate: "",
    gender: "male",
    phone: "",
    country: "",
    city: "",
    linkedIn: "",
    twitter: "",
    socialEmail: "",
  });

  /// form input change function
  const formInputHandler = async (e) => {
    setProfileInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const editInputHandler = async (e) => {
    setEditBlogData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // for uploading an image to the server side
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", imgFile);
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/api/upload/profile`,
        formData
      );
      // setProfilePictureData(res.data)
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  /// for recording image path that has been uploaded on the api
  const handleFile = async () => {
    try {
      const File = await upload();
      // console.log(File.downloadURL);
      if (File) {
        const url = `${process.env.REACT_APP_SERVER_API}/api/user/profile/${cookies.user.id}`;
        const res = await axios.put(url, {
          picture: File.downloadURL,
        });
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadBlogPhoto = async () => {
    try {
      const formData = new FormData();
      if (blogFile) {
        formData.append("file", blogFile);
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_API}/api/upload/blog`,
          formData
        );
        return res.data;
      }
      return null;
    } catch (err) {
      console.log(err);
    }
  };

  const handleBlogFile = async (blog) => {
    try {
      const File = await uploadBlogPhoto();

      if (File) {
        const url = `${process.env.REACT_APP_SERVER_API}/api/blog/${blog.id}`;
        const res = await axios.put(url, {
          title: editBlogData.title,
          category: editBlogData.category,
          desc: editBlogData.desc,
          photo: File.downloadURL,
        });
        return res.data;
      } else {
        const url = `${process.env.REACT_APP_SERVER_API}/api/blog/${blog.id}`;
        const res = await axios.put(url, {
          title: editBlogData.title,
          category: editBlogData.category,
          desc: editBlogData.desc,
        });
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  /// get the user information that was sent from the form input data
  const fetchUserData = async (UserId) => {
    try {
      const url = `${process.env.REACT_APP_SERVER_API}/api/user/profile/${UserId}`;
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  /// function to request blogs that was created by the user

  const fetchUserBlogs = async (UserId) => {
    try {
      const url = `${process.env.REACT_APP_SERVER_API}/api/blog/user/${UserId}`;
      const res = await axios.get(url);
      setUserBlogs(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const removeBlogHandler = async (id) => {
    try {
      const url = `${process.env.REACT_APP_SERVER_API}/api/blog/${id}`;
      const res = await axios.delete(url);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  /// react-query function to fetch data ///
  const api = useQueries({
    queries: [
      {
        queryKey: ["formInput"],
        queryFn: () => fetchUserData(cookies.user.id),
        onSuccess: (data) => {
          setUserInfo(data);
          setProfileInput(data);
        },
      },

      {
        queryKey: ["blogs"],
        queryFn: () => fetchUserBlogs(cookies.user.id),
        onSuccess: (data) => {
          setUserBlogs(data);
        },
      },
    ],
  });
  /// query data
  const userData = api[0]?.data;

  const mutateUserData = async (UserId, id) => {
    try {
      if (userData) {
        const url = `${process.env.REACT_APP_SERVER_API}/api/profile/${id}`;
        const res = await axios.put(url, profileInput);
        return res.data;
      } else {
        const url = `${process.env.REACT_APP_SERVER_API}/api/profile/${UserId}`;
        const res = await axios.post(url, profileInput);
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const { mutate, isSuccess } = useMutation({
    // mutationKey: ["formInput"],
    mutationFn: () => mutateUserData(cookies?.user?.id, userData?.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["formInput"]);
      const success_div = document.querySelector(".success_div");
      success_div.textContent = "user information updated successfully!";

      setTimeout(() => {
        success_div.textContent = "";
      }, 4000);
    },
  });
  const deleteBlog = useMutation({
    mutationFn: (id) => removeBlogHandler(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      setShowPopUpDelete(false);
    },
  });

  const updateUserFile = useMutation({
    // mutationKey: ["formInput"],
    mutationFn: () => handleFile(),
    onSuccess: () => {
      queryClient.invalidateQueries(["formInput"]);
      let successfull_upload_cn = document.createElement("div");
      successfull_upload_cn.className = "pic_upload_status_cn";
      const parent = document.querySelector(".pic_div");
      successfull_upload_cn.textContent = "picture uploaded successfully!";
      parent.appendChild(successfull_upload_cn);

      setTimeout(() => {
        successfull_upload_cn.remove();
      }, 5000);
    },
  });

  const updateBlog = useMutation({
    // mutationKey: ["blogs"],
    mutationFn: (blog) => handleBlogFile(blog),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      setShowEditSec(false);
    },
  });

  /// get todays date ///
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const DateNow = year + "-" + month + "-" + day;

  /// function to calculate how long ago the blog was posted
  function getNumberOfDays(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();
    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    if (diffInDays === 0) return "today";
    else if (diffInDays === 1) return diffInDays + " Day Ago";
    return diffInDays + " Days Ago";
  }
  const EditBlogHandler = (blog) => {
    setEditBlogData(blog);
    setShowEditSec(true);
  };

  if (api[0]?.isLoading && api[1].isLoading) {
    return <Skeleton count={10} />;
  }

  return (
    <div className="profile">
      <div className={`profile_cn ${showEditSec && "bgcl"}`}>
        <section className={`profile_pic_section ${showPopUpDelete && "bgcl"}`}>
          <div className="pic_div">
            <div className="picture_cn">
              <LazyLoadImage
                src={
                  userInfo?.picture ||
                  "http://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png"
                }
                alt="img"
                className="userImg"
              />
              <div className="upload_cn">
                <label htmlFor="file">
                  <AiOutlineUpload />
                </label>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  name="file"
                  className="uploadPicCn"
                  onChange={(e) => setImgFile(e.target.files[0])}
                />
              </div>
            </div>

            <div className="user_info">
              <h4>{cookies.user.UserName}</h4>
              <p>{cookies.user.Email}</p>
            </div>

            <button
              className="userImgBtn"
              onClick={() => updateUserFile.mutate()}
            >
              update profile image
            </button>
          </div>

          <div className="profile_nav">
            <button className="navBtn" onClick={() => setNavBtn("content")}>
              profile
            </button>
            <button className="navBtn" onClick={() => setNavBtn("blogs")}>
              blogs
            </button>

            {navBtn === "content" && (
              <div className="updateBtnDiv">
                <button
                  className="updateBtn"
                  onClick={() => {
                    setShowModal(!showModal);
                  }}
                >
                  <FaUserEdit />
                </button>
              </div>
            )}
          </div>

          {navBtn === "content" && (
            <div className="user_info_div">
              <ul className="InfoDiv">
                <li>
                  FullName:{" "}
                  {/* <p>
                  
                  </p> */}
                </li>
                <li>
                  birthDate:{" "}
                  {/* <p>
                    {" "}
  
                  </p> */}
                </li>
                <li>
                  phone:{" "}
                  {/* <p>
                   
                  </p> */}
                </li>
                <li>
                  gender:{" "}
                  {/* <p>
                    {" "}
  
                  </p> */}
                </li>
                <li>
                  country:{" "}
                  {/* <p>
                    {" "}
                   
                  </p> */}
                </li>
                <li>
                  city:{" "}
                  {/* <p>
                 
                  </p> */}
                </li>
              </ul>

              <ul className="InfoDiv_list">
                <li>
                <BsFillPersonFill className="profile_info_icon"/>
                    {userInfo?.fullName}
                </li>
                <li>

                <BsCalendarDate className="profile_info_icon"/>{" "}
                    {userInfo?.birthDate?.slice(
                      0,
                      userInfo?.birthDate?.indexOf("T")
                    )}
                </li>
    
                <li>
                <RiPhoneFill className="profile_info_icon"/> {userInfo?.phone}
                </li>
                <li>
                {userInfo?.gender === "male" ? (
                      <CgGenderMale className="profile_info_icon"/>
                    ) : (
                      <CgGenderFemale className="profile_info_icon"/>
                    )}{" "}
                    {userInfo?.gender || ""}
                  </li>
                  <li>
                  <TbMapPinFilled className="profile_info_icon"/> {userInfo?.country}
                  </li>
                  <li>
                  <TbMapPins className="profile_info_icon"/> {userInfo?.city}
                  </li>
                  {/* <li>
                  
                  </li> */}
              </ul>
{/* 
              <ul className="userDiv">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul> */}

              {/* <ul className="userDiv">
                <li>
                  <BsFillPersonFill />
                  {userInfo?.fullName}
                </li>
                <li>
                  <BsCalendarDate />{" "}
                  {userInfo?.birthDate?.slice(
                    0,
                    userInfo?.birthDate?.indexOf("T")
                  )}
                </li>
                <li>
                  <RiPhoneFill /> {userInfo?.phone}
                </li>
                <li>
                  {userInfo?.gender === "male" ? (
                    <CgGenderMale />
                  ) : (
                    <CgGenderFemale />
                  )}{" "}
                  {userInfo?.gender || ""}
                </li>
                <li>
                  <TbMapPinFilled /> {userInfo?.country}
                </li>
                <li>
                  <TbMapPins /> {userInfo?.city}
                </li>
              </ul> */}
            </div>
          )}

          {navBtn === "blogs" && (
            <div className="blogsDiv">
              <div className="blogsCn">
                {userBlogs.length === 0 ? (
                  <div className="blogItemEmpty">
                    <h2>no blogs are posted yet!</h2>

                    <button onClick={() => navigate("/post")}>
                      post a blog
                    </button>
                  </div>
                ) : (
                  userBlogs?.map((blog) => {
                    return (
                      <div className="blogItem" key={blog.id}>
                        <LazyLoadImage
                          src={
                            blog.photo ||
                            "http://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png"
                          }
                          alt={blog.id}
                          style={{ width: "200px" }}
                          className="blogImg"
                        />
                        <div className="info_cn">
                          <span>{blog?.category}</span>
                          <span>
                            {" "}
                            posted
                            {" " +
                              getNumberOfDays(
                                blog?.createdAt.slice(
                                  0,
                                  blog?.createdAt.indexOf("T")
                                ),
                                DateNow
                              ) +
                              " "}
                          </span>
                        </div>

                        <div className="info_edit">
                          <button onClick={() => EditBlogHandler(blog)}>
                            <FiEdit />
                          </button>

                          {/* <button onClick={() => deleteBlog.mutate(blog.id)}> */}
                          <button
                            onClick={() => {
                              setBlogId(blog.id);
                              setShowPopUpDelete(!showPopUpDelete);
                            }}
                          >
                            <FiDelete />
                          </button>
                        </div>
                        <div className="info_cn2">
                          <p>{blog?.title}</p>
                        </div>
                        <div className="dlModal">
                          <DeleteModal
                            blogId={blogId}
                            showPopUpDelete={showPopUpDelete}
                            setShowPopUpDelete={setShowPopUpDelete}
                            blog={blog}
                            deleteBlog={deleteBlog}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          <div className="socials_div">
            <div className="icon_cn">
              <a href={userInfo?.twitter || ""} className="twitter_icon" target="_blank">
                <AiFillTwitterSquare />
              </a>
            </div>

            <div className="icon_cn">
              <a href={`mailto:${userInfo?.socialMail}`} className="mail_icon" target="_blank">
                <AiOutlineMail />
              </a>
            </div>
            <div className="icon_cn">
              <a href={userInfo?.linkedIn || ""} className="linkedin_icon" target="_blank">
                <AiFillLinkedin />
              </a>
            </div>
          </div>
        </section>

        <section
          className={`profile_info_section ${showModal && "show_Profile_info"}`}
        >
          <div className="profile_edit_cn">
            <form onSubmit={(e) => e.preventDefault()}>
              <button
                onClick={() => setShowModal(!showModal)}
                className="closeBtn"
              >
                <AiOutlineCloseCircle />
              </button>
              <h1 className="modalHeader">profile information</h1>
              <div className="formInput">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  onChange={(e) => {
                    formInputHandler(e);
                  }}
                  value={profileInput.fullName}
                  placeholder="Enter FullName"
                />
              </div>
              <div className="input_cn">
                <div className="formInput">
                  <label htmlFor="birthDate">birthDate</label>
                  <input
                    type="date"
                    name="birthDate"
                    onChange={(e) => {
                      formInputHandler(e);
                    }}
                    value={profileInput.birthDate}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="gender">Gender</label>
                  <select
                    onChange={(e) => {
                      formInputHandler(e);
                    }}
                    name="gender"
                    value={profileInput.gender}
                  >
                    <option name="male" id="">
                      male
                    </option>
                    <option name="female" id="">
                      female
                    </option>
                  </select>
                </div>
              </div>
              <div className="formInput">
                <label htmlFor="phone">Phone</label>
                <input
                  type="number"
                  name="phone"
                  onChange={(e) => {
                    formInputHandler(e);
                  }}
                  placeholder="ex: 077xxxxxxx"
                  value={profileInput.phone}
                />
              </div>
              <div className="formInput">
                <label htmlFor="country">country</label>
                <input
                  type="text"
                  name="country"
                  onChange={(e) => {
                    formInputHandler(e);
                  }}
                  placeholder="Enter country"
                  value={profileInput.country}
                />
              </div>
              <div className="formInput">
                <label htmlFor="city">city</label>
                <input
                  type="text"
                  name="city"
                  onChange={(e) => {
                    formInputHandler(e);
                  }}
                  placeholder="Enter city"
                  value={profileInput.city}
                />
              </div>
              <div className="formSocialsInput">
                {/* <label htmlFor="twitter">twitter</label> */}
                <input
                  type="text"
                  name="twitter"
                  onChange={(e) => {
                    formInputHandler(e);
                  }}
                  placeholder="Enter twitter link"
                  value={profileInput.twitter || ""}
                />
                {/* <label htmlFor="socialEmail">socialEmail</label> */}
                <input
                  type="text"
                  name="socialEmail"
                  onChange={(e) => {
                    formInputHandler(e);
                  }}
                  placeholder="Enter socialEmail link"
                  value={profileInput.socialEmail || ""}
                />
                {/* <label htmlFor="linkedIn">linkedIn</label> */}
                <input
                  type="text"
                  name="linkedIn"
                  onChange={(e) => {
                    formInputHandler(e);
                  }}
                  placeholder="Enter linkedIn link"
                  value={profileInput.linkedIn || ""}
                />
              </div>
              <button onClick={() => mutate()} className="formBtn">
                {" "}
                save changes
              </button>

              <div className="success_div"></div>
            </form>
          </div>
        </section>

        {showEditSec && (
          <section className="edit_blogs_cn">
            {/* <div className="closeDiv" onClick={() => setShowEditSec(false)}>
              <MdKeyboardDoubleArrowLeft className="close_icon" />
            </div> */}
            <div className="edit_cn">
              <div className="imgCn">
                <LazyLoadImage
                  // style={{ width: "202px" }}
                  src={
                    editBlogData.photo ||
                    "http://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png"
                  }
                  alt={editBlogData.category}
                  className="editImg"
                />
                <div className="uploadInputDiv">
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => setBlogFile(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="titleContainer inCn">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="title"
                  value={editBlogData.title}
                  onChange={(e) => editInputHandler(e)}
                />
              </div>

              <div className="allOptionInputCn">
                <label>category</label>

                <div className="optionInputCn">
                  <div className="inputContainer">
                    <input
                      type="radio"
                      name="category"
                      value="travel"
                      onChange={(e) => editInputHandler(e)}
                    />
                    <label htmlFor="travel">Travel</label>
                  </div>

                  <div className="inputContainer">
                    <input
                      type="radio"
                      name="category"
                      value="art"
                      onChange={(e) => editInputHandler(e)}
                    />
                    <label htmlFor="art">Art</label>
                  </div>

                  <div className="inputContainer">
                    <input
                      type="radio"
                      name="category"
                      value="science"
                      onChange={(e) => editInputHandler(e)}
                    />
                    <label htmlFor="science">Science</label>
                  </div>

                  <div className="inputContainer">
                    <input
                      type="radio"
                      name="category"
                      value="technology"
                      onChange={(e) => editInputHandler(e)}
                    />
                    <label htmlFor="technology">Technology</label>
                  </div>
                  <div className="inputContainer">
                    <input
                      type="radio"
                      name="category"
                      value="food"
                      onChange={(e) => editInputHandler(e)}
                    />
                    <label htmlFor="food">Food</label>
                  </div>
                </div>
              </div>

              <div className="descContainer inCn">
                <label htmlFor="desc">Description</label>

                <textarea
                  name="desc"
                  id="descTextArea"
                  cols="30"
                  rows="10"
                  value={editBlogData.desc}
                  onChange={(e) => editInputHandler(e)}
                ></textarea>
              </div>

              <div className="blogEditBtnDiv">
                <button
                  className="blogCBtn btn_c1"
                  onClick={() => setShowEditSec(false)}
                >
                  Cancel
                </button>
                <button
                  className="blogCBtn btn_c2"
                  onClick={() => updateBlog?.mutate(editBlogData)}
                >
                  Save Changes{" "}
                  {updateBlog?.isLoading && (
                    <CgSpinnerAlt className="BtnSpinner" />
                  )}
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
