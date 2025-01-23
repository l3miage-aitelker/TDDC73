import * as React from 'react';
import './PasswordStrengthMeter.css';

const PasswordStrengthMeter = ({ userInput, onStrengthChange }) => {
  
  const calculate = (userInput) => {
      let score = 0;
      console.log(userInput.length, score, userInput)
      if (userInput == undefined) return 0;
      else {
        // Increment score for each character type present
        if (/[A-Z]/.test(userInput)) score++;
        if (/[a-z]/.test(userInput)) score++;
        if (/[0-9]/.test(userInput)) score++;
        if (/[^A-Za-z0-9]/.test(userInput)) score++;
        // Penalize short passwords
        if (userInput.length < 8 && userInput.length > 0) {score = 1};

        console.log(userInput.length, score, userInput)

        return score;
      }

    };
  
    const strength = calculate(userInput);
    const isStrongEnough = strength > 2; // Define threshold for "strong" password

    // Notify parent component when strength changes
    useEffect(() => {
        if (onStrengthChange) {
          onStrengthChange(isStrongEnough);
        }
      }, [isStrongEnough, onStrengthChange]);

    const strengthLabels = ['Unknown', 'Weak', 'Medium', 'Strong', 'Excellent'];
    const strengthColor = ['red', 'orange', 'green', 'blue'][strength - 1] || 'gray';
  
    // Strength bar and label
    return (
      <div className='PasswordStrengthMeter'>
        <div className="strength-bar" style={{ backgroundColor: strengthColor }}></div>
        <p>Strength of the password : {strengthLabels[strength ]}</p>
      </div>
    );
  };
  
  export default PasswordStrengthMeter;