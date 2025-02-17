import PRCard from "./PRCard";

const PRList = ({ pullRequests, setSelectedLabel }) => {
  return (
    <div className="pr-list" aria-label="List of Pull Requests">
      {pullRequests.map((pr) => (
        <PRCard key={pr.id} pr={pr} setSelectedLabel={setSelectedLabel} />
      ))}
    </div>
  );
};

export default PRList;
