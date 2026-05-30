import type { Metadata } from "next";
import ResumePage from "@/components/webflow/ResumePage";
import WebflowPageShell from "@/components/webflow/WebflowPageShell";
import { getFeaturedDevProjects } from "@/lib/cms/data";
import { getResume } from "@/lib/content/resume";
import { buildWebflowMetadata, getWebflowPageByHtmlFile } from "@/lib/webflow/page-config";

const contactPageConfig = getWebflowPageByHtmlFile("contact.html")!;
const resume = getResume();

export const metadata: Metadata = {
  title: "Resume | Joe Webb — Frontend Engineer",
  description: resume.summary,
  openGraph: {
    title: "Resume | Joe Webb — Frontend Engineer",
    description: resume.summary,
    images: contactPageConfig.ogImage ? [contactPageConfig.ogImage] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume | Joe Webb — Frontend Engineer",
    description: resume.summary,
    images: contactPageConfig.ogImage ? [contactPageConfig.ogImage] : undefined,
  },
};

function buildPersonSchema() {
  const { contact, headline } = resume;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Joe Webb",
    jobTitle: headline,
    email: contact.email,
    url: contact.website,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sandy",
      addressRegion: "UT",
      addressCountry: "US",
    },
    sameAs: [contact.linkedin, contact.github],
  };
}

export default async function Page() {
  const allFeatured = await getFeaturedDevProjects();
  const projects = allFeatured.filter((project) =>
    resume.featuredProjectSlugs.includes(project.slug),
  );

  return (
    <WebflowPageShell wfPageId={contactPageConfig.wfPageId} bodyClass={contactPageConfig.bodyClass}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPersonSchema()) }}
      />
      <ResumePage resume={resume} projects={projects} />
    </WebflowPageShell>
  );
}
