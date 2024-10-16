import React from "react";
import { useTranslations } from "next-intl";

const About = () => {
  const Text = useTranslations("Index");

  return (
    <div>
      <h1>About</h1>
    </div>
  );
};

export default About;
