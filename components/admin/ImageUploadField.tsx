"use client";

import { useState } from "react";

type ImageUploadFieldProps = {
  name: string;
  label: string;
  defaultValue?: string;
  prefix?: string;
};

export default function ImageUploadField({
  name,
  label,
  defaultValue = "",
  prefix = "uploads",
}: ImageUploadFieldProps) {
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("prefix", prefix);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = (await response.json()) as { url: string };
      setUrl(data.url);
    } catch {
      setError("Upload failed. Check BLOB_READ_WRITE_TOKEN or try a URL instead.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="admin-field">
      <label htmlFor={name}>{label}</label>
      <div className="admin-image-row">
        <input
          id={name}
          name={name}
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Image URL or upload a file"
        />
        <label className="admin-btn admin-btn-secondary" style={{ cursor: "pointer" }}>
          {uploading ? "Uploading…" : "Upload"}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            hidden
          />
        </label>
      </div>
      {error ? <p className="admin-error">{error}</p> : null}
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt=""
          style={{ marginTop: "0.5rem", maxWidth: 200, maxHeight: 120, objectFit: "cover" }}
        />
      ) : null}
    </div>
  );
}
