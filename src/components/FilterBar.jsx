import PropTypes from "prop-types";

const FilterBar = ({ selectedLabel, onClearFilter }) => {
    if (!selectedLabel) return null; // Don't render if no filter is selected

    return (
        <div className="filter-bar" role="status" aria-live="polite">
            <span>
                Filtering by: <span className="filter-badge">{selectedLabel}</span>
            </span>
            <button className="clear-filter" onClick={onClearFilter} aria-label={`Clear filter for ${selectedLabel}`}>
                Clear Filter
            </button>
            <p className="pagination-disabled">
                Pagination is disabled while filtering. Clear Filter to navigate pages.
            </p>
        </div>
    );
};

FilterBar.propTypes = {
    selectedLabel: PropTypes.string,
    onClearFilter: PropTypes.func.isRequired,
};

export default FilterBar;
