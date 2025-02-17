import PropTypes from "prop-types";
import { formatDate, formatTooltip } from "../utils/formatDate";
import { getTextColor } from "../utils/getTextColor";

const PRCard = ({ pr, setSelectedLabel }) => {
  return (
    <div className="pr-card" role="group">
      <a href={pr.url} className="pr-title-link" id={`pr-title-${pr.id}`} aria-label={`View details of PR ${pr.title}`}>
        <div className="pr-title">{pr.title}</div>
      </a>
      <div className="pr-details">
        <span className="pr-number" aria-label={`Pull request number ${pr.number}`}>#{pr.number}</span>
        <span className="pr-date" title={formatTooltip(pr.created_at)} aria-label={`Opened on ${formatDate(pr.created_at)}`}>
          {" opened on " + formatDate(pr.created_at)}
        </span>
        <span className="pr-author" aria-label={`Author ${pr.author}`}> by {pr.author}</span>
      </div>
      <div className="pr-labels">
        {pr.labels.map((label) => (
          <span
            key={label.name}
            className="label"
            title={label.description}
            style={{ backgroundColor: label.color, color: getTextColor(label.color) }}
            onClick={() => setSelectedLabel(label.name)}
            aria-label={`Filter by label ${label.name}`}
          >
            {label.name}
          </span>
        ))}
      </div>
    </div>
  );
};

PRCard.propTypes = {
  pr: PropTypes.shape({
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    labels: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        description: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  setSelectedLabel: PropTypes.func.isRequired,
};

export default PRCard;
