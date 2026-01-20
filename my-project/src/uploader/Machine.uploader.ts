import type { UploadStatus, Chunk } from "./StateMachine.uploader";

export type UploadState = {
    file : File | null,
    chunks : Chunk[],
    current : number,
    status : UploadStatus,
    error? : string,
}

export type UploadAction = 
    | { type: "SELECT_FILE"; file: File; chunks: Chunk[] }
    | { type: "START" }
    | { type: "PAUSE" }
    | { type: "RESUME" }
    | { type: "PROGRESS"; index: number }
    | { type: "ERROR"; message: string }
    | { type: "COMPLETE" }
    | { type: "RESET" };

export const initialState : UploadState = {
    file : null,
    chunks : [],
    current : 0,
    status : "idle"
}

export function uploadReducer(state : UploadState, action : UploadAction) : UploadState {
    console.log("action in machine uploader",action)
    switch(action.type){
        case "SELECT_FILE":
            return {
                file : action.file,
                chunks : action.chunks,
                current : 0,
                status : "ready"
            }
        case "START":
            return {...state, status : "uploading"}
        case "PAUSE":
            return {...state, status : "paused"}
        case "RESUME":
            return {...state, status : "uploading"}
        case "PROGRESS":
            return {...state, current : action.index}
        case "ERROR":
            return {...state, status : "error", error : action.message}
        case "COMPLETE":
            return {...state, status : "completed"}
        case "RESET":
            return {...initialState};
        default :
            return state;
    }
}