import { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
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
        "http://localhost:5000/upload/json",
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Upload Analytics JSON
        </h2>

        {/* File Input */}
        <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600">
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
            id="jsonUpload"
          />

          <label htmlFor="jsonUpload" className="cursor-pointer text-gray-600 dark:text-gray-300">
            {file ? (
              <span className="font-medium">{file.name}</span>
            ) : (
              "Click to upload JSON file"
            )}
          </label>
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-3">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

        {/* Result */}
        {result && (
          <div className="mt-6 p-4 rounded-lg bg-green-100 dark:bg-green-800 text-gray-900 dark:text-white">
            <h3 className="font-semibold">Upload Successful</h3>
            <p className="text-sm mt-1">Platform: <b>{result.platform}</b></p>
            <p className="text-sm">Items Extracted: <b>{result.count}</b></p>
          </div>
        )}
      </div>
    </div>
  );
}
