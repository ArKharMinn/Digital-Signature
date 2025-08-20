import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function Signature() {
  const sigCanvas = useRef({});
  const [imageURL, setImageURL] = useState(null);
  const [penColor, setPenColor] = useState("#000000"); // default black

  const clear = () => sigCanvas.current.clear();

  const save = () => {
    const dataURL = sigCanvas.current.toDataURL("image/png");
    setImageURL(dataURL);
  };

  const download = () => {
    if (!imageURL) return;
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "signature.png";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h1 className="text-2xl font-bold text-center">Signature Pad</h1>
          <p className="text-blue-100 text-center mt-2">
            Draw your signature below and save or download it
          </p>
        </div>

        <div className="p-6 md:p-8">
          {/* Signature Canvas */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Draw your signature
              </h2>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">
                  Pen Color:
                </label>
                <input
                  type="color"
                  value={penColor}
                  onChange={(e) => setPenColor(e.target.value)}
                  className="w-8 h-8 p-0 border rounded cursor-pointer shadow-sm"
                />
              </div>
            </div>

            <div className="w-full shadow-lg rounded-xl bg-white border border-gray-200 overflow-hidden">
              <div className="p-4">
                <SignatureCanvas
                  ref={sigCanvas}
                  penColor={penColor}
                  canvasProps={{
                    width: 500,
                    height: 200,
                    className:
                      "border-2 border-dashed border-gray-300 rounded-lg shadow-inner bg-gray-50 w-full",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-4 items-center justify-center mb-8">
            <button
              onClick={clear}
              className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition flex items-center shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Clear
            </button>

            <button
              onClick={save}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-md transition flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              Save
            </button>

            <button
              onClick={download}
              disabled={!imageURL}
              className={`px-5 py-2.5 rounded-xl font-medium shadow-md transition flex items-center ${
                imageURL
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download
            </button>
          </div>

          {/* Saved Signature Preview */}
          {imageURL && (
            <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-lg font-semibold text-gray-800">
                  Signature Saved Successfully!
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-white p-3 rounded-lg border shadow-sm">
                  <img
                    src={imageURL}
                    alt="signature"
                    className="max-w-full h-auto max-h-32"
                  />
                </div>

                <div className="text-center md:text-left">
                  <p className="text-gray-600 mb-3">
                    Your signature is ready to download
                  </p>
                  <button
                    onClick={download}
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition text-sm"
                  >
                    Download PNG Image
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="bg-gray-100 p-4 text-center text-sm text-gray-500">
          Draw your signature using mouse or touch screen
        </div>
      </div>
    </div>
  );
}
