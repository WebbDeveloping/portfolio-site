import CtaBand from "@/components/ui/CtaBand";
import ContactSection from "@/components/ui/ContactSection";
import PageShell from "@/components/ui/PageShell";
import SiteFooter from "@/components/webflow/SiteFooter";

export default function ContactPage() {
  return (
    <PageShell currentPage="contact">
      <ContactSection sectionClassName="section black-bg padding-top" showRecaptcha />
      <CtaBand />
      <SiteFooter currentPage="contact" />
    </PageShell>
  );
}
