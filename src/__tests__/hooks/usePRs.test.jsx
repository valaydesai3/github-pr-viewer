import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePRs } from '../../hooks/usePRs';

const createQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: { retry: false }, // Disable retries for testing
        },
    });

const wrapper = ({ children }) => (
    <QueryClientProvider client={createQueryClient()}>{children}</QueryClientProvider>
);

describe("usePRs hook", () => {
    afterEach(() => {
        vi.restoreAllMocks(); // Restore fetch after each test
    });

    test("fetches PRs successfully", async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([{ id: 1, title: "Test PR" }]),
            })
        );

        const { result } = renderHook(() => usePRs(1), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toEqual([{ id: 1, title: "Test PR" }]);
    });

    test("handles network failure", async () => {
        global.fetch = vi.fn(() => Promise.reject(new Error("Failed to fetch")));

        const { result } = renderHook(() => usePRs(1), { wrapper });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error.message).toBe("Network error: Please check your connection.");
    });
});
