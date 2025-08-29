import { useI18n } from "@/lib/i18n";

export function LanguageToggle() {
  const { locale, setLocale } = useI18n();
  return (
    <select
      aria-label="Language"
      className="bg-transparent border rounded-md px-2 py-1 text-sm"
      value={locale}
      onChange={(e) => setLocale(e.target.value)}
    >
      <option value="en">EN</option>
      <option value="hi">HI</option>
    </select>
  );
}


