/* eslint-disable no-undef */

import { render, screen, fireEvent } from "@testing-library/react";
import PRList from "../../components/PRList";

const mockPRs = [
  {
    id: 1,
    number: 1,
    title: "Fix bug in authentication",
    author: "johndoe",
    url: "https://github.com/example/pr/1",
    labels: [{ name: "bug", color: "#ff0000" }],
  },
];

describe("PRList Component", () => {
  test("renders PRList with PR data", () => {
    render(<PRList pullRequests={mockPRs} setSelectedLabel={() => {}} />);

    expect(screen.getByRole("list", { name: /List of Pull Requests/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Fix bug in authentication/i })).toHaveAttribute(
      "href",
      "https://github.com/example/pr/1"
    );
  });

  test("calls setSelectedLabel when label is clicked", () => {
    const setSelectedLabelMock = vi.fn();

    render(<PRList pullRequests={mockPRs} setSelectedLabel={setSelectedLabelMock} />);

    const label = screen.getByText("bug");
    fireEvent.click(label);

    expect(setSelectedLabelMock).toHaveBeenCalledTimes(1);
    expect(setSelectedLabelMock).toHaveBeenCalledWith("bug");
  });

  test("displays 'No PRs found' when there are no pull requests", () => {
    render(<PRList pullRequests={[]} setSelectedLabel={() => {}} />);
    
    expect(screen.getByText(/No PRs found/i)).toBeInTheDocument();
  });

  test("ensures list has correct accessibility attributes", () => {
    render(<PRList pullRequests={mockPRs} setSelectedLabel={() => {}} />);
    
    const list = screen.getByRole("list", { name: /List of Pull Requests/i });
    expect(list).toHaveAttribute("aria-label", "List of Pull Requests");
  });
});
