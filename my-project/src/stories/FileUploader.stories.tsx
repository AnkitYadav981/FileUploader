import type { Meta, StoryObj } from "@storybook/react";
import { FileUploader } from '../uploader/FileUploader.uploader';
import { resetMockServer } from "../mock/MockServer";

const meta : Meta<typeof FileUploader> ={
    component : FileUploader,
    title:"System/FileUploader",
    parameters: {
    layout: "centered",
    },
}

export default meta;
type Story = StoryObj<typeof FileUploader>;

export const Default: Story = {
  loaders: [
    async () => {
      resetMockServer();
      return {};
    },
  ],
  render: () => <FileUploader />,
};

