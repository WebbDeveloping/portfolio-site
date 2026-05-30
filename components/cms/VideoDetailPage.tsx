import Reveal from "@/components/motion/Reveal";
import PageShell from "@/components/ui/PageShell";
import SiteFooter from "@/components/webflow/SiteFooter";
import { WebflowLink } from "@/components/webflow/WebflowLink";
import type { Video } from "@/lib/cms/types";

type VideoDetailPageProps = {
  video: Video;
};

function youtubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function VideoDetailPage({ video }: VideoDetailPageProps) {
  const embedUrl = youtubeEmbedUrl(video.youtubeUrl);

  return (
    <PageShell currentPage={null}>
      <div className="section top-section">
        <div className="main-container">
          <div className="medium-padding">
            <div className="top-content video-top">
              <Reveal immediate className="split-content-2 video-left">
                {video.publishedOn ? <div className="video-date">{video.publishedOn}</div> : null}
                <h1 className="title-3 video-title-page">{video.title}</h1>
              </Reveal>
            </div>
            <Reveal className="image-wrapper video-page" delay={0.1}>
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="image-67 video darker"
                  style={{ width: "100%", aspectRatio: "16 / 9", border: 0 }}
                />
              ) : (
                <img src={video.featuredImage} alt={video.title} className="image-67 video darker" />
              )}
            </Reveal>
            <Reveal className="flex-vc youtube-video-page" delay={0.18}>
              <div className="_2-buttons full-width-landscape">
                <WebflowLink
                  href="https://www.youtube.com/channel/UCAShOI6mAA7bGd47E61-U7g"
                  target="_blank"
                  className="project-btn red w-inline-block"
                >
                  <div className="project-btn-inside">
                    <div className="button-text white">Subscribe Now</div>
                  </div>
                </WebflowLink>
                <div className="space _2-buttons full-width-landscape" />
                <WebflowLink href="joe-webb-youtube-videos.html" className="project-btn jet-black w-inline-block">
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

      <SiteFooter currentPage={null} />
    </PageShell>
  );
}
