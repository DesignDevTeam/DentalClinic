import LangSwitcher from "../components/LangSwitcher";
import { useTranslations } from "next-intl";
import SignIn from "../components/SignIn";

// Home Page
export default function HomePage({ params: { locale } }) {
  const t = useTranslations("Index");

  return (
    <>
      <div>
        <section className="py-24">
          <h2>{t("title")} </h2>

          <LangSwitcher />
          <SignIn lang={locale} />
        </section>
      </div>
    </>
  );
}
