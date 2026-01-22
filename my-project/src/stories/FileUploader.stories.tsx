import type { Meta, StoryObj } from "@storybook/react";


import { FileUploader } from "../uploader/FileUploader.uploader";
import type { UploadState } from "../uploader/Machine.uploader";

const meta: Meta<typeof FileUploader> = {
  title: "Uploader/FileUploader",
  component: FileUploader,
};

export default meta;
type Story = StoryObj<typeof FileUploader>;
// 🔹 Real working uploader (no override)
export const LiveUploader: Story = {
  render: () => <FileUploader />,
};

function mockOverride(state: UploadState) {
  return {
    state,
    start: () => {},
    pause: () => {},
    resume: () => {},
    reset: () => {},
    selectFile: () => {},
    progress:
      state.chunks.length === 0
        ? 0
        : Math.round((state.current / state.chunks.length) * 100),
  };
}

const fakeChunks = Array.from({ length: 10 }, (_, i) => ({
  index: i,
  start: i * 100,
  end: (i + 1) * 100,
  status: "uploading",
  checkSum: "abc123",
  uploaded: i < 3,
}));

// 🔹 IDLE
export const Idle: Story = {
  render: () => (
    <FileUploader
      override={mockOverride({
        file: null,
        chunks: [],
        current: 0,
        status: "idle",
      })}
    />
  ),
};

// 🔹 READY
export const Ready: Story = {
  render: () => (
    <FileUploader
      override={mockOverride({
        file: {} as File,
        chunks: fakeChunks,
        current: 0,
        status: "ready",
      })}
    />
  ),
};

// 🔹 UPLOADING
export const Uploading: Story = {
  render: () => (
    <FileUploader
      override={mockOverride({
        file: {} as File,
        chunks: fakeChunks,
        current: 4,
        status: "uploading",
      })}
    />
  ),
};

// 🔹 PAUSED
export const Paused: Story = {
  render: () => (
    <FileUploader
      override={mockOverride({
        file: {} as File,
        chunks: fakeChunks,
        current: 5,
        status: "paused",
      })}
    />
  ),
};

// 🔹 RETRYING
export const Retrying: Story = {
  render: () => (
    <FileUploader
      override={mockOverride({
        file: {} as File,
        chunks: fakeChunks.map((c, i) => ({
          ...c,
          status: i === 4 ? "retrying" : c.status,
        })),
        current: 4,
        status: "retrying",
      })}
    />
  ),
};

// 🔹 ERROR
export const ErrorState: Story = {
  render: () => (
    <FileUploader
      override={mockOverride({
        file: {} as File,
        chunks: fakeChunks,
        current: 3,
        status: "error",
        error: "Chunk upload failed at index 3",
      })}
    />
  ),
};

// 🔹 COMPLETED
export const Completed: Story = {
  render: () => (
    <FileUploader
      override={mockOverride({
        file: {} as File,
        chunks: fakeChunks,
        current: 10,
        status: "completed",
      })}
    />
  ),
};