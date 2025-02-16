import { useState } from 'react';
import { usePRs } from './hooks/usePRs';
import PRList from './components/PRList';
import Pagination from './components/Pagination';
import FilterBar from './components/FilterBar';
import ErrorMessage from './components/ErrorMessage';
import './App.css'

function App() {
  const [page, setPage] = useState(1)
  const [selectedLabel, setSelectedLabel] = useState(null);
  const { data, isLoading, isFetching, isError, error } = usePRs(page);
  const prs = data?.prs || [];

  const filteredPRs = selectedLabel
    ? prs.filter(pr => pr.labels.some(label => label.name.toLowerCase() === selectedLabel.toLowerCase()))
    : prs;

  return (
    <div className="App">
      <h1>GitHub PR Viewer</h1>
      {isLoading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading PRs...</p>
        </div>
      )}
      {isError && <ErrorMessage message={error.message} />}
      <FilterBar selectedLabel={selectedLabel} onClearFilter={() => setSelectedLabel(null)} />
      <PRList pullRequests={filteredPRs} setSelectedLabel={setSelectedLabel} />
      {!isError && prs.length > 0 && data?.hasNextPage && (
        <Pagination
          page={page}
          setPage={setPage}
          hasNextPage={data.hasNextPage}
          hasPrevPage={data.hasPrevPage}
          isFetching={isFetching}
        />
      )}
    </div>
  )
}

export default App;
