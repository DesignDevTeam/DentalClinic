import React from "react";
import { useTranslations } from "next-intl";

const page = () => {
  const Text = useTranslations("Index");
  return (
    <div>
      <h1>About</h1>
    </div>
  );
};

export default page;
