import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function User({ blog }) {
  const [user, setUser] = useState("");
  const [userPic, setUserPic] = useState("");
  ;
  const getUser = async (blog) => {
    if (blog.UserId !== undefined) {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/api/user/${blog?.UserId}`
      );
      
      return res.data;
    }
  };
  const getUserPicture = async (blog) => {
    if (blog.UserId !== undefined) {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/api/user/profile/${blog?.UserId}`
      );
      console.log(res.data)
      return res.data;
    }
  };

  const { data, error } = useQuery({
    queryKey: ["blogs", blog],
    queryFn: () => getUser(blog),
    onSuccess: (data) => {
      setUser(data);
    },
  });
  const fetchUserPicture = useQuery({
    queryKey: ["Userblogs", blog],
    queryFn: () => getUserPicture(blog),
    onSuccess: (data) => {
      setUserPic(data.picture);
    },
  });
  return (
    <>
      <span
        key={user?.id}
        style={{
          display: "flex",
          flexDirection: "row",
          // gap: "5%",
          paddingLeft: "5px",
          alignItems: "center",
        }}
        className="userCt"
      >
        <img
          src={
            userPic ||
            "https://tse4.mm.bing.net/th?id=OIP.9OLanwqz0biqN8b9QijRqwHaHV&pid=Api&P=0&h=220"
          }
          alt={userPic}
          style={{ width: "30px", height: "30px", borderRadius: "50%" }}
        />
        <b className="noteIcon" style={{ color: "#673ab7",paddingLeft: "5px" }}>
          {user?.UserName}
        </b>
      </span>
    </>
  );
}
