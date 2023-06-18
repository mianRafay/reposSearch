import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import styles from './index.scss';

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div className={styles.error}>
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    );
}

const myErrorHandler = (error: Error, info: { componentStack: string }) => {
    console.log('error', error.stack);
    console.log('error message', error.message);
    console.log('componentStack', info.componentStack);
};

export default function ErrorBoundary(props: { component: any }) {
    const { component } = props;
    return (
        <ReactErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
            {component}
        </ReactErrorBoundary>
    );
}
