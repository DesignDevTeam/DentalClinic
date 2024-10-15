"use client";
import { redirect } from "next/navigation";
import React from "react";
import { useRouter } from "next/navigation"; // Correct import for App Router

const page = () => {
  const router = useRouter();
  const handelLogout = async (e) => {
    console.log("here");
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle network errors or other exceptions
    }
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handelLogout} className="w-fit h-fit p-2 bg-slate-500">
        {" "}
        logout
      </button>
    </div>
  );
};

export default page;
