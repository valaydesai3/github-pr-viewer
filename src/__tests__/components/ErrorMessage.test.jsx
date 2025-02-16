import { render, screen } from "@testing-library/react";
import ErrorMessage from "../../components/ErrorMessage";

describe("ErrorMessage Component", () => {
  test("renders error message correctly", () => {
    const errorMsg = "Network error: Failed to fetch";
    render(<ErrorMessage message={errorMsg} />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("We couldn't fetch the PRs right now. Please try again later.")).toBeInTheDocument();
    expect(screen.getByText(`Error: ${errorMsg}`)).toBeInTheDocument();
  });

  test("renders default error message if no message is provided", () => {
    render(<ErrorMessage />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("We couldn't fetch the PRs right now. Please try again later.")).toBeInTheDocument();
    expect(screen.getByText("Error: Unknown error")).toBeInTheDocument();
  });
});
