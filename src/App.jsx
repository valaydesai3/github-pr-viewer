import { useState, useMemo } from 'react';
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
      <main role='main'>
        <h1 tabIndex="0" aria-label="GitHub Pull Request Viewer">GitHub PR Viewer</h1>
        {isLoading && (
          <div className="loading-container" role="status" aria-live="polite">
            <div className="spinner" aria-hidden="true"></div>
            <p>Loading PRs...</p>
          </div>
        )}
        {isError && <ErrorMessage message={error.message} role="alert" />}
        <section>
          {!isLoading && !isError && (
            <>
              <FilterBar selectedLabel={selectedLabel} onClearFilter={() => setSelectedLabel(null)} />
              <PRList pullRequests={filteredPRs} setSelectedLabel={setSelectedLabel} />
              {(prs.length > 0 || hasPrevPage) && !selectedLabel && (
                <nav aria-label="Pagination Navigation">
                  <Pagination
                    page={page}
                    setPage={setPage}
                    hasNextPage={data.hasNextPage}
                    hasPrevPage={data.hasPrevPage}
                    isFetching={isFetching}
                  />
                </nav>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  )
}

export default App;
