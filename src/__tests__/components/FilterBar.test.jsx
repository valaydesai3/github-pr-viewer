import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "../../components/FilterBar";

describe("FilterBar Component", () => {
  test("renders filter bar with selected label", () => {
    render(<FilterBar selectedLabel="bug" onClearFilter={vi.fn()} />);
    expect(screen.getByText(/Filtering by:/i)).toBeInTheDocument();
    expect(screen.getByText(/bug/i)).toHaveClass("filter-badge");
    expect(screen.getByText(/Pagination is disabled while filtering/i)).toBeInTheDocument();
  });

  test("calls onClearFilter when clear button is clicked", () => {
    const mockClearFilter = vi.fn();
    render(<FilterBar selectedLabel="bug" onClearFilter={mockClearFilter} />);
    const clearButton = screen.getByRole("button", { name: /Clear filter for bug/i });
    fireEvent.click(clearButton);
    expect(mockClearFilter).toHaveBeenCalledTimes(1);
  });

  test("does not render when no filter is selected", () => {
    const { container } = render(<FilterBar selectedLabel={null} onClearFilter={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  test("ensures filter announcement with aria-live", () => {
    const { rerender } = render(<FilterBar selectedLabel="bug" onClearFilter={vi.fn()} />);
    const statusElement = screen.getByRole("status");
    expect(statusElement).toHaveAttribute("aria-live", "polite");
    rerender(<FilterBar selectedLabel="enhancement" onClearFilter={vi.fn()} />);
    expect(screen.getByText(/Filtering by:/i)).toHaveTextContent("Filtering by: enhancement");
  });
});
