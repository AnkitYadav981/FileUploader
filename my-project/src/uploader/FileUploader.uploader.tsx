import React, { useRef } from "react";
import { useUploader } from "./useFileUploader";


export function FileUploader() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const {state,start,pause,resume,reset,selectFile,progress} = useUploader();

    function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) {
            return
        }
        selectFile(file)
    }
    function openFilePicker() {
        inputRef.current?.click();
    }

    function onKeyDown(e : React.KeyboardEvent<HTMLDivElement>) {
        if (e.key == "Enter" || e.key == " ") {
            e.preventDefault();
            openFilePicker();
        }
    }
    return (<div className="max-w-md p-4 border rounded">

        <input type="file" ref={inputRef} className="hidden" onChange={onFileChange}/>
        <div
        role="button"
        tabIndex={0}
        onClick={openFilePicker}
        onKeyDown={onKeyDown}
        className="cursor-pointer rounded border-2 border-dashed p-6 text-center focus:outline-none focus:ring"
        >
            <p className="text-sm text-gray-600">Click or press enter to select file</p>
        </div>
        <div className=" gap-2">
            {state.status == "ready" && (
                    <button 
                    onClick={start}
                    className="w-full  px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
                    >
                        Start Upload
                    </button>
                )
            }
            {state.status == "uploading" && (
                <button 
                onClick={pause}
                className="w-full rounded bg-yellow-500 px-4 py-2 text-white"
                >
                    Pause
                </button>
            )}
            {state.status == "paused" && (
                <button 
                onClick={resume}
                className="w-full rounded bg-green-600 px-4 py-2 text-white"
                >
                    Resume
                </button>
            )}
            {(state.status == "completed" || state.status == "error") && (
                <button 
                onClick={reset}
                className="w-full rounded bg-gray-400 px-4 py-2 text-white"
                >
                    Reset
                </button>
            )}
            {/* Progress Bar */}
            <div className="h-2 w-full overflow-hidden rounded bg-gray-200">
                <div
                className="h-full bg-green-600 transition-all"
                style={{ width: `${progress}%` }}
                />
            </div>

            {/* Screen reader announcements */}
            <div aria-live="polite" className="sr-only">
                Upload progress {progress} percent
            </div>

            {/* Error Message */}
            {state.status === "error" && (
                <p className="text-sm text-red-600">
                Upload failed: {state.error}
                </p>
            )}

            {/* Completion Message */}
            {state.status === "completed" && (
                <p className="text-sm text-green-600">
                Upload completed successfully
                </p>
            )}
            </div>
    </div> 
    );


}

