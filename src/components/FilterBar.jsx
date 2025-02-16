const FilterBar = ({ selectedLabel, onClearFilter }) => {
    if (!selectedLabel) return null; // Don't render if no filter is selected

    return (
        <div className="filter-bar">
            <span>
                Filtering by: <strong>{selectedLabel}</strong>
            </span>
            <button className="clear-filter" onClick={onClearFilter}>
                ✖ Clear Filter
            </button>
        </div>
    );
};

export default FilterBar;
