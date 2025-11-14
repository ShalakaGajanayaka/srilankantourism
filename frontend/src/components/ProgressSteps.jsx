import { Link } from 'react-router-dom';

function ProgressSteps({ currentStep = 1 }) {
  const steps = [
    { number: 1, label: 'cart page', path: '/tour-cart', icon: null },
    { number: 2, label: 'Your Details', path: '/tour-booking-details', icon: null },
    { number: 3, label: 'Payment information', path: '/tour-booking-payment', icon: null },
    { number: 4, label: 'completed', path: '/tour-booking-complete', icon: 'ri-check-line' },
  ];

  const getStepClass = (stepNumber) => {
    if (stepNumber < currentStep) {
      return 'step completed';
    } else if (stepNumber === currentStep) {
      return 'step current';
    } else {
      return 'step';
    }
  };

  const getStepContent = (stepNumber, isCompleted) => {
    // Step 4 always shows icon
    if (stepNumber === 4) {
      return <i className="ri-check-line"></i>;
    }
    // Step 1 shows check icon when completed (in payment/complete pages)
    if (stepNumber === 1 && isCompleted && currentStep > 2) {
      return <i className="ri-check-line"></i>;
    }
    // Otherwise show number
    return <span>{stepNumber}</span>;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="progress-container-horizontal mb-10">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const stepClass = getStepClass(stepNumber);
              
              return (
                <Link 
                  key={stepNumber}
                  to={step.path} 
                  className={stepClass}
                >
                  <div className="step-number">
                    {getStepContent(stepNumber, isCompleted)}
                  </div>
                  <p>{step.label}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressSteps;

