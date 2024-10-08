import LangSwitcher from "../../components/Common/LangSwitcher";
import { useTranslations } from "next-intl";

// Home Page
export default function HomePage({ params: { locale } }) {
  const t = useTranslations("Index");
  return (
    <>
      <div>
        <h2>{t("title")}</h2>

        <LangSwitcher />
      </div>
    </>
  );
}
