import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FileUploader } from "../uploader/FileUploader.uploader";
import { resetMockServer } from "../mock/MockServer";


/**
 * Helper to create a fake file
 */
function createFile(name = "test.txt", size = 1024 * 1024) {
  const blob = new Blob([new Array(size).fill("a").join("")], {
    type: "text/plain",
  });
  return new File([blob], name);
}

describe("FileUploader integration", () => {
  beforeEach(() => {
    resetMockServer();
  });

  test("allows file selection via keyboard", async () => {
    render(<FileUploader />);

    const dropzone = screen.getByRole("button", {
      name: /upload file/i,
    });

    dropzone.focus();
    fireEvent.keyDown(dropzone, { key: "Enter" });

    // We cannot open native file picker in tests,
    // so we directly trigger file input change
    const input = screen.getByRole("textbox", { hidden: true }) as HTMLInputElement;

    const file = createFile();
    fireEvent.change(input, {
      target: { files: [file] },
    });

    expect(screen.getByText(/start upload/i)).toBeInTheDocument();
  });

  test("uploads file and shows progress", async () => {
    render(<FileUploader />);

    const input = screen.getByLabelText(/upload file/i, {
      selector: "input",
    }) as HTMLInputElement;

    const file = createFile();
    fireEvent.change(input, {
      target: { files: [file] },
    });

    fireEvent.click(screen.getByText(/start upload/i));

    await waitFor(() => {
      expect(screen.getByText(/upload completed/i)).toBeInTheDocument();
    });
  });

  test("shows error when upload fails", async () => {
    render(<FileUploader />);

    const input = screen.getByLabelText(/upload file/i, {
      selector: "input",
    }) as HTMLInputElement;

    const file = createFile("fail.txt");
    fireEvent.change(input, {
      target: { files: [file] },
    });

    fireEvent.click(screen.getByText(/start upload/i));

    await waitFor(() => {
      expect(screen.getByText(/upload failed/i)).toBeInTheDocument();
    });
  });

  test("pause and resume work correctly", async () => {
    render(<FileUploader />);

    const input = screen.getByLabelText(/upload file/i, {
      selector: "input",
    }) as HTMLInputElement;

    const file = createFile("pause.txt", 5 * 1024 * 1024);
    fireEvent.change(input, {
      target: { files: [file] },
    });

    fireEvent.click(screen.getByText(/start upload/i));

    fireEvent.click(await screen.findByText(/pause/i));
    expect(screen.getByText(/resume/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/resume/i));

    await waitFor(() => {
      expect(screen.getByText(/upload completed/i)).toBeInTheDocument();
    });
  });
});
