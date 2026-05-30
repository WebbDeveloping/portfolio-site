# Resume PDF

The downloadable resume at `/resume/joe-webb-resume.pdf` is generated from `content/resume.json` and intentionally excludes a phone number.

Regenerate after editing resume content:

```bash
npx --yes -p pdf-lib node scripts/generate-resume-pdf.mjs
```

You can replace this file with a designed PDF exported from Google Docs or InDesign — keep the filename `joe-webb-resume.pdf` and do not include your phone number.
