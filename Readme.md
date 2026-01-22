# Chunked File Uploader (React + TypeScript)

A reusable, accessible, and resumable file uploader built with **React 18**, **TypeScript (strict mode)**, and **Tailwind CSS**.

This component demonstrates a production-style upload system using:

- Chunked uploads
- Finite state machine with `useReducer`
- Pause / Resume capability
- Per-chunk progress tracking
- Drag & drop support
- Mock server integration (can be replaced with real API)
- Clean separation of UI and upload logic

---

## ✨ Features

- Drag and drop file selection
- Keyboard accessible upload area
- Chunked file processing
- Upload pause and resume
- Real-time progress bar
- Error handling and reset flow
- Fully typed state machine
- Easy to integrate into any React project

---

## 📁 Project Structure

STORYBOOK/
├─ my-project/
├─ src/
├─ uploader/
├─ FileUploader.uploader.tsx          # UI Component
├─ useFileUploader.ts            # Upload logic hook
├─ Machine.uploader.ts       # Reducer & state machine
├─ State.uploader.ts  # Types (Chunk, UploadStatus)
├─ utils.uploader.ts         # Chunk creation utility


---

## 🚀 How It Works

Upload flow is modeled as a **state**:

idle → ready → uploading → paused → completed / error

Each file is split into chunks.  
Each chunk is uploaded sequentially and progress is tracked using the reducer.

A `useRef` is used to safely pause the async upload loop without causing re-renders.

---

## 🧩 FileUploader API

### Usage

```tsx
<FileUploader />

Action              Description
SelectFile          Splits file into chunks
UploadStart         Starts upload process
Pause               Pauses upload safely
Resume              Resumes from last successful chunk
Reset               Clears state

---

🧪 Running the Project

cd my-project
npm install
npm run dev

🧪 Running Tests

npm run test

---

📚 Storybook

A live interactive Storybook is available to test all states of the uploader component.

[text](https://696fce7e9acb3716f65c1357-tjijbqznhy.chromatic.com/)