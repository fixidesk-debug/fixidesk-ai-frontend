import { useContext, createContext } from "react";

interface I18nContextValue {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export { I18nContext };
