import AboutDropdown from "@/components/webflow/AboutDropdown";
import { WebflowLink } from "@/components/webflow/WebflowLink";
import { postPath } from "@/lib/cms/paths";
import { navLinkProps, type SitePageId } from "@/lib/navigation";

type SiteNavProps = {
  currentPage: SitePageId;
};

export default function SiteNav({ currentPage }: SiteNavProps) {
  const isHome = currentPage === "home";
  const isAbout = currentPage === "about";
  const isProjects = currentPage === "projects";
  const isDevProjects = currentPage === "dev-projects";
  const isContact = currentPage === "contact";

  return (
    <div className="fixed-nav">
      <div className="navigation-wrap">
        <div
          data-collapse="medium"
          data-animation="default"
          data-duration="400"
          data-easing="ease"
          data-easing2="ease"
          role="banner"
          className="navbar-2 w-nav"
        >
          <div className="navigation-full">
            <div className="navigation-container">
              <div className="navigation-left">
                <WebflowLink
                  href="index.html"
                  {...navLinkProps("brand-2 w-nav-brand", isHome)}
                >
                  <h1 className="logo-text">Joe Webb</h1>
                </WebflowLink>
              </div>
              <div className="navigation-middle">
                <nav role="navigation" className="nav-menu w-nav-menu">
                  <WebflowLink
                    href="index.html"
                    {...navLinkProps("navigation-link w-nav-link", isHome)}
                  >
                    Home
                  </WebflowLink>
                  <AboutDropdown
                    variant="desktop"
                    isAbout={isAbout}
                    isProjects={isProjects}
                    isDevProjects={isDevProjects}
                  />
                  <WebflowLink
                    href="projects.html"
                    {...navLinkProps("navigation-link w-nav-link", isProjects)}
                  >
                    Projects
                  </WebflowLink>
                  <WebflowLink
                    href={postPath("professional-gohighlevel-websites")}
                    className="navigation-link hide w-nav-link"
                  >
                    GHL Websites
                  </WebflowLink>
                  <WebflowLink
                    href="contact.html"
                    {...navLinkProps("navigation-link w-nav-link", isContact)}
                  >
                    Contact
                  </WebflowLink>
                </nav>
              </div>
              <div className="navigation-right">
                <nav role="navigation" className="nav-menu w-nav-menu">
                  <WebflowLink
                    href="contact.html"
                    {...navLinkProps("cta-button sm-hide w-inline-block", isContact)}
                  >
                    <div>
                      <div className="button-text white">Request A Project</div>
                    </div>
                  </WebflowLink>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div
          data-collapse="medium"
          data-animation="default"
          data-duration="400"
          data-easing="ease-out"
          data-easing2="ease-out"
          role="banner"
          className="navigation-mob-2 w-nav"
        >
          <div className="navigation-container-mob">
            <WebflowLink href="index.html" {...navLinkProps("w-nav-brand", isHome)}>
              <h1 className="logo-text">Joe Webb</h1>
            </WebflowLink>
            <nav role="navigation" className="mobile-nav-2 w-nav-menu">
              <WebflowLink
                href="index.html"
                {...navLinkProps("mobile-nav-link w-nav-link", isHome)}
              >
                Home
              </WebflowLink>
              <AboutDropdown
                variant="mobile"
                isAbout={isAbout}
                isProjects={isProjects}
                isDevProjects={isDevProjects}
              />
              <WebflowLink
                href="projects.html"
                {...navLinkProps("mobile-nav-link w-nav-link", isProjects)}
              >
                Projects
              </WebflowLink>
              <WebflowLink
                href={postPath("professional-gohighlevel-websites")}
                className="mobile-nav-link w-nav-link"
              >
                GHL Websites
              </WebflowLink>
              <WebflowLink
                href="contact.html"
                {...navLinkProps("mobile-nav-link w-nav-link", isContact)}
              >
                Contact
              </WebflowLink>
            </nav>
            <div className="menu-mob w-nav-button">
              <div className="secondary _38px w-icon-nav-menu"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
