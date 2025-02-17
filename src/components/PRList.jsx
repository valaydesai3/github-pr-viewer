import PropTypes from "prop-types";
import PRCard from "./PRCard";

const PRList = ({ pullRequests, setSelectedLabel }) => {
  if (!pullRequests.length) {
    return (
      <div className="empty-state">
        <p>No PRs found.</p>
      </div>
    );
  }
  return (
    <div className="pr-list" aria-label="List of Pull Requests" role="list">
      {pullRequests.map((pr) => (
        <PRCard key={pr.id} pr={pr} setSelectedLabel={setSelectedLabel} />
      ))}
    </div>
  );
};

PRList.propTypes = {
  pullRequests: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSelectedLabel: PropTypes.func.isRequired,
};

export default PRList;
