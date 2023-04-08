import React from 'react'
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
export default function User({blog}) {


    const getUser = async (blog) => {
       const res = await axios.get(
         `http://localhost:4000/api/user/get/${blog.UserId}`
       );
       console.log(res);
       return res.data;
     };
   
     const { data, error } = useQuery({
        queryKey: ["blogs",blog.UserId],
        queryFn:()=> getUser(blog),
      });
  return (
    <>
    {data?.map(user=>{
        return   <span key={user?.id}> by: {user?.UserName}</span>
    })}
   
    </>
   
    // <span>sdsd</span>

  )
}
