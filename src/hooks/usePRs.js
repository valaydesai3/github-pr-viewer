import { useQuery } from '@tanstack/react-query';

const fetchPRs = async (page) => {
    const response = await fetch(`http://localhost:5000/api/prs?page=${page}`);
    if (!response.ok) throw new Error("Failed to fetch PRs");
    return response.json();
}

export const usePRs = (page) => {
    return useQuery({
        queryKey: ["pullRequests", page],
        queryFn: () => fetchPRs(page),
        keepPreviousData: true
    });
};