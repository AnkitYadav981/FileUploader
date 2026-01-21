import { useEffect, useReducer, useRef } from "react";
import { initialState, uploadReducer } from "./Machine.uploader";
import type { Chunk } from "./State.uploader";
import { CreateChunks } from "./utils.uploader";
import { mockServer } from "../mock/MockServer";

export function useUploader() {
    const [state, dispatch] = useReducer(uploadReducer, initialState)
    const pauseRef = useRef(false);

    async function selectFile(file : File){
        const chunks : Chunk[] = await CreateChunks(file);
        dispatch({type : "SelectFile",file, chunks})
    }

    useEffect(()=>{
        if (state.status != "uploading") {
            console.log("not able to upload")
            return
        }
        pauseRef.current = false;
        async function runUpload() {
            if (!state.file) {
                console.log("no file")
                return
            }
            for (let i = state.current; i < state.chunks.length; i++) {
                if (pauseRef.current) {
                    return
                }
                const chunk = state.chunks[i];
                try {
                    await mockServer(chunk, state.file);
                    dispatch({type : "UploadingProgres", index : i+1})
                } catch (error : unknown) {
                    dispatch({type : "Err", message : error as string})
                    return;
                }
            }
            dispatch({type: "Completed"});
        }
        runUpload();
    },[state.status, state.current, state.file, state.chunks])

    function start() {
        if (state.status == "ready" || state.status == "paused") {
            console.log("start")
            dispatch({type : "UploadStart"})
        }
    }
    function pause() {
        pauseRef.current = true;
        dispatch({type : "Pause"})
    }
    function resume() {
        pauseRef.current = false;
        dispatch({type : "Resume"})
    }

    function reset() {
        dispatch({type : "Reset"})
    }

    const progress = state.chunks.length == 0 ? 0 : Math.round((state.current / state.chunks.length) * 100)

    return {
        state,
        start,
        pause,
        resume,
        reset,
        selectFile,
        progress
    }
}