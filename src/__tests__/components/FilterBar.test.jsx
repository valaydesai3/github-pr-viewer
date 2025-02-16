import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "../../components/FilterBar";

test("renders filter bar with selected label", () => {
  render(<FilterBar selectedLabel="bug" onClearFilter={vi.fn()} />);
  expect(screen.getByText(/Filtering by:/)).toBeInTheDocument();
  expect(screen.getByText(/bug/)).toBeInTheDocument();
});

test("calls onClearFilter when clear button is clicked", () => {
  const mockClearFilter = vi.fn();
  render(<FilterBar selectedLabel="bug" onClearFilter={mockClearFilter} />);

  fireEvent.click(screen.getByText(/✖ Clear Filter/));
  expect(mockClearFilter).toHaveBeenCalledTimes(1);
});

test("does not render when no filter is selected", () => {
  const { container } = render(<FilterBar selectedLabel={null} onClearFilter={vi.fn()} />);
  expect(container.firstChild).toBeNull();
});
