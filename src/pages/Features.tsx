import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FeaturesSection } from "@/components/features-section";
import { Seo } from "@/components/Seo";
import { useI18n } from "@/lib/i18n";

export default function Features() {
  const { t } = useI18n();
  return (
    <div id="main" className="min-h-screen bg-background">
      <Seo title={t("features.header") + " • FixiDesk"} description={t("features.sub")}/>
      <Navbar />
      <main>
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
