const Pagination = ({ page, setPage, hasNextPage, hasPrevPage, isFetching }) => {
    return (
        <div className="pagination">
            <button disabled={isFetching || !hasPrevPage} onClick={() => setPage((prev) => prev - 1)}>
                Previous
            </button>
            <span> Page {page} </span>
            <button disabled={isFetching || !hasNextPage} onClick={() => setPage((prev) => prev + 1)}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
