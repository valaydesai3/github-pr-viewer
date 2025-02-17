/* eslint-disable no-undef */

import { render, screen, fireEvent } from '@testing-library/react';
import PRCard from '../../components/PRCard';

const mockPR = {
  id: 1,
  number: 101,
  title: 'Fix authentication issue',
  author: 'johndoe',
  url: 'https://github.com/example/pr/101',
  labels: [
    { name: 'bug', color: '#ff0000', description: 'Indicates a bug' },
    { name: 'enhancement', color: '#00ff00', description: 'Feature improvement' },
  ],
};

describe("PRCard Component", () => {
  test("renders PR details correctly", () => {
    render(<PRCard pr={mockPR} setSelectedLabel={() => {}} />);

    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View details of PR Fix authentication issue/i })).toHaveAttribute(
      "href",
      "https://github.com/example/pr/101"
    );
    expect(screen.getByText("#101")).toBeInTheDocument();
    expect(screen.getByText("by johndoe")).toBeInTheDocument();
  });

  test("renders PR labels with correct styles and accessibility attributes", () => {
    render(<PRCard pr={mockPR} setSelectedLabel={() => {}} />);

    const bugLabel = screen.getByText("bug");
    expect(bugLabel).toBeInTheDocument();
    expect(bugLabel).toHaveStyle({ backgroundColor: "#ff0000" });
    expect(bugLabel).toHaveAttribute("aria-label", "Filter by label bug");

    const enhancementLabel = screen.getByText("enhancement");
    expect(enhancementLabel).toBeInTheDocument();
    expect(enhancementLabel).toHaveStyle({ backgroundColor: "#00ff00" });
    expect(enhancementLabel).toHaveAttribute("aria-label", "Filter by label enhancement");
  });

  test("opens PR link when title is clicked", () => {
    render(<PRCard pr={mockPR} setSelectedLabel={() => {}} />);
    
    const titleLink = screen.getByRole("link", { name: /View details of PR Fix authentication issue/i });
    expect(titleLink).toHaveAttribute("href", "https://github.com/example/pr/101");
  });

  test("calls setSelectedLabel when a label is clicked", () => {
    const setSelectedLabelMock = vi.fn();
    render(<PRCard pr={mockPR} setSelectedLabel={setSelectedLabelMock} />);

    const bugLabel = screen.getByText("bug");
    fireEvent.click(bugLabel);

    expect(setSelectedLabelMock).toHaveBeenCalledTimes(1);
    expect(setSelectedLabelMock).toHaveBeenCalledWith("bug");
  });

  test("ensures PR number and author have correct accessibility labels", () => {
    render(<PRCard pr={mockPR} setSelectedLabel={() => {}} />);

    expect(screen.getByText("#101")).toHaveAttribute("aria-label", "Pull request number 101");
    expect(screen.getByText("by johndoe")).toHaveAttribute("aria-label", "Author johndoe");
  });

  test("ensures PR date tooltip is accessible", () => {
    render(<PRCard pr={mockPR} setSelectedLabel={() => {}} />);

    const dateElement = screen.getByText(/opened on/i);
    expect(dateElement).toHaveAttribute("title");
    expect(dateElement).toHaveAttribute("aria-label");
  });
});
