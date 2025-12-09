import { useState, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { UserProfile } from './components/UserProfile'
import { ErrorFallback } from './components/ErrorFallback'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'

function App() {
  const [userId, setUserId] = useState(1);
  const { reset } = useQueryErrorResetBoundary();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>React Data Fetching Pattern</h1>
      <p>Ky + Tanstack Query + Repository Pattern</p>
      
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setUserId(1)}>User 1</button>
        <button onClick={() => setUserId(2)} style={{ marginLeft: '8px' }}>User 2</button>
        <button onClick={() => setUserId(99999)} style={{ marginLeft: '8px' }}>User 99999 (Error)</button>
      </div>

      <ErrorBoundary 
        onReset={reset}
        fallbackRender={ErrorFallback}
        resetKeys={[userId]} // Reset error boundary when userId changes
      >
        <Suspense fallback={<div>Loading User...</div>}>
          <UserProfile userId={userId} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default App
