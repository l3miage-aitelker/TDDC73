import React, {useState, useRef} from 'react';
import './App.css';

import { Captcha, PasswordStrengthMeter } from 'sdk';

function App() {

  const captchaRef = useRef(null); // Reference to interact with the Captcha component
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [strengthPassword, setStrengthPassword] = useState(false);
  const [isCaptchaCorrect, setIsCaptchaCorrect] = useState(false);

  // Refresh the captcha when the button is clicked
  const handleRefresh = () => {
    if (captchaRef.current) {
      captchaRef.current.refreshCaptcha();
    }
  };

  return (
<div>
  <h2>Registration</h2>
  <form>
    <div>
      <label htmlFor="firstName">
        First Name
      </label>
      <input
        type="text"
        name="firstName"
      />
    </div>
    <div>
      <label htmlFor="lastName">
        Last Name
      </label>
      <input
        type="text"
        name="lastName"
      />
    </div>
    <div>
      <label htmlFor="email">
        Email
      </label>
      <input
        type="email"
        name="email"
      />
    </div>
    <div>
      <label htmlFor="password" className="block font-medium">
        Password
      </label>
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <PasswordStrengthMeter userInput={password} onStrengthChange={e => setStrengthPassword(e)} />
        {!strengthPassword && password != '' && <div>Password must be at least Good</div>}
    </div>
    <div>
      <label htmlFor="confirmPassword" className="block font-medium">
        Confirm Password
      </label>
      <input
        type="password"
        name="confirmPassword"
        onChange={(e) => setConfirmedPassword(e.target.value)}
      />
      {password != confirmedPassword && confirmedPassword != '' && <div>Confirmed password is incorrect</div>}
    </div>
    <div>
    <Captcha ref={captchaRef} userInput={captcha} onTextChange={setIsCaptchaCorrect} />
   {/*  <Captcha userInput={captcha} onTextChange={e => setIsCaptchaCorrect(e)} /> */}
    <input
        type="text"
        name="captcha"
        onChange={(e) => setCaptcha(e.target.value)}
      />
      <button onClick={handleRefresh}>Refresh</button>
    {strengthPassword && isCaptchaCorrect && password === confirmedPassword &&
      <button type="submit">
        Register
      </button>
    }
    </div>
  </form>
</div>

  );
}

export default App;
