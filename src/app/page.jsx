import { redirect } from "next/dist/server/api-utils";
import React from "react";

const page = () => {
  redirect("/en");
};

export default page;
