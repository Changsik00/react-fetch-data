import type { FallbackProps } from 'react-error-boundary';
import { APIError, NetworkError, TimeoutError } from '../api/errors';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  let title = 'Something went wrong';
  let message = error.message;

  if (error instanceof NetworkError) {
    title = 'Connection Error';
    message = 'Please check your internet connection.';
  } else if (error instanceof TimeoutError) {
    title = 'Timeout';
    message = 'The server took too long to respond.';
  } else if (error instanceof APIError) {
    title = `Error ${error.status}`;
    message = error.message;
  }

  return (
    <div style={{ padding: '20px', border: '1px solid red', borderRadius: '8px', color: 'red' }}>
      <h2>{title}</h2>
      <p>{message}</p>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}
