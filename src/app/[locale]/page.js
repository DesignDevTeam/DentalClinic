import LangSwitcher from "components/components/LangSwitcher";
import { useTranslations } from "next-intl";

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
