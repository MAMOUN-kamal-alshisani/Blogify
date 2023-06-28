import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function User({ blog }) {
  const [user, setUser] = useState("");
  const getUser = async (blog) => {
    if (blog.UserId !== undefined) {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/api/user/${blog?.UserId}`
      );
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

  return (
    <>
      <span
        key={user?.id}
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2px",
          alignItems: "center",
        }}
      >
        <b className="noteIcon" style={{ color: "#673ab7" }}>
          {user?.UserName}
        </b>
      </span>
    </>
  );
}
