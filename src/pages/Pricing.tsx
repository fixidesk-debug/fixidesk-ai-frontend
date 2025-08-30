import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PricingSection } from "@/components/pricing-section";
import { Seo } from "@/components/Seo";
import { useI18n } from "@/lib/i18n";

export default function Pricing() {
  const { t } = useI18n();
  return (
    <div id="main" className="min-h-screen bg-background">
      <Seo title={t("pricing.header") + " • FixiDesk"} description={t("pricing.sub")}/>
      <Navbar />
      <main>
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
