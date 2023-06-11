import React, { useEffect, useState } from "react";
import "./scss/profile.css";
import { useQueries, useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import axios from "axios";
import DeleteModal from "./components/deleteModal/deleteModal";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

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

// import { CgSpinnerAlt } from "react-icons/cg";

export default function Profile() {
  const navigate = useNavigate();
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
  // const [displayText, setDisplayText] = useState('No Image Is Selected');
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
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  /// for recording image path that has been uploaded on the api
  const handleFile = async () => {
    try {
      const File = await upload();
      if (File) {
        const url = `${process.env.REACT_APP_SERVER_API}/api/user/profile/${cookies.user.id}`;
        const res = await axios.put(url, {
          picture: `${process.env.REACT_APP_SERVER_API}/pictures/${File}`,
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
          `${process.env.REACT_APP_SERVER_API}/api/upload`,
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
        // console.log(File);
        const url = `${process.env.REACT_APP_SERVER_API}/api/blog/${blog.id}`;
        const res = await axios.put(url, {
          title: editBlogData.title,
          category: editBlogData.category,
          desc: editBlogData.desc,
          photo: `${process.env.REACT_APP_SERVER_API}/uploads/${File}`,
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

  // const handleUpdateSocials = async (blog) => {
  //   try {
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  /// get the user information that was sent from the form input data
  const fetchUserData = async (UserId) => {
    try {
      const url = `${process.env.REACT_APP_SERVER_API}/api/user/profile/${UserId}`;
      const res = await axios.get(url);
      // console.log(res);
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
      // setUserBlogs(res.data);
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
      // {
      //   queryKey: ["socials"],
      //   queryFn: () => fetchUserBlogs(cookies.user.id),
      //   onSuccess: (data) => {
      //     setUserBlogs(data);
      //   },
      // },
    ],
  });
  /// query data
  const userData = api[0]?.data;

  const mutateUserData = async (UserId, id) => {
    try {
      if (userData) {
        const url = `${process.env.REACT_APP_SERVER_API}/api/profile/${id}`;
        const res = await axios.put(url, profileInput);
        // console.log(res);
        return res.data;
      } else {
        const url = `${process.env.REACT_APP_SERVER_API}/api/profile/${UserId}`;
        const res = await axios.post(url, profileInput);
        console.log(res);
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const { isLoading, mutate, isSuccess } = useMutation({
    mutationKey: ["formInput"],
    mutationFn: () => mutateUserData(cookies?.user?.id, userData?.id),
    onSuccess: () => {
      // alert("updated successfully!");
      const success_div = document.querySelector(".success_div");
      success_div.textContent = "user information updated successfully!";

      setTimeout(() => {
        success_div.textContent = "";
        // setShowModal(false)
      }, 4000);
    },
  });
  // console.log(updateState);
  const deleteBlog = useMutation({
    mutationKey: ["blogs"],
    mutationFn: (id) => removeBlogHandler(id),
    onSuccess: () => {
      setShowPopUpDelete(false);
    },
  });

  const updateUserFile = useMutation({
    mutationKey: ["user_picture"],
    mutationFn: () => handleFile(),
    onSuccess: () => {
      alert("updated successfully!");
    },
  });

  const updateBlog = useMutation({
    mutationKey: ["formInput"],
    mutationFn: (blog) => handleBlogFile(blog),
    onSuccess: () => {
      alert("updated successfully!");
    },
  });

  // const updateSocialMedia = useMutation({
  //   mutationKey: ["formInput"],
  //   mutationFn: (blog) => handleUpdateSocials(blog),
  //   onSuccess: () => {
  //     // alert("updated successfully!");
  //     // setShowModal(false)
  //   },
  // });
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
    // console.log(diffInTime);
    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);
    // console.log(diffInDays);

    if (diffInDays === 0) return "today";
    else if (diffInDays === 1) return diffInDays + " Day Ago";
    return diffInDays + " Days Ago";
  }
  // console.log(editBlogData);
  const EditBlogHandler = (blog) => {
    setEditBlogData(blog);
    setShowEditSec(true);
  };

  useEffect(() => {
    setUserInfo(userData);
    api[1].refetch();
    if (isSuccess) {
      api[1].refetch();
    }
  }, [userData, imgFile, setImgFile, deleteBlog.isSuccess]);

  if (api[0]?.isLoading && api[1].isLoading) {
    return <Skeleton count={10} />;
  }
  if (updateUserFile.isSuccess) {
    api[0].refetch();
  }
  // console.log(editBlogData);
  // if(profileInput.phone){
  //   setDisplayText(blogFile)
  // }
  // if(!blogFile){
  //   setDisplayText('no image selected')
  // }
  console.log(profileInput);
  return (
    <div className="profile">
      <div className={`profile_cn ${showEditSec && "bgcl"}`}>
        <section className={`profile_pic_section ${showPopUpDelete && "bgcl"}`}>
          <div className="pic_div">
            <div className="picture_cn">
              <img
                src={
                  userInfo?.picture ||
                  "http://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png"
                }
                alt="img"
                // style={{ width: "200px" }}
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

          {navBtn == "content" && (
            <div className="user_info_div">
              <ul className="InfoDiv">
                <li>FullName: </li>
                <li>birthDate:</li>
                <li>phone:</li>
                <li>gender: </li>
                <li>country:</li>
                <li>city:</li>
              </ul>

              <ul className="userDiv">
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
              </ul>
            </div>
          )}

          {navBtn == "blogs" && (
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
                        <img
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
              <a href={userInfo?.twitter || ''}>
                <AiFillTwitterSquare />
              </a>
            </div>

            <div className="icon_cn">
              <a href={`mailto:${userInfo?.socialMail}`}>
                <AiOutlineMail />
              </a> 
            </div>
            <div className="icon_cn">
              <a href={userInfo?.linkedIn || ''}>
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
                  value={profileInput.twitter || ''}
                />
                {/* <label htmlFor="socialEmail">socialEmail</label> */}
                 <input
                  type="text" 
                  name="socialEmail"
                  onChange={(e) => {
                    formInputHandler(e);
                  }}
                  placeholder="Enter socialEmail link"
                  value={profileInput.socialEmail || ''}
                />
                {/* <label htmlFor="linkedIn">linkedIn</label> */}
                 <input
                  type="text"
                  name="linkedIn"
                  onChange={(e) => {
                    formInputHandler(e);
                  }}
                  placeholder="Enter linkedIn link"
                  value={profileInput.linkedIn || ''}
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
            <div className="closeDiv" onClick={() => setShowEditSec(false)}>
              <MdKeyboardDoubleArrowLeft className="close_icon" />
            </div>
            <div className="edit_cn">
              <div className="imgCn">
                <img
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

// {

// }

/* <section className="profile_pic_section">
<div className="pic_div">
  <img
    src="http://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png"
    alt="img"
    style={{ width: "200px" }}
    className="userImg"
  />
  <div className="user_info_div">
    <h4>my name is mamoun</h4>
    <p>mamoun.bursi@yahoo.com</p>
  </div>
  <button className="userImgBtn">update profile image</button>
</div>

<div className="socials_div"></div>
</section>

<section className="profile_info_section">
<h2>profile information</h2>
<form>
  <div className="formInput">
    <label htmlFor="fullName">Full Name</label>
    <input type="text" name="fullName" value={userInfo?.fullName} onChange={(e)=>{formInputHandler(e)}}/>
  </div>
  <div className="formInput">
    <label htmlFor="birthDate">birthDate</label>
    <input type="date" name="birthDate" value={userInfo?.fullName} onChange={(e)=>{formInputHandler(e)}}/>
  </div>
  <div className="formInput">
    <label htmlFor="gender">Gender</label>
    <select onChange={(e)=>{formInputHandler(e)}}  name="gender">
      <option name="male" id="">
        male
      </option>
      <option name="female" id="">
        female
      </option>
    </select>
  </div>
  <div className="formInput">
    <label htmlFor="phone">Phone</label>
    <input type="number" name="phone" value={userInfo?.phone} onChange={(e)=>{formInputHandler(e)}}/>
  </div>
  <div className="formInput">
    <label htmlFor="country">country</label>
    <input type="text" name="country" value={userInfo?.country} onChange={(e)=>{formInputHandler(e)}}/>
  </div>
  <div className="formInput">
    <label htmlFor="city">city</label>
    <input type="text" name="city"  value={userInfo?.city} onChange={(e)=>{formInputHandler(e)}}/>
  </div>
</form>
<button onClick={()=>mutate()}> save changes</button>
</section> */
