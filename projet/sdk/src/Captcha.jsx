import React, { useState,forwardRef, useImperativeHandle, useEffect, useRef } from 'react';
import './Captcha.css';

// forwardRef to allow parent components to trigger the refresh
const Captcha = forwardRef(({ userInput, onTextChange }, ref) => {
  const canvasRef = useRef(null);

  const generateCaptcha = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const [captcha, setCaptcha] = useState(generateCaptcha());
  const isCorrect = userInput === captcha;

  // Draws the captcha text onto the canvas with random distortion
  const drawCaptcha = (text) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = 200;
    canvas.height = 60;

    // Background styling
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '30px Arial';
    ctx.fillStyle = '#333';

    // Randomly place and rotate each character
    for (let i = 0; i < text.length; i++) {
      const x = 30 * i + 20;
      const y = 40 + Math.random() * 10;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((Math.random() - 0.5) * 0.5);
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }
  };

  const refreshCaptcha = () => {
    const newCaptcha = generateCaptcha();
    setCaptcha(newCaptcha);
  };

  // Expose the refreshCaptcha method to parent components via ref
  useImperativeHandle(ref, () => ({
    refreshCaptcha,
  }));

  // Redraw captcha whenever it changes
  useEffect(() => {
    drawCaptcha(captcha);
  }, [captcha]);

  // Notify parent component when the user input matches the captcha
  useEffect(() => {
        if (onTextChange) {
          onTextChange(isCorrect);
        }
      }, [userInput, captcha, onTextChange]);

    // Render the captcha canvas
  return (
    <div className="Captcha">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
});

export default Captcha;
