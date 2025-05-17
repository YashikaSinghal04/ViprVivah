// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { ArrowLeft, HeartHandshake, Moon, Sun, CheckCircle } from 'lucide-react';
// import { useTheme } from '../../context/ThemeContext';

// const OTPVerification = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { darkMode, toggleDarkMode } = useTheme();
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [timer, setTimer] = useState(30);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const email = location.state?.email;
//   const isSignup = location.state?.isSignup;

//   useEffect(() => {
//     // Redirect if no email is provided
//     if (!email) {
//       navigate('/login');
//       return;
//     }

//     // Start countdown timer
//     const interval = setInterval(() => {
//       setTimer((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [email, navigate]);

//   // Handle OTP input change
//   const handleChange = (element, index) => {
//     if (isNaN(element.value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = element.value;
//     setOtp(newOtp);

//     // Move to next input if value is entered
//     if (element.value && element.nextSibling) {
//       element.nextSibling.focus();
//     }
//   };

//   // Handle backspace
//   const handleBackspace = (element, index) => {
//     if (!element.value && element.previousSibling) {
//       element.previousSibling.focus();
//     }
//     const newOtp = [...otp];
//     newOtp[index] = '';
//     setOtp(newOtp);
//   };

//   // Handle paste
//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData('text').slice(0, 6);
//     const newOtp = [...otp];
//     pastedData.split('').forEach((char, index) => {
//       if (index < 6 && !isNaN(char)) {
//         newOtp[index] = char;
//       }
//     });
//     setOtp(newOtp);
//   };

//   // Resend OTP
//   const handleResendOTP = async () => {
//     if (timer > 0) return;
//     setTimer(30);
//     // Here you would typically make an API call to resend OTP
//     console.log('Resending OTP to:', email);
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1000));
//   };

//   // Verify OTP
//   const handleVerifyOTP = async () => {
//     setError('');
//     const otpString = otp.join('');
    
//     if (otpString.length !== 6) {
//       setError('Please enter complete OTP');
//       return;
//     }

//     try {
//       setLoading(true);
//       // Here you would typically make an API call to verify OTP
//       console.log('Verifying OTP:', otpString);
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));

//       setSuccess(true);
      
//       // After successful verification
//       if (isSignup) {
//         localStorage.setItem('isNewUser', 'true');
//       }
//       localStorage.setItem('isLoggedIn', 'true');
//       localStorage.setItem('userEmail', email);
//       localStorage.setItem('loginTimestamp', Date.now().toString());

//       // Wait for success animation
//       setTimeout(() => {
//         const hasCompletedRegistration = localStorage.getItem('registrationComplete');
//         if (hasCompletedRegistration && !isSignup) {
//           navigate('/profile');
//         } else {
//           navigate('/matrimony-registration', { replace: true });
//         }
//       }, 1000);
//     } catch (err) {
//       console.error('OTP verification error:', err);
//       setError('Invalid OTP. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
//       {/* Header */}
//       <div className="w-full fixed top-0 left-0">
//         <div className="container mx-auto px-4 py-6">
//           <div className="flex justify-between items-center relative">
//             <button
//               onClick={() => navigate(-1)}
//               className={`flex items-center ${
//                 darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'
//               } transition-colors duration-200`}
//             >
//               <ArrowLeft className="w-5 h-5" />
//             </button>

//             <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
//               <HeartHandshake className={`w-8 h-8 ${darkMode ? 'text-red-400' : 'text-red-500'}`} />
//               <span className="flex items-baseline">
//                 <span className={`text-3xl font-extrabold tracking-tight ${
//                   darkMode ? 'text-white' : 'text-gray-900'
//                 } mr-1`}>
//                   विप्रVivah
//                 </span>
//               </span>
//             </div>

//             <button
//               onClick={toggleDarkMode}
//               className={`p-2 rounded-full ${
//                 darkMode 
//                   ? 'bg-gray-800 hover:bg-gray-700' 
//                   : 'bg-gray-100 hover:bg-gray-200'
//               } transition-colors duration-200`}
//             >
//               {darkMode ? (
//                 <Sun className="w-6 h-6 text-yellow-400" />
//               ) : (
//                 <Moon className="w-6 h-6 text-gray-700" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 pt-28">
//         <div className={`max-w-md mx-auto ${
//           darkMode ? 'bg-gray-800' : 'bg-white'
//         } rounded-lg shadow-lg p-8`}>
//           {success ? (
//             <div className="flex flex-col items-center justify-center py-8">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
//                 <CheckCircle className="w-10 h-10 text-green-500" />
//               </div>
//               <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//                 Verification Successful
//               </h2>
//               <p className={`mt-2 text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                 Redirecting you to the next step...
//               </p>
//             </div>
//           ) : (
//             <>
//               <h2 className={`text-2xl font-bold text-center mb-2 ${
//                 darkMode ? 'text-white' : 'text-gray-900'
//               }`}>
//                 Verify Your Email
//               </h2>
//               <p className={`text-center mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                 We've sent a 6-digit OTP to<br />
//                 <span className="font-medium">{email}</span>
//               </p>

//               {/* OTP Input */}
//               <div className="flex justify-center space-x-3 mb-6">
//                 {otp.map((digit, index) => (
//                   <input
//                     key={index}
//                     type="text"
//                     maxLength="1"
//                     value={digit}
//                     onChange={(e) => handleChange(e.target, index)}
//                     onKeyDown={(e) => {
//                       if (e.key === 'Backspace') {
//                         handleBackspace(e.target, index);
//                       }
//                     }}
//                     onPaste={handlePaste}
//                     className={`w-12 h-12 text-center text-xl font-semibold rounded-lg 
//                       ${darkMode 
//                         ? 'bg-gray-700 text-white border-gray-600' 
//                         : 'bg-gray-50 text-gray-900 border-gray-300'
//                       } border-2 focus:outline-none focus:border-red-500`}
//                   />
//                 ))}
//               </div>

//               {/* Error Message */}
//               {error && (
//                 <p className="text-red-500 text-center mb-4 text-sm">
//                   {error}
//                 </p>
//               )}

//               {/* Verify Button */}
//               <button
//                 onClick={handleVerifyOTP}
//                 disabled={loading || otp.join('').length !== 6}
//                 className={`w-full py-3 rounded-lg font-semibold text-white 
//                   ${loading 
//                     ? 'bg-gray-400 cursor-not-allowed' 
//                     : 'bg-red-500 hover:bg-red-600'
//                   } transition-colors duration-200`}
//               >
//                 {loading ? 'Verifying...' : 'Verify OTP'}
//               </button>

//               {/* Resend OTP */}
//               <div className="mt-6 text-center">
//                 <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
//                   Didn't receive the code?{' '}
//                   {timer > 0 ? (
//                     <span className="font-medium">Resend in {timer}s</span>
//                   ) : (
//                     <button
//                       onClick={handleResendOTP}
//                       className={`font-medium ${
//                         darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'
//                       }`}
//                     >
//                       Resend OTP
//                     </button>
//                   )}
//                 </p>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OTPVerification; 