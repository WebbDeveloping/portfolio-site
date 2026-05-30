import Reveal from "@/components/motion/Reveal";
import PageHero from "@/components/ui/PageHero";
import PageShell from "@/components/ui/PageShell";
import SiteFooter from "@/components/webflow/SiteFooter";
import type { Post } from "@/lib/cms/types";

type PostDetailPageProps = {
  post: Post;
};

export default function PostDetailPage({ post }: PostDetailPageProps) {
  return (
    <PageShell currentPage={null}>
      <PageHero
        title={post.name}
        subtitle={
          <>
            {post.postSummary ? (
              <div className="hero-section-paragraph">
                <Reveal as="p" immediate className="regular" delay={0.1}>
                  {post.postSummary}
                </Reveal>
              </div>
            ) : null}
            <div className="hero-section-button">
              <div className="date-and-name">
                <div className="button-text red author-name">By Joe Webb</div>
              </div>
            </div>
          </>
        }
      />

      <div className="section bg-jet">
        <div className="main-container center-content w-container">
          <div className="blog-content-wrapper">
            <div
              className="rich-text-block w-richtext"
              dangerouslySetInnerHTML={{ __html: post.postBody }}
            />
          </div>
        </div>
      </div>

      <SiteFooter currentPage={null} />
    </PageShell>
  );
}
