"use client";
import { useLocale, useTranslations } from "next-intl";
import React, { useTransition } from "react";
import { useRouter } from "next/navigation";

const LangSwitcher = () => {
  //   const [isPending, startTransition] = useTransition;
  const router = useRouter();
  const localActive = useLocale(); // getting the defualt value of the lang
  const t = useTranslations("Lang");
  const R = useTranslations("Index"); // just tesitng some script

  const changLang = (e) => {
    const nextLocal = e.target.value;
    router.replace(`/${nextLocal}`);
    // startTransition(() => {});
  };
  return (
    <>
      <label className="" htmlFor="">
        {t("text")}
        <select
          defaultValue={localActive}
          onChange={changLang}
          // disabled={isPending}
        >
          <option value="en">{t("en")}</option>
          <option value="ar">{t("ar")}</option>
          <option value="fr">{t("fr")}</option>
        </select>
      </label>
      <div>
        <h1>{R("title")}</h1>
      </div>
    </>
  );
};

export default LangSwitcher;
