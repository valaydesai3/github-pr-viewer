import { formatDate, formatTooltip } from "../utils/formatDate";
import { getTextColor } from "../utils/getTextColor";

const PRCard = ({ pr, setSelectedLabel }) => {
  return (
    <div className="pr-card">
      <a href={pr.url} className="pr-title-link">
        <div className="pr-title">{pr.title}</div>
      </a>
      <div className="pr-details">
        <span className="pr-number">#{pr.number}</span>
        <span className="pr-date" title={formatTooltip(pr.created_at)}>
          {" opened on " + formatDate(pr.created_at)}
        </span>
        <span className="pr-author"> by {pr.author}</span>
      </div>
      <div className="pr-labels">
        {pr.labels.map((label) => (
          <span
            key={label.name}
            className="label"
            title={label.description}
            style={{ backgroundColor: label.color, color: getTextColor(label.color) }}
            onClick={() => setSelectedLabel(label.name)}
          >
            {label.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PRCard;
