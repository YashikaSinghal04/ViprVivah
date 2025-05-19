import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, MessageSquare, Moon, Sun, Play, Heart, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Image2 from '../../../assets/images/image2.png';

const ViprVivahHomepage = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/login', { state: { message: 'Please login to find your match' } });
  };

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Navigation Bar */}
      <nav className={`${darkMode ? 'bg-gray-800/90' : 'bg-red-500/90'} text-white p-4 fixed w-full z-50 transition-colors duration-200 backdrop-blur-sm`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Heart className={`w-6 h-6 ${darkMode ? 'text-red-400' : 'text-white'} mr-2`} />
            <Link to="/" className="text-2xl font-bold">विप्रVivah</Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center hover:text-gray-200 transition-colors">
              <Home size={18} className="mr-1" />
              <span>Home</span>
            </Link>
            
            <Link to="/contact" className="flex items-center hover:text-gray-200 transition-colors">
              <MessageSquare size={18} className="mr-1" />
              <span>Contact</span>
            </Link>
          </div>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun size={20} className="text-yellow-300" />
            ) : (
              <Moon size={20} className="text-white" />
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${Image2})`,
            transform: 'scale(1.1)',
            willChange: 'transform',
            backfaceVisibility: 'hidden'
          }}
        />
        
        {/* Subtle Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 drop-shadow-lg">
              अखंड एवं विराट विप्र समाज को समर्पित
            </h1>
            
            <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-md max-w-2xl mx-auto">
              Find your perfect match in the Brahmin community with our trusted matrimonial service
            </p>
            
            <Link 
              to="/login" 
              className={`inline-flex items-center px-8 py-4 text-lg font-medium rounded-full 
                ${darkMode 
                  ? 'bg-white text-gray-900 hover:bg-gray-100' 
                  : 'bg-white text-red-500 hover:bg-gray-100'
                } transition-all duration-300 transform hover:scale-105 shadow-xl`}
            >
              <span className="mr-2">Let's Begin</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* About Us Section with Parallax */}
      <section className={`relative py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-200`}>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10"
          style={{ backgroundImage: `url(${Image2})` }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg rounded-lg p-12 max-w-4xl mx-auto transition-colors duration-200`}>
            <h2 className={`text-3xl md:text-4xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-800'} mb-8`}>
              About Us
              <div className={`h-1 w-24 ${darkMode ? 'bg-red-400' : 'bg-red-500'} mx-auto mt-4`}></div>
            </h2>
            
            <div className="max-w-3xl mx-auto text-center">
              <p className={`text-lg leading-relaxed mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Welcome to <span className="font-bold">विप्रVivah</span>, a dedicated matchmaking platform for the Brahmin community. Our mission 
                is to connect like-minded individuals and families, helping them find compatible partners while 
                preserving cultural values. Through advanced technology and personalized services, we ensure a 
                smooth and secure matchmaking experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Register Section with Parallax */}
      <section className={`relative py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10"
          style={{ backgroundImage: `url(${Image2})` }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg p-12 max-w-4xl mx-auto transition-colors duration-200`}>
            <h2 className={`text-3xl md:text-4xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-800'} mb-8`}>
              How to Register
              <div className={`h-1 w-24 ${darkMode ? 'bg-red-400' : 'bg-red-500'} mx-auto mt-4`}></div>
            </h2>
            
            <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-10 text-lg`}>
              Watch our quick guide to learn how to register and start your journey.
            </p>
            
            <div className="flex justify-center">
              <button className={`${
                darkMode ? 'bg-red-500 hover:bg-red-600' : 'bg-red-500 hover:bg-red-600'
              } text-white rounded-full py-4 px-8 text-lg flex items-center transition-all shadow-md hover:shadow-lg transform hover:scale-105 duration-200`}>
                <Play className="mr-2" size={24} />
                Watch Guide
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-800' : 'bg-gray-900'} text-white py-12 transition-colors duration-200`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center mb-6">
              <Heart className={`w-6 h-6 ${darkMode ? 'text-red-400' : 'text-red-500'} mr-2`} />
              <h3 className="text-2xl font-bold">विप्रVivah</h3>
            </div>
            <p className={`text-base leading-relaxed max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-400'}`}>
              The information provided on this website is solely the responsibility of the individual submitting it. 
              We do not verify or guarantee the accuracy, completeness, or reliability of any data filled by users. 
              Users and interested parties should exercise due diligence and independently verify all information 
              before taking any action based on it.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ViprVivahHomepage;
