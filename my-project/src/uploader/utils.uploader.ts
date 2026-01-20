import type { Chunk } from "./StateMachine.uploader";

export const ChunkSize = 1024*1024; // this defines 1MB

async function checkSum(blob : Blob) : Promise<string> {
    const buffer = await blob.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2,"0")).join("");

}

export async function CreateChunks(file : File): Promise<Chunk[]> {
    const chunks : Chunk[] = [];

    let index = 0;
    let start = 0;
    while (start < file.size) {
        const end = Math.min(start + ChunkSize, file.size);
        const chunk = file.slice(start, end);
        chunks.push({
            index ,
            start,
            end,
            uploaded : false,
            status : "idle",
            checkSum : await checkSum(chunk)
        })
        
        start += ChunkSize;
        index++;
    }


    return chunks;
}