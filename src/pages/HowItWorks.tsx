import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { Seo } from "@/components/Seo";
import { useI18n } from "@/lib/i18n";

export default function HowItWorks() {
  const { t } = useI18n();
  return (
    <div id="main" className="min-h-screen bg-background">
      <Seo title={t("how.header") + " • FixiDesk"} description={t("how.sub")}/>
      <Navbar />
      <main>
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
}
