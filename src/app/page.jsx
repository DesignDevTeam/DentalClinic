import { redirect } from "next/dist/server/api-utils";
import React from "react";

const Page = () => {
  redirect("/en");
};

export default Page;
