import React, { useRef, useState } from "react";
import { useUploader } from "./useFileUploader";


export function FileUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const {
    state,
    start,
    pause,
    resume,
    reset,
    selectFile,
    progress,
  } = useUploader();
 // handles file selection
  function handleFileSelectFile(file?: File) {
    if (!file) return;
    selectFile(file);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleFileSelectFile(e.target.files?.[0]);
  }

  function openPicker() {
    fileInputRef.current?.click();
  }

  // here handles Drag & drop 
  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(true);
  }

  function handleDragLeave() {
    setDragActive(false);
  }
// handles when the file dragged and dropped
  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
    handleFileSelectFile(e.dataTransfer.files?.[0]);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter") {
      openPicker();
    }
  }

  return (
    <div className="max-w-md  border p-4">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleInputChange}
      />

      <div
        role="button"
        tabIndex={0}
        onClick={openPicker}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`cursor-auto flex items-center justify-center rounded border-2 p-6 text-center ${
          dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300"
        }`}
      >
        <p className="text-sm text-red-600">
          Click or drag a file here
        </p>
      </div>

      <div className="mt-3 space-y-2">
        {state.status === "ready" && (
          <button
            onClick={start}
            className="w-full  bg-blue-600 rounded text-white"
          >
            Start upload
          </button>
        )}

        {state.status === "uploading" && (
          <button
            onClick={pause}
            className="w-full rounded bg-yellow-500  text-white"
          >
            Pause
          </button>
        )}

        {state.status === "paused" && (
          <button
            onClick={resume}
            className="w-full rounded  text-white bg-green-600 "
          >
            Resume
          </button>
        )}

        {(state.status === "completed" || state.status === "error") && (
          <button
            onClick={reset}
            className=" bg-gray-400 w-full rounded text-white"
          >
            Reset
          </button>
        )}

        <div className="h-2 w-full overflow-hidden rounded bg-gray-200">
          <div
            className="h-full bg-green-600"
            style={{ width: `${progress}%` }}
          />
        </div>

        {state.status === "error" && (
          <p className="text-sm text-red-600">
            Upload failed: {state.error}
          </p>
        )}

        {state.status === "completed" && (
          <p className=" text-green-600 text-sm">
            Upload completed
          </p>
        )}
      </div>
    </div>
  );
}
