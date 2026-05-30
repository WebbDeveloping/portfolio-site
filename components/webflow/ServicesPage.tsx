import Reveal from "@/components/motion/Reveal";
import CtaBand from "@/components/ui/CtaBand";
import PageShell from "@/components/ui/PageShell";
import SiteFooter from "@/components/webflow/SiteFooter";
import { WebflowLink } from "@/components/webflow/WebflowLink";
import { serviceOfferings } from "@/lib/content/services";

export default function ServicesPage() {
  return (
    <PageShell currentPage="services">
      <div className="services-page">
        <div className="section top-section services-hero">
          <div className="main-container">
            <div className="top-spacing">
              <div className="medium-padding">
                <div className="services-hero__inner">
                  <Reveal as="div" immediate className="services-hero__header">
                    <div className="small-sub-title">Services</div>
                    <h1 className="large-titlee services-hero__title">What I Do</h1>
                    <p className="big services-hero__lead">
                      Product-focused frontend development and UI/UX design for businesses that
                      need fast, polished web experiences — from marketing sites and funnels to full
                      web applications.
                    </p>
                  </Reveal>
                  <Reveal immediate delay={0.08}>
                    <WebflowLink href="#services-list" className="btn-arrow-down-red w-inline-block">
                      <div className="inside-button-container">
                        <div className="button-text red">Explore services</div>
                        <img
                          src="/images/down-arrow.svg"
                          loading="lazy"
                          alt=""
                          className="image arrow"
                        />
                      </div>
                    </WebflowLink>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="services-list" className="section services-list-section">
          <div className="main-container">
            <div className="medium-padding">
              <div className="services-grid">
                {serviceOfferings.map((service, index) => (
                  <Reveal
                    key={service.id}
                    className={`service-card${index % 2 === 1 ? " service-card--alt" : ""}`}
                    delay={index * 0.04}
                  >
                    <article id={service.id} className="service-card__inner">
                      <div className="service-card__header">
                        <span className="service-card__index" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h2 className="service-card__title">{service.title}</h2>
                      </div>

                      <p className="regular service-card__summary">{service.summary}</p>
                      <p className="regular service-card__description">{service.description}</p>

                      <div className="service-card__details">
                        <div className="service-card__block">
                          <h3 className="service-card__label">What you get</h3>
                          <ul className="service-card__list">
                            {service.highlights.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="service-card__block">
                          <h3 className="service-card__label">Ideal for</h3>
                          <p className="regular service-card__ideal">{service.idealFor}</p>

                          {service.technologies.length > 0 ? (
                            <>
                              <h3 className="service-card__label service-card__label--tools">
                                Tools &amp; tech
                              </h3>
                              <ul className="service-card__tags">
                                {service.technologies.map((tech) => (
                                  <li key={tech}>{tech}</li>
                                ))}
                              </ul>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CtaBand />
      <SiteFooter currentPage="services" />
    </PageShell>
  );
}
