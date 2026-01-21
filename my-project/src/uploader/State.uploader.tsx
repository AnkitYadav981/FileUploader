export type UploadStatus = "idle" | "ready" | "uploading" | "paused" | "retrying" | "error" | "completed"

export type Chunk = {
    index : number,
    start : number,
    end : number,
    status : UploadStatus,
    checkSum : string,
    uploaded : boolean
}