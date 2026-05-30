"use client";

import Reveal from "@/components/motion/Reveal";
import { WebflowLink } from "@/components/webflow/WebflowLink";
import { postPath } from "@/lib/cms/paths";
import type { Post } from "@/lib/cms/types";

type PostCardProps = {
  post: Post;
  staggerIndex?: number;
};

export function PostCard({ post, staggerIndex = 0 }: PostCardProps) {
  const image = post.thumbnailImage || post.mainImage;

  return (
    <Reveal as="div" role="listitem" className="w-dyn-item" delay={staggerIndex * 0.08}>
      <WebflowLink href={postPath(post.slug)} className="article-wrapper w-inline-block">
        <div className="image-wrapper-2 post-section">
          <div className="bloh-title-ab">
            <h3 className="title-2 h4 post-section">{post.name}</h3>
            <div className="accent-line"></div>
          </div>
          {image ? <img src={image} loading="lazy" alt={post.name} className="image-3 post-section" /> : null}
        </div>
        <div className="post-section-content">
          <div className="inside-button-container">
            <div className="button-text continue-reading">Continue reading</div>
            <img src="/images/down-arrow.svg" loading="lazy" alt="" className="image cr-arrow" />
          </div>
        </div>
      </WebflowLink>
    </Reveal>
  );
}

type PostGridProps = {
  posts: Post[];
};

export function PostGrid({ posts }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="w-dyn-empty">
        <div>No items found.</div>
      </div>
    );
  }

  return (
    <div role="list" className="article-grid w-dyn-items">
      {posts.map((post, index) => (
        <PostCard key={post.slug} post={post} staggerIndex={index} />
      ))}
    </div>
  );
}
