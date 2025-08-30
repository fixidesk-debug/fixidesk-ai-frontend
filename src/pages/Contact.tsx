import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactSection } from "@/components/contact-section";
import { Seo } from "@/components/Seo";
import { useI18n } from "@/lib/i18n";

export default function Contact() {
  const { t } = useI18n();
  return (
    <div id="main" className="min-h-screen bg-background">
      <Seo title={t("contact.header") + " • FixiDesk"} description={t("contact.sub")}/>
      <Navbar />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
