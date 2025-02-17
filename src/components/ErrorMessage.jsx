const ErrorMessage = ({ message }) => {
    return (
        <div className="error-container" role="alert" aria-live="assertive" tabIndex="0">
            <h2>Something went wrong</h2>
            <p>We couldn't fetch the PRs right now. Please try again later.</p>
            <code aria-label="Error Details">Error: {message || "Unknown error"}</code>
        </div>
    );
};

export default ErrorMessage;
