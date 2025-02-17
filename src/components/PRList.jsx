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

export default PRList;
