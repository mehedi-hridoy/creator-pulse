import { useState } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE || "https://api.creatorpulse.mehedihridoy.online";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [clearing, setClearing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleClearData = async () => {
    if (!window.confirm("Are you sure you want to clear all analytics data?")) {
      return;
    }

    setClearing(true);
    try {
      await axios.delete(`${API_BASE}/analytics/clear`, {
        withCredentials: true,
      });
      alert("All analytics data cleared successfully!");
      setResult(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to clear data");
    } finally {
      setClearing(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a JSON file");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("files", file);

    try {
      const res = await axios.post(
        `${API_BASE}/upload/json`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data);
    } catch (err) {
      setError(
        err.response?.data?.error || "Upload failed. Please check your JSON."
      );
    } finally {
      setUploading(false);
    }
  };

  // Drag & Drop handlers (presentation only)
  const onDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };
  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setError("");
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="glass-card w-full p-8">
        <h2 className="text-2xl font-semibold tracking-tight mb-2 text-foreground">
          Upload Analytics JSON
        </h2>
        <p className="upload-meta">Enrich your dashboard data</p>

        {/* Dropzone */}
        <div
          className={`mt-6 dropzone-premium ${dragActive ? 'drag-active' : ''}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
            id="jsonUpload"
          />
          <label htmlFor="jsonUpload" className="cursor-pointer select-none">
            {file ? (
              <span className="font-medium text-sm text-foreground/90">{file.name}</span>
            ) : (
              <>
                <span className="text-sm font-medium text-foreground/80">Drop or click to select JSON</span>
                <span className="block mt-2 text-xs text-muted-foreground">Single .json file • auto-processed</span>
              </>
            )}
          </label>
        </div>

        {error && (
          <p className="text-red-500 text-xs mt-3 font-medium">
            {error}
          </p>
        )}

        <div className="mt-6 space-y-3">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="upload-btn-primary"
          >
            {uploading ? "Uploading..." : file ? "Upload Selected File" : "Upload JSON"}
          </button>
          <button
            onClick={handleClearData}
            disabled={clearing}
            className="upload-btn-danger"
          >
            {clearing ? "Clearing..." : "Clear All Analytics Data"}
          </button>
        </div>

        {result && (
          <div className="upload-result-card">
            <h3 className="font-semibold text-sm tracking-wide">Upload Successful</h3>
            <p className="text-xs mt-2">Platform: <b>{result.platform}</b></p>
            <p className="text-xs">Items Extracted: <b>{result.count}</b></p>
          </div>
        )}
        </div>
      </div>
    </Layout>
  );
}
