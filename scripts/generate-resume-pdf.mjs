import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const resume = JSON.parse(fs.readFileSync(path.join(root, "content", "resume.json"), "utf8"));

const margin = 50;
const lineHeight = 14;
const sectionGap = 18;
const pageWidth = 612;
const pageHeight = 792;
const maxWidth = pageWidth - margin * 2;

function wrapText(text, font, size, maxLineWidth) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) <= maxLineWidth) {
      current = next;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines;
}

async function main() {
  const pdf = await PDFDocument.create();
  let page = pdf.addPage([pageWidth, pageHeight]);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  let y = pageHeight - margin;

  const drawLines = (lines, size = 10, font = regular, color = rgb(0.1, 0.1, 0.1), gap = lineHeight) => {
    for (const line of lines) {
      if (y < margin + gap) {
        page = pdf.addPage([pageWidth, pageHeight]);
        y = pageHeight - margin;
      }
      page.drawText(line, { x: margin, y, size, font, color });
      y -= gap;
    }
  };

  const drawHeading = (text) => {
    y -= sectionGap / 2;
    drawLines([text], 12, bold, rgb(0, 0, 0), 16);
    y -= 4;
  };

  page.drawText("Joe Webb", { x: margin, y, size: 20, font: bold, color: rgb(0, 0, 0) });
  y -= 24;

  const contactLine = [
    resume.contact.email,
    resume.contact.location,
    "joewebbdesigns.com",
    "linkedin.com/in/josephdwebb",
    "github.com/WebbDeveloping",
  ].join(" · ");

  drawLines(wrapText(contactLine, regular, 9, maxWidth), 9, regular, rgb(0.25, 0.25, 0.25));
  y -= sectionGap;

  drawHeading("Summary");
  drawLines(wrapText(resume.summary, regular, 10, maxWidth));

  drawHeading("Skills");
  drawLines(wrapText(resume.skills.join(" · "), regular, 10, maxWidth));

  drawHeading("Experience");
  for (const role of resume.experience) {
    drawLines(
      [`${role.title} — ${role.company} (${role.start} – ${role.end})`],
      10,
      bold,
      rgb(0, 0, 0),
      14,
    );
    drawLines([role.location], 9, regular, rgb(0.35, 0.35, 0.35), 12);
    for (const bullet of role.bullets) {
      drawLines(wrapText(`• ${bullet}`, regular, 10, maxWidth - 8), 10);
    }
    y -= 8;
  }

  drawHeading("Education");
  for (const entry of resume.education) {
    drawLines(
      [`${entry.institution} — ${entry.degree} (${entry.start} – ${entry.end})`],
      10,
      regular,
    );
  }

  const outputDir = path.join(root, "public", "resume");
  fs.mkdirSync(outputDir, { recursive: true });
  const bytes = await pdf.save();
  fs.writeFileSync(path.join(outputDir, resume.pdfFilename), bytes);
  console.log(`Wrote public/resume/${resume.pdfFilename}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
