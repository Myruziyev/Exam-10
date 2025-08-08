// src/Pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import '../App.css'; // Import global styles if needed

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogin = (e) => {
    e.preventDefault();
    // Basic validation
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    // --- Simulate Login Logic ---
    // In a real app, you would send credentials to your backend API here.
    // For demonstration, let's assume any non-empty username/password is "valid".
    console.log('Login attempt with:', { username, password });

    // Clear any previous errors
    setError('');

    // Simulate successful login -> Redirect to Home
    // Replace '/home' with your desired landing page after login
    navigate('/home');
  };

  return (
    <>
      <div className="login-page">
        <div className="login-container">
          <h2 className="login-title">Login to Your Account</h2>
          {error && <p className="login-error">{error}</p>}
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="username" className="form-label">Username:</label>
              <input
                type="text"
                id="username"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
          {/* Optional: Add links for signup or password reset */}
          {/* <p className="login-footer-text">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p> */}
        </div>
      </div>

      {/* Basic styles for the login page */}
      <style>{`
        .login-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f5f5f5; /* Light background */
          padding: 20px;
        }
        .login-container {
          background-color: #fff;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }
        .login-title {
          margin-bottom: 25px;
          color: #333;
          font-size: 1.8rem;
        }
        .login-form {
          display: flex;
          flex-direction: column;
        }
        .form-group {
          margin-bottom: 20px;
          text-align: left;
        }
        .form-label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
          color: #555;
        }
        .form-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
          box-sizing: border-box; /* Include padding in width */
        }
        .form-input:focus {
            outline: none;
            border-color: #01aee7; /* Highlight on focus */
        }
        .login-button {
          padding: 12px;
          background-color: #01aee7;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .login-button:hover {
          background-color: #018cbf;
        }
        .login-error {
          color: #e74c3c; /* Red error text */
          margin-bottom: 15px;
          font-weight: 500;
        }
        .login-footer-text {
          margin-top: 20px;
          color: #777;
        }
        .login-footer-text a {
          color: #01aee7;
          text-decoration: none;
        }
        .login-footer-text a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}

export default Login;