import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../../components/Pagination";

describe("Pagination Component", () => {
    test("disables Previous button on first page", () => {
        render(<Pagination page={1} setPage={vi.fn()} hasNextPage={true} hasPrevPage={false} isFetching={false} />);
        expect(screen.getByRole("button", { name: /Go to previous page/i })).toBeDisabled();
    });

    test("enables Next button if more pages exist and updates page state", () => {
        const mockSetPage = vi.fn();
        render(<Pagination page={1} setPage={mockSetPage} hasNextPage={true} hasPrevPage={false} isFetching={false} />);

        const nextButton = screen.getByRole("button", { name: /Go to next page/i });
        fireEvent.click(nextButton);

        expect(mockSetPage).toHaveBeenCalledTimes(1);
        expect(mockSetPage).toHaveBeenCalledWith(expect.any(Function));
    });

    test("disables Next button if no more pages exist", () => {
        render(<Pagination page={1} setPage={vi.fn()} hasNextPage={false} hasPrevPage={true} isFetching={false} />);
        expect(screen.getByRole("button", { name: /Go to next page/i })).toBeDisabled();
    });

    test("disables both buttons when fetching", () => {
        render(<Pagination page={2} setPage={vi.fn()} hasNextPage={true} hasPrevPage={true} isFetching={true} />);
        expect(screen.getByRole("button", { name: /Go to previous page/i })).toBeDisabled();
        expect(screen.getByRole("button", { name: /Go to next page/i })).toBeDisabled();
    });

    test("announces the current page with aria-live", () => {
        render(<Pagination page={3} setPage={vi.fn()} hasNextPage={true} hasPrevPage={true} isFetching={false} />);

        const pageIndicator = screen.getByText(/Page 3/i);
        expect(pageIndicator).toHaveAttribute("aria-live", "polite");
        expect(pageIndicator).toHaveAttribute("aria-atomic", "true");
    });
});
