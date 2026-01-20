import { useEffect, useReducer, useRef } from "react";
import { initialState, uploadReducer } from "./Machine.uploader";
import type { Chunk } from "./StateMachine.uploader";
import { CreateChunks } from "./utils.uploader";
import { mockServer } from "../mock/MockServer";

export function useUploader() {
    const [state, dispatch] = useReducer(uploadReducer, initialState)
    const pauseRef = useRef(false);

    async function selectFile(file : File){
        const chunks : Chunk[] = await CreateChunks(file);
        dispatch({type : "SELECT_FILE",file, chunks})
    }

    useEffect(()=>{
        if (state.status != "uploading") {
            return
        }
        pauseRef.current = false;
        async function runUpload() {
            if (!state.file) {
                return
            }
            for (let i = state.current; i < state.chunks.length; i++) {
                if (pauseRef.current) {
                    return
                }
                const chunk = state.chunks[i];
                try {
                    await mockServer(chunk, state.file);
                    dispatch({type : "PROGRESS", index : i+1})
                } catch (error : unknown) {
                    const message = error instanceof Error ? error.message : "Unknown error";
                    dispatch({type : "ERROR", message})
                    return;
                }
            }
            dispatch({type: "COMPLETE"});
        }
        runUpload();
    },[state.status, state.current, state.file, state.chunks])

    function start() {
        if (state.status == "ready" || state.status == "paused") {
            dispatch({type : "START"})
        }
    }
    function pause() {
        pauseRef.current = true;
        dispatch({type : "PAUSE"})
    }
    function resume() {
        pauseRef.current = false;
        dispatch({type : "RESUME"})
    }

    function reset() {
        dispatch({type : "RESET"})
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