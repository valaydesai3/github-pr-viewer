import { useQuery } from '@tanstack/react-query';
import config from '../config';

const fetchPRs = async (page) => {
    try {
        const response = await fetch(`${config.apiUrl}/api/prs?page=${page}`);
        if (!response.ok) throw new Error(`Server Error: ${response.status} ${response.statusText}`);
        return response.json();
    } catch (error) {
        throw new Error(error.message.includes("Failed to fetch")
            ? "Network error: Please check your connection."
            : error.message
        );
    }
}

export const usePRs = (page) => {
    return useQuery({
        queryKey: ["pullRequests", page],
        queryFn: () => fetchPRs(page),
        keepPreviousData: true
    });
};