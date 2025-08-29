import { useI18n } from "@/lib/i18n-hooks";

export function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "hi" : "en");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
    >
      <span className="text-lg">
        {locale === "en" ? "🇮🇳" : "🇺🇸"}
      </span>
      <span>{locale === "en" ? "हिंदी" : "English"}</span>
    </button>
  );
}


