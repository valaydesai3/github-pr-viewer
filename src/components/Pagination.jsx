import PropTypes from "prop-types";

const Pagination = ({ page, setPage, hasNextPage, hasPrevPage, isFetching }) => {
    return (
        <div className="pagination">
            <button
                disabled={isFetching || !hasPrevPage}
                onClick={() => setPage((prev) => prev - 1)}
                aria-label={`Go to previous page, currently on page ${page}`}
            >
                Previous
            </button>
            <span aria-live="polite" aria-atomic="true"> Page {page} </span>
            <button
                disabled={isFetching || !hasNextPage}
                onClick={() => setPage((prev) => prev + 1)}
                aria-label={`Go to next page, currently on page ${page}`}
            >
                Next
            </button>
        </div>
    );
};

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    hasPrevPage: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
};

export default Pagination;
