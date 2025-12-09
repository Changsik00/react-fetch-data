import type { FallbackProps } from 'react-error-boundary';
import { ZodError } from 'zod';
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
  } else if (error instanceof ZodError) {
    title = 'Validation Error';
    message = 'Data received from server does not match expected format.';
    console.error('Zod Validation Errors:', JSON.stringify(error.format(), null, 2));
  }

  return (
    <div style={{ padding: '20px', border: '1px solid red', borderRadius: '8px', color: 'red' }}>
      <h2>{title}</h2>
      <p>{message}</p>
      {error instanceof ZodError && (
        <pre style={{ fontSize: '10px', overflowX: 'auto' }}>
            {JSON.stringify(error.format(), null, 2)}
        </pre>
      )}
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}
