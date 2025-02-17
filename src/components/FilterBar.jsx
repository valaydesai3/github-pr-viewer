const FilterBar = ({ selectedLabel, onClearFilter }) => {
    if (!selectedLabel) return null; // Don't render if no filter is selected

    return (
        <div className="filter-bar" role="status" aria-live="polite">
            <span>
                Filtering by: <strong>{selectedLabel}</strong>
            </span>
            <button className="clear-filter" onClick={onClearFilter} aria-label={`Clear filter for ${selectedLabel}`}>
                ✖ Clear Filter
            </button>
        </div>
    );
};

export default FilterBar;
