import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Moon, Sun, HeartHandshake, Home } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Login() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Email validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Password validation
  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  const handleLogin = async () => {
    setError('');
    
    // Validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      // Here you would typically make an API call to authenticate
      console.log('Login submitted:', { email, password });
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set login state
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('loginTimestamp', Date.now().toString());

      // Check if user has completed registration
      const hasCompletedRegistration = localStorage.getItem('registrationComplete');
      if (hasCompletedRegistration) {
        navigate('/profile');
      } else {
        navigate('/matrimony-registration');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setError('');
    
    // Validation
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!isValidPassword(password)) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      // Here you would typically make an API call to register
      console.log('Signup submitted:', { email, password });
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set login state for new user
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('loginTimestamp', Date.now().toString());
      localStorage.setItem('isNewUser', 'true');

      // Navigate to registration
      navigate('/matrimony-registration');
    } catch (err) {
      console.error('Signup error:', err);
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header with Logo and Dark Mode Toggle */}
      <div className="w-full fixed top-0 left-0">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center relative">
            {/* Back to Home Link - Left */}
            <Link 
              to="/" 
              className={`flex items-center ${
                darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'
              } transition-colors duration-200`}
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              <span>Back</span>
            </Link>

            {/* Logo - Center */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
              <HeartHandshake className={`w-8 h-8 ${darkMode ? 'text-red-400' : 'text-red-500'}`} />
              <span className="flex items-baseline">
                <span className={`text-3xl font-extrabold tracking-tight ${
                  darkMode ? 'text-white' : 'text-gray-900'
                } mr-1`}>
                  विप्रVivah
                </span>
              </span>
            </div>

            {/* Dark Mode Toggle - Right */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-gray-100 hover:bg-gray-200'
              } transition-colors duration-200`}
            >
              {darkMode ? (
                <Sun className="w-6 h-6 text-yellow-400" />
              ) : (
                <Moon className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Back to Homepage Button - Fixed at Bottom */}
      <Link
        to="/"
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 px-6 py-3 rounded-full shadow-lg ${
          darkMode 
            ? 'bg-gray-800 text-white hover:bg-gray-700' 
            : 'bg-white text-red-500 hover:bg-gray-100'
        } transition-all duration-200 hover:shadow-xl`}
      >
        <Home className="w-5 h-5" />
        <span>Back to Homepage</span>
      </Link>

      {/* Add margin top to account for fixed header */}
      <div className="mt-24">
        <div className={`${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow-lg p-8 w-full max-w-md mx-4 transition-colors duration-200`}>
          <h1 className={`text-2xl font-bold text-center mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          
          {/* Tab Navigation */}
          <div className={`flex rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-6`}>
            <button
              className={`flex-1 py-2 rounded-full text-center transition-colors ${
                activeTab === 'login' 
                  ? 'bg-red-500 text-white' 
                  : darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 rounded-full text-center transition-colors ${
                activeTab === 'signup' 
                  ? 'bg-red-500 text-white' 
                  : darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
              onClick={() => setActiveTab('signup')}
            >
              Signup
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-600 text-sm">
              {error}
            </div>
          )}
          
          {activeTab === 'login' ? (
            /* Login Form */
            <div>
              <div className="mb-4 relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Mail className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-red-500`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-2 relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Lock className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`w-full pl-10 pr-10 py-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-red-500`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  ) : (
                    <Eye className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  )}
                </button>
              </div>
              
              <div className="mb-6 text-right">
                <button 
                  className={`text-sm ${
                    darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'
                  } transition-colors`}
                  onClick={() => alert('Password reset functionality coming soon!')}
                >
                  Forgot password?
                </button>
              </div>
              
              <button
                onClick={handleLogin}
                disabled={loading}
                className={`w-full bg-red-500 text-white py-3 rounded-lg transition-colors ${
                  loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-600'
                }`}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              
              <div className="mt-6 text-center">
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Not a member?{' '}
                  <button 
                    className={`${
                      darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'
                    } transition-colors`}
                    onClick={() => setActiveTab('signup')}
                  >
                    Signup now
                  </button>
                </p>
              </div>
            </div>
          ) : (
            /* Signup Form */
            <div>
              <div className="mb-4 relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Mail className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-red-500`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-4 relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Lock className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`w-full pl-10 pr-10 py-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-red-500`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  ) : (
                    <Eye className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  )}
                </button>
              </div>
              
              <div className="mb-6 relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Lock className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className={`w-full pl-10 pr-10 py-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-red-500`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  ) : (
                    <Eye className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  )}
                </button>
              </div>
              
              <button
                onClick={handleSignup}
                disabled={loading}
                className={`w-full bg-red-500 text-white py-3 rounded-lg transition-colors ${
                  loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-600'
                }`}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}