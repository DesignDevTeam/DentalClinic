import LangSwitcher from "components/components/LangSwitcher";
import { useTranslations } from "next-intl";

export default function HomePage({ params: { locale } }) {
  const t = useTranslations("Index");
  return (
    <>
      <div>
        <h1>
          {" "}
          {locale == "ar"
            ? "الموقع الالكتروني في الخدمة "
            : "website for you service"}{" "}
        </h1>
        <LangSwitcher />
      </div>
    </>
  );
}
