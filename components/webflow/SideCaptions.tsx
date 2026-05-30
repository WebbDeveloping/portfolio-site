import { WebflowLink } from "@/components/webflow/WebflowLink";

export default function SideCaptions() {
  return (
    <div className="side-caption-contain">
      <div className="side-captions">
        <WebflowLink href="#" className="side-caption-link left w-inline-block">
          <div className="side-text">BASED IN SALT LAKE CITY, Utah</div>
        </WebflowLink>
        <WebflowLink href="#" className="side-caption-link right w-inline-block">
          <div className="side-text">webbdeveloping@gmail.com</div>
        </WebflowLink>
      </div>
    </div>
  );
}
