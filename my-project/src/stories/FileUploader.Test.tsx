import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FileUploader } from "./FileUploader.uploader";

describe("FileUploader", () => {
  it("renders upload button", () => {
    render(<FileUploader />);

    // Look for the text inside your component
    const buttonText = screen.getByText(/click or press enter to select file/i);
    expect(buttonText).toBeInTheDocument();
  });
});
