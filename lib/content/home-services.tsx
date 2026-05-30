import type { ReactNode } from "react";

export type HomeServiceItem = {
  id: string;
  title: string;
  content: ReactNode;
};

export const homeServices: HomeServiceItem[] = [
  {
    id: "full-stack-web-development",
    title: "Full-Stack Web Development",
    content: (
      <p className="answer-text regular">
        As a full-stack developer, I have experience with a wide range of technologies. I specialize in front-end development but also have expertise in back-end development. I&apos;ve worked with many popular JavaScript frameworks, including <span className="primary">React</span> and <span className="primary">Node.js</span>, as well as CSS libraries like <span className="primary">Bootstrap</span>, <span className="primary">Material UI</span>, <span className="primary">SASS</span>, <span className="primary">Tailwind</span> and more.
      </p>
    ),
  },
  {
    id: "webflow-websites",
    title: "Webflow Websites",
    content: (
      <p className="answer-text regular">
        Webflow websites offer an easy and intuitive way to build a website without having any coding knowledge whatsoever, which is especially useful for hobbyist web designers who want something good looking but don&apos;t know how to code themselves.
        <br />
      </p>
    ),
  },
  {
    id: "gohighlevel-websites",
    title: "GoHighLevel Websites",
    content: (
      <p className="answer-text regular">
        Landing pages are a necessity in today&apos;s digital age. I&apos;ve studied and tested what makes them convert, so that you can have better luck with your campaigns!
        <br />
        See my GoHighLevel Websites.
        <br />
      </p>
    ),
  },
  {
    id: "custom-website",
    title: "Custom Website",
    content: (
      <p className="answer-text regular">
        To stay competitive in the online marketplace, responsive websites are essential for your business. A website&apos;s responsiveness means that it automatically adjusts to different screen sizes and formats which is important because people use a number of devices when browsing on the internet including tablets, smart phones, laptops or desktops.
      </p>
    ),
  },
  {
    id: "lead-generation-campaigns",
    title: "Lead Generation Campaigns",
    content: (
      <p className="answer-text regular">
        Digital marketing campaigns to drive traffic to your business can be a powerful tool. The right campaign, executed by the right experts, can help you get more sales leads and clients for your business.
        <br />
        <br />
        The right lead generation campaign will engage customers on every level of their decision-making process through content that provides value with prospects they need in order make important decisions about what product or service best meets their needs.
      </p>
    ),
  },
];
