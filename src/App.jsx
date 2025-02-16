import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import './App.css'

const fetchPRs = async (page) => {
  const response = await fetch(`http://localhost:5000/api/prs?page=${page}`)
  if (!response.ok) throw new Error("Failed to fetch PRs");
  return response.json();
}

function App() {
  const [page, setPage] = useState(1)
  const [selectedLabel, setSelectedLabel] = useState(null);

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["pullRequests", page],
    queryFn: () => fetchPRs(page),
    keepPreviousData: true
  })

  const prs = data?.prs || [];

  // Filter PRs based on selected label
  const filteredPRs = selectedLabel
    ? prs.filter(pr => pr.labels.some(label => label.name.toLowerCase() === selectedLabel.toLowerCase()))
    : prs;

  // Function to determine text color based on background color brightness
  const getTextColor = (bgColor) => {
    if (!bgColor) return "#000"; // Default to black if no color is provided

    // Convert hex to RGB
    const hex = bgColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate brightness (YIQ algorithm)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? "#000" : "#fff"; // Use black text for bright colors, white text for dark colors
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTooltip = (dateString) => {
    return new Date(dateString).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    });
  };

  const PRList = ({ pullRequests }) => {
    return (
      <div className="pr-list">
        {pullRequests.map((pr) => (
          <div key={pr.id} className="pr-card">
            <a href={pr.url} className="pr-title-link">
              <div className="pr-title">{pr.title}</div>
            </a>
            <div className="pr-details">
              <span className="pr-number">#{pr.number}</span>
              <span
                className="pr-date"
                title={formatTooltip(pr.created_at)}
              >
                {" opened on " + formatDate(pr.created_at)}
              </span>
              <span className="pr-author"> by {pr.author}</span>
            </div>
            <div className="pr-labels">
              {pr.labels.map((label) => (
                <span key={label.name}
                  className='label'
                  title={label.description}
                  style={{ backgroundColor: label.color, color: getTextColor(label.color) }}
                  onClick={() => setSelectedLabel(label.name)}
                >
                  {label.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>GitHub PR Viewer</h1>

      {isLoading && <p>Loading PRs...</p>}
      {isError && <p>Error: {error.message}</p>}

      {selectedLabel && (
        <div className="filter-bar">
          <span>Filtering by: <strong>{selectedLabel}</strong></span>
          <button className="clear-filter" onClick={() => setSelectedLabel(null)}>✖ Clear Filter</button>
        </div>
      )}

      <PRList pullRequests={filteredPRs} />

      <div className="pagination">
        <button disabled={isFetching || !data?.hasPrevPage} onClick={() => setPage(prev => prev - 1)}>
          Previous
        </button>
        <span> Page {page} </span>
        <button disabled={isFetching || !data?.hasNextPage} onClick={() => setPage(prev => prev + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}

export default App
