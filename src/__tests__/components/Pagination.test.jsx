import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../../components/Pagination";

test("disables Previous button on first page", () => {
    render(<Pagination page={1} setPage={vi.fn()} hasNextPage={true} hasPrevPage={false} isFetching={false} />);
    expect(screen.getByText("Previous")).toBeDisabled();
});

test("enables Next button if more pages exist", () => {
    const mockSetPage = vi.fn();
    render(<Pagination page={1} setPage={mockSetPage} hasNextPage={true} hasPrevPage={false} isFetching={false} />);

    fireEvent.click(screen.getByText("Next"));
    expect(mockSetPage).toHaveBeenCalledTimes(1);
    expect(mockSetPage).toHaveBeenCalledWith(expect.any(Function));
});

test("disables Next button if no more pages exist", () => {
    render(<Pagination page={1} setPage={vi.fn()} hasNextPage={false} hasPrevPage={true} isFetching={false} />);
    expect(screen.getByText("Next")).toBeDisabled();
});
