import LangSwitcher from "components/components/LangSwitcher";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("Index");
  return (
    <>
      <div>
        <h1>App</h1>
        <LangSwitcher />
      </div>
    </>
  );
}
