const ErrorMessage = ({ message }) => {
    return (
        <div className="error-container">
            <h2>Something went wrong</h2>
            <p>We couldn't fetch the PRs right now. Please try again later.</p>
            <code>Error: {message || "Unknown error"}</code>
        </div>
    );
};

export default ErrorMessage;
