function ErrorDisplay({ error }) {
  return error ? (
    <p className="text-red-500 text-center mb-4">{error}</p>
  ) : null;
}

export default ErrorDisplay;
