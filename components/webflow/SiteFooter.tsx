import AnimatedFooter from "@/components/motion/AnimatedFooter";
import { getFooterLinks, type SitePageId } from "@/lib/navigation";

type SiteFooterProps = {
  currentPage: SitePageId;
};

export default function SiteFooter({ currentPage }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="section black-bg">
        <div className="main-container">
          <div className="small-padding">
            <AnimatedFooter links={getFooterLinks(currentPage)} />
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="main-container">
          <p className="footer-copyright__text">
            Copyright © {year} Joe Webb Designs. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
