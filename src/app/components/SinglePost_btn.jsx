"use client";
import { useRouter } from "next/navigation";
import React from "react";

const SinglePost_btn = ({ id }) => {
  const router = useRouter();
  const handlClick = () => {
    router.push(`Blog/${id}`);
  };
  return <button onClick={handlClick}>See Blog</button>;
};

export default SinglePost_btn;
