
import type { Chunk } from "../uploader/StateMachine.uploader";

type ServerRecord = {
    uploaded : Set<number>,
    checkSum : Map<number, string>
}

const serverDB = new Map<string, ServerRecord>()

function wait(ms : number) {
    return new Promise(res => setTimeout(res,ms));
}

export async function mockServer(chunk : Chunk, file : File, failedAt? : number) : Promise<void> {
    await wait(500);
    const fileID = `${file.name} - ${file.size}`
    console.log("fileId before serverDB",fileID)
    if(!serverDB.has(fileID)){
        serverDB.set(fileID, {uploaded : new Set(), checkSum : new Map()});
    }
    const record = serverDB.get(fileID)
    console.log("record", record)

    if (failedAt == chunk.index) {
        throw new Error("Network Error at Mock Server")
    }
    const existing = record?.checkSum.get(chunk.index);
    if (existing && existing != chunk.checkSum ) {
        throw new Error("CheckSum mismatch at Mock Server")
    }
    record?.checkSum.set(chunk.index, chunk.checkSum);
    record?.uploaded.add(chunk.index);
}
export function resetMockServer() {
    serverDB.clear();
}