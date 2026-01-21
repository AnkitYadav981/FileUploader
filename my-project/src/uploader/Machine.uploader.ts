import type { UploadStatus, Chunk } from "./State.uploader";



export type PossibleActions = 
    | { type: "SelectFile"; file: File; chunks: Chunk[] }
    | { type: "UploadStart" }
    | { type: "Pause" }
    | { type: "Resume" }
    | { type: "UploadingProgres"; index: number }
    | { type: "Err"; message: string }
    | { type: "Completed" }
    | { type: "Reset" };

export type UploadState = {
    file : File | null,
    chunks : Chunk[],
    current : number,
    status : UploadStatus,
    error? : string,
}
// This is the first state
export const initialState : UploadState = {
    file : null,
    chunks : [],
    current : 0,
    status : "idle"
}

//uploader
export function uploadReducer(state : UploadState, action : PossibleActions) : UploadState {
    console.log("action in machine uploader",action)
    switch(action.type){
        case "SelectFile":
            return {
                file : action.file,
                chunks : action.chunks,
                current : 0,
                status : "ready"
            }
        case "UploadStart":
            return {...state, status : "uploading"}
        case "Pause":
            return {...state, status : "paused"}
        case "Resume":
            return {...state, status : "uploading"}
        case "UploadingProgres":
            return {...state, current : action.index}
        case "Err":
            return {...state, status : "error", error : action.message}
        case "Completed":
            return {...state, status : "completed"}
        case "Reset":
            return {...initialState};
        default :
            return state;
    }
}