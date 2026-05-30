import { VideoFeaturedSection, VideoGrid } from "@/components/cms/VideoCard";
import PageHero from "@/components/ui/PageHero";
import PageShell from "@/components/ui/PageShell";
import SectionHeader from "@/components/ui/SectionHeader";
import { WebflowLink } from "@/components/webflow/WebflowLink";
import SiteFooter from "@/components/webflow/SiteFooter";
import type { Video } from "@/lib/cms/types";
import Reveal from "@/components/motion/Reveal";

type JoeWebbYoutubeVideosPageProps = {
  featuredVideo?: Video;
  sidebarVideos: Video[];
  allVideos: Video[];
};

function ScrollDownLink({ href, label }: { href: string; label: string }) {
  return (
    <div className="hero-section-button">
      <WebflowLink href={href} className="btn-arrow-down-red w-inline-block">
        <div className="inside-button-container">
          <div className="button-text red">{label}</div>
          <img src="/images/down-arrow.svg" loading="lazy" alt="" className="image arrow" />
        </div>
      </WebflowLink>
    </div>
  );
}

export default function JoeWebbYoutubeVideosPage({
  featuredVideo,
  sidebarVideos,
  allVideos,
}: JoeWebbYoutubeVideosPageProps) {
  return (
    <PageShell currentPage="videos">
      <PageHero
        title="My Popular Videos"
        padding="small"
        subtitle={<ScrollDownLink href="#all-videos" label="View all Videos" />}
      />
      <div className="section">
        <div className="main-container">
          <div className="youtube-vdeo-page">
            <VideoFeaturedSection main={featuredVideo} sidebar={sidebarVideos} page />
            <Reveal className="flex-vc">
              <div className="_2-buttons full-width-landscape">
                <WebflowLink
                  href="https://www.youtube.com/channel/UCAShOI6mAA7bGd47E61-U7g"
                  className="project-btn red w-inline-block"
                >
                  <div className="project-btn-inside">
                    <div className="button-text white">Subscribe Now</div>
                  </div>
                </WebflowLink>
                <div className="space _2-buttons full-width-landscape" />
                <WebflowLink href="#lates-videos" className="project-btn w-inline-block">
                  <div className="project-btn-inside">
                    <div className="button-text white">View More</div>
                    <img
                      src="/images/5e783247e7efaf4135a2d97a_right-long-arrow-red.svg"
                      loading="lazy"
                      alt=""
                      className="btn-arrow"
                    />
                  </div>
                </WebflowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      <div id="lates-videos" className="section">
        <div className="main-container">
          <div className="top-spacing">
            <div className="medium-padding">
              <div className="page-description">
                <SectionHeader title="All My Videos" titleAs="h2" display />
                <div className="page-sub-title">
                  <ScrollDownLink href="#all-videos" label="View Videos" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="all-videos" className="section">
        <div className="main-container">
          <div className="project-page">
            <div className="w-dyn-list">
              <VideoGrid videos={allVideos} />
            </div>
          </div>
        </div>
      </div>
      <SiteFooter currentPage="videos" />
    </PageShell>
  );
}
