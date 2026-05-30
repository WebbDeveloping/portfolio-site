import Reveal from "@/components/motion/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/webflow/styles";

const DEFAULT_WF_PAGE_ID = "62b4e3f87b892db85711daa7";
const DEFAULT_WF_ELEMENT_ID = "40eb6dfa-8747-7b24-fb15-76411a78ac4a";

type ContactSectionProps = {
  wfPageId?: string;
  wfElementId?: string;
  showRecaptcha?: boolean;
  sectionClassName?: string;
  textClassName?: string;
};

export default function ContactSection({
  wfPageId = DEFAULT_WF_PAGE_ID,
  wfElementId = DEFAULT_WF_ELEMENT_ID,
  showRecaptcha = false,
  sectionClassName = "section black-bg",
  textClassName = "contact-section-text",
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
                <span className="contact-email">webbdeveloping@gmail.com</span>
              </p>
            </Reveal>
            <Reveal className="contact-page-right" delay={0.12}>
              <div className="form w-form">
                <form
                  id="email-form"
                  name="email-form"
                  data-name="Email Form"
                  method="get"
                  data-wf-page-id={wfPageId}
                  data-wf-element-id={wfElementId}
                >
                  <div className="wrap">
                    <input
                      className="form-input w-input"
                      maxLength={256}
                      name="Name-2"
                      data-name="Name 2"
                      placeholder="Full Name"
                      type="text"
                      id="Name-2"
                      required
                    />
                  </div>
                  <div className="wrap">
                    <input
                      className="form-input w-input"
                      maxLength={256}
                      name="Email-2"
                      data-name="Email 2"
                      placeholder="Email"
                      type="email"
                      id="Email-2"
                      required
                    />
                  </div>
                  <div className="wrap">
                    <textarea
                      className="form-input w-input"
                      maxLength={5000}
                      name="field"
                      data-name="Field"
                      placeholder="Message"
                      id="field"
                    />
                  </div>
                  <div className="wrap" />
                  <div className="wrap margin-bottom" />
                  {showRecaptcha ? (
                    <div
                      data-sitekey="6LceCmQpAAAAAH1Uii8_lZj68GAncq5cZQ7QZQmP"
                      className="w-form-formrecaptcha g-recaptcha g-recaptcha-error g-recaptcha-disabled"
                    />
                  ) : null}
                  <input
                    type="submit"
                    data-wait="Please wait..."
                    className="submit-button w-button"
                    value="Submit"
                  />
                </form>
                <div className="w-form-done">
                  <div>Thank you! Your submission has been received!</div>
                </div>
                <div className="w-form-fail">
                  <div>Oops! Something went wrong while submitting the form.</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
