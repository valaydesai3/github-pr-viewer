/* eslint-disable no-undef */

import { render, screen } from "@testing-library/react";
import ErrorMessage from "../../components/ErrorMessage";

describe("ErrorMessage Component", () => {
  test("renders error message correctly", () => {
    const errorMsg = "Network error: Failed to fetch";
    render(<ErrorMessage message={errorMsg} />);

    const alertBox = screen.getByRole("alert");
    expect(alertBox).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Something went wrong");
    expect(alertBox).toHaveTextContent(/We couldn't fetch the PRs right now/i);
    expect(screen.getByLabelText("Error Details")).toHaveTextContent(`Error: ${errorMsg}`);
  });

  test("renders default error message if no message is provided", () => {
    render(<ErrorMessage />);

    const alertBox = screen.getByRole("alert");
    expect(alertBox).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Something went wrong");
    expect(alertBox).toHaveTextContent(/We couldn't fetch the PRs right now/i);
    expect(screen.getByLabelText("Error Details")).toHaveTextContent("Error: Unknown error");
  });
});
