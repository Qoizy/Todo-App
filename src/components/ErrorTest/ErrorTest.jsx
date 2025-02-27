import { useState } from 'react';
import BackToHome from '../BackToHome/BackToHome';
import './ErrorTest.css';

const ErrorTest = () => {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('This is a test error!');
  }

  return (
    <div className="error-test-page">
      <BackToHome />
      <div className="error-test">
        <h2>Error Boundary Test Page</h2>
        <p>Click the button below to trigger an error and test the Error Boundary:</p>
        <button onClick={() => setShouldError(true)} className="trigger-error-btn">
          Trigger Error
        </button>
      </div>
    </div>
  );
};

export default ErrorTest;