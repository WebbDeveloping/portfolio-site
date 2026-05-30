"use client";

import Reveal from "@/components/motion/Reveal";
import { WebflowLink } from "@/components/webflow/WebflowLink";
import { videoPath } from "@/lib/cms/paths";
import type { Video } from "@/lib/cms/types";

function youtubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  return match ? `https://www.youtube.com/watch?v=${match[1]}` : null;
}

type VideoCardProps = {
  video: Video;
  variant?: "home-main" | "home-sidebar" | "page-main" | "page-sidebar" | "grid";
  staggerIndex?: number;
};

export function VideoCard({ video, variant = "grid", staggerIndex = 0 }: VideoCardProps) {
  const watchUrl = youtubeEmbedUrl(video.youtubeUrl) ?? video.youtubeUrl;

  if (variant === "home-main") {
    return (
      <div role="listitem" className="video-popular w-dyn-item">
        <div className="image-wrapper popular-video">
          <WebflowLink href={videoPath(video.slug)} className="w-inline-block">
            <img src={video.featuredImage} alt={video.title} className="image-3 video" />
          </WebflowLink>
          <WebflowLink href={watchUrl} target="_blank" className="main-video-button-wrapper w-inline-block">
            <div className="icon-video-button">▶</div>
          </WebflowLink>
        </div>
        <WebflowLink href={videoPath(video.slug)} className="video-title-link w-inline-block">
          <h3 className="title video-title">{video.title}</h3>
        </WebflowLink>
        <div className="hero-section-button">
          <WebflowLink href={watchUrl} target="_blank" className="btn-arrow-down-red w-inline-block">
            <div className="inside-button-container watch-now">
              <div className="button-text red">Watch Video</div>
              <img src="/images/down-arrow.svg" loading="lazy" alt="" className="image arrow flip-90" />
            </div>
          </WebflowLink>
        </div>
      </div>
    );
  }

  if (variant === "home-sidebar" || variant === "page-sidebar") {
    const titleClass =
      variant === "page-sidebar" ? "sub-title white" : "title popular-video-sidebar";

    return (
      <div role="listitem" className="video-popular-sidebar w-dyn-item">
        <div className="image-wrapper video-popular-sidebar">
          <WebflowLink href={videoPath(video.slug)} className="w-inline-block">
            <img src={video.featuredImage} alt={video.title} className="image-3 video" />
          </WebflowLink>
          <WebflowLink href={watchUrl} target="_blank" className="main-video-button-wrapper popular-video-sidebar w-inline-block">
            <div className="icon-video-button">▶</div>
          </WebflowLink>
        </div>
        <WebflowLink href={videoPath(video.slug)} className="popular-video-sidebar-title-link w-inline-block">
          <h3 className={titleClass}>{video.title}</h3>
          {variant === "home-sidebar" ? (
            <h4 className="title popular-video-sidebar primary">Watch Video</h4>
          ) : null}
        </WebflowLink>
      </div>
    );
  }

  if (variant === "page-main") {
    return (
      <div role="listitem" className="video-popular w-dyn-item">
        <div className="image-wrapper feature-video">
          <WebflowLink href={videoPath(video.slug)} className="video-wrapper w-inline-block">
            <img src={video.featuredImage} alt={video.title} className="image-3 video" />
            <div className="video-play-button">
              <div className="video-button-blur">
                <img src="/images/play-blur.svg" loading="lazy" alt="" className="play-btn" />
              </div>
            </div>
          </WebflowLink>
          <WebflowLink href={watchUrl} target="_blank" className="main-video-button-wrapper w-inline-block">
            <div className="icon-video-button">▶</div>
          </WebflowLink>
        </div>
        <WebflowLink href={videoPath(video.slug)} className="video-title-link w-inline-block">
          <h3 className="style-title">{video.title}</h3>
        </WebflowLink>
        <div className="hero-section-button">
          <WebflowLink href="#all-videos" className="btn-arrow-down-red w-inline-block">
            <div className="inside-button-container">
              <div className="button-text red">Watch Videos</div>
              <img src="/images/down-arrow.svg" loading="lazy" alt="" className="image arrow" />
            </div>
          </WebflowLink>
        </div>
      </div>
    );
  }

  return (
    <Reveal as="div" role="listitem" className="w-dyn-item" delay={staggerIndex * 0.08}>
      <div className="item">
        <WebflowLink href={videoPath(video.slug)} className="project-link-block w-inline-block">
          <div className="project-size-medium video-card">
            <img src={video.featuredImage} loading="lazy" alt={video.title} className="image" />
            <div className="bg video-card"></div>
            <div className="video-card-title transparent hide">
              <h3 className="sub-title white">{video.title}</h3>
              <div className="accent-line"></div>
            </div>
          </div>
        </WebflowLink>
      </div>
    </Reveal>
  );
}

type VideoFeaturedSectionProps = {
  main?: Video;
  sidebar: Video[];
  page?: boolean;
};

export function VideoFeaturedSection({ main, sidebar, page = false }: VideoFeaturedSectionProps) {
  return (
    <div className="w-layout-grid videos-popular-grid">
      <div className="w-dyn-list">
        <div role="list" className="w-dyn-items">
          {main ? (
            <VideoCard video={main} variant={page ? "page-main" : "home-main"} />
          ) : (
            <div className="empty-state w-dyn-empty">
              <div>No items found.</div>
            </div>
          )}
        </div>
      </div>
      <div className="w-dyn-list">
        <div role="list" className="sidebar-popular-grid w-dyn-items">
          {sidebar.length > 0 ? (
            sidebar.map((video) => (
              <VideoCard
                key={video.slug}
                video={video}
                variant={page ? "page-sidebar" : "home-sidebar"}
              />
            ))
          ) : (
            <div className="empty-state w-dyn-empty">
              <div>No items found.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type VideoGridProps = {
  videos: Video[];
};

export function VideoGrid({ videos }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="w-dyn-empty">
        <div>No items found.</div>
      </div>
    );
  }

  return (
    <div role="list" className="project-grid w-dyn-items">
      {videos.map((video, index) => (
        <VideoCard key={video.slug} video={video} variant="grid" staggerIndex={index} />
      ))}
    </div>
  );
}
