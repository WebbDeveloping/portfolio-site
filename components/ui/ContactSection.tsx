import Reveal from "@/components/motion/Reveal";
import ContactForm from "@/components/ui/ContactForm";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/webflow/styles";

const DEFAULT_CONTACT_EMAIL = "webbdeveloping@gmail.com";

type ContactSectionProps = {
  sectionClassName?: string;
  textClassName?: string;
  contactEmail?: string;
};

export default function ContactSection({
  sectionClassName = "section black-bg",
  textClassName = "contact-section-text",
  contactEmail = process.env.CONTACT_TO_EMAIL ?? DEFAULT_CONTACT_EMAIL,
}: ContactSectionProps) {
  return (
    <div className={sectionClassName}>
      <div className="main-container">
        <div className="medium-padding">
          <div className="about-section">
            <Reveal immediate className={cn(textClassName)}>
              <SectionHeader
                eyebrow="GENERAL INQUIRIES"
                eyebrowVariant="caption"
                title="Let's Connect"
                titleAs="h2"
                display
              />
              <p className="big">
                Reach me at:
                <br />
                <span className="contact-email">{contactEmail}</span>
              </p>
            </Reveal>
            <Reveal className="contact-page-right" delay={0.12}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
