import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Moon, 
  Sun, 
  Heart, 
  Home, 
  Mail, 
  User, 
  Filter, 
  Search, 
  X, 
  Cake, 
  Languages, 
  MapPin, 
  Users, 
  LogOut 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

// Mock data for profiles
const profilesData = [
  {
    id: 1,
    name: "Alok Sharma",
    age: 27,
    language: "marathi",
    city: "Mumbai",
    gotra: "other",
    imageUrl: "/api/placeholder/400/320"
  },
  {
    id: 2,
    name: "Rishabh Verma",
    age: 26,
    language: "other",
    city: "Bangalore",
    gotra: "agastya",
    imageUrl: "/api/placeholder/400/320"
  },
  {
    id: 3,
    name: "Pranav Pandey",
    age: 30,
    language: "bengali",
    city: "Kolkata",
    gotra: "atri",
    imageUrl: "/api/placeholder/400/320"
  },
  {
    id: 4,
    name: "Vaibhav Shukla",
    age: 23,
    language: "hindi",
    city: "Ghaziabad",
    gotra: "kashyap",
    imageUrl: "/api/placeholder/400/320"
  },
  {
    id: 5,
    name: "Isha Tripathi",
    age: 28,
    language: "gujarati",
    city: "Vadodara",
    gotra: "agastya",
    imageUrl: "/api/placeholder/400/320"
  },
  {
    id: 6,
    name: "Isha Tripathi",
    age: 28,
    language: "gujarati",
    city: "Vadodara",
    gotra: "agastya",
    imageUrl: "/api/placeholder/400/320"
  },
  {
    id: 7,
    name: "Bindu Shukla",
    age: 26,
    language: "other",
    city: "Bangalore",
    gotra: "atri",
    imageUrl: "/api/placeholder/400/320"
  },
  {
    id: 8,
    name: "Urvashi Upadhyaa",
    age: 26,
    language: "other",
    city: "Mumbai",
    gotra: "agastya",
    imageUrl: "/api/placeholder/400/320"
  },
  {
    id: 9,
    name: "Neha Tripathi",
    age: 24,
    language: "malayalam",
    city: "Vadodara",
    gotra: "agastya",
    imageUrl: "/api/placeholder/400/320"
  },
  {
    id: 10,
    name: "Raj Malhotra",
    age: 29,
    language: "punjabi",
    city: "Delhi",
    gotra: "bharadwaj",
    imageUrl: "/api/placeholder/400/320"
  },
  {
    id: 11,
    name: "Priya Sharma",
    age: 25,
    language: "hindi",
    city: "Jaipur",
    gotra: "vashishtha",
    imageUrl: "/api/placeholder/400/320"
  },
  {
    id: 12,
    name: "Arjun Iyer",
    age: 31,
    language: "tamil",
    city: "Chennai",
    gotra: "kashyap",
    imageUrl: "/api/placeholder/400/320"
  }
];

// Available options for filters
const filterOptions = {
  lookingFor: ["Any", "Bride", "Groom"],
  languages: ["Any", "Hindi", "Marathi", "Bengali", "Tamil", "Telugu", "Kannada", "Malayalam", "Gujarati", "Punjabi", "Other"],
  cities: ["Any", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Jaipur", "Ahmedabad", "Vadodara", "Ghaziabad", "Other"],
  gotras: ["Any", "Kashyap", "Vashishtha", "Gautam", "Bharadwaj", "Atri", "Agastya", "Other"]
};

const ExploreProfiles = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const [profiles, setProfiles] = useState(profilesData);
  const [filters, setFilters] = useState({
    lookingFor: "Any",
    language: "Any",
    city: "Any",
    gotra: "Any"
  });

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  // Add new useEffect for filtering
  useEffect(() => {
    filterProfiles();
  }, [filters]); // Run whenever filters change

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const clearFilters = () => {
    setFilters({
      lookingFor: "Any",
      language: "Any",
      city: "Any",
      gotra: "Any"
    });
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const filterProfiles = () => {
    const filteredProfiles = profilesData.filter(profile => {
      // Check each filter criteria
      const lookingForMatch = filters.lookingFor === "Any" || 
        profile.gender === filters.lookingFor;
      
      const languageMatch = filters.language === "Any" || 
        profile.language.toLowerCase() === filters.language.toLowerCase();
      
      const cityMatch = filters.city === "Any" || 
        profile.city === filters.city;
      
      const gotraMatch = filters.gotra === "Any" || 
        profile.gotra.toLowerCase() === filters.gotra.toLowerCase();

      // Return true only if all criteria match
      return lookingForMatch && languageMatch && cityMatch && gotraMatch;
    });
    
    setProfiles(filteredProfiles);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Navigation Bar */}
      <nav className={`${darkMode ? 'bg-gray-800' : 'bg-red-500'} text-white p-4 fixed w-full z-10`}>
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="w-8 h-8" />
            <span className="text-2xl font-bold">विप्रVivah</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center hover:text-gray-200 transition-colors">
              <Home className="w-5 h-5 mr-1" />
              <span>Home</span>
            </Link>
            <Link to="/explore" className="flex items-center hover:text-gray-200 transition-colors">
              <Search className="w-5 h-5 mr-1" />
              <span>Explore</span>
            </Link>
            <Link to="/contact" className="flex items-center hover:text-gray-200 transition-colors">
              <Mail className="w-5 h-5 mr-1" />
              <span>Contact</span>
            </Link>
            <Link to="/profile" className="flex items-center hover:text-gray-200 transition-colors">
              <User className="w-5 h-5 mr-1" />
              <span>My Profile</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center hover:text-gray-200 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-1" />
              <span>Logout</span>
            </button>
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto py-8 px-4 pt-20">
        {/* Filter Section */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mb-8`}>
          <div className={`flex items-center ${darkMode ? 'text-red-400' : 'text-red-500'} text-xl font-bold mb-6`}>
            <Filter className="mr-2" /> Filter Profiles
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                <Search className="mr-2" size={16} /> Looking for
              </label>
              <select 
                className={`w-full p-2 border rounded ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                value={filters.lookingFor}
                onChange={(e) => handleFilterChange('lookingFor', e.target.value)}
              >
                {filterOptions.lookingFor.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                <Languages className="mr-2" size={16} /> Mother Tongue
              </label>
              <select 
                className={`w-full p-2 border rounded ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                value={filters.language}
                onChange={(e) => handleFilterChange('language', e.target.value)}
              >
                {filterOptions.languages.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                <MapPin className="mr-2" size={16} /> City
              </label>
              <select 
                className={`w-full p-2 border rounded ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
              >
                {filterOptions.cities.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                <Users className="mr-2" size={16} /> Gotra
              </label>
              <select 
                className={`w-full p-2 border rounded ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                value={filters.gotra}
                onChange={(e) => handleFilterChange('gotra', e.target.value)}
              >
                {filterOptions.gotras.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {profiles.length} profiles found
            </div>
            <button 
              onClick={clearFilters}
              className={`flex items-center px-4 py-2 border rounded ${
                darkMode 
                  ? 'border-gray-600 bg-gray-700 text-white hover:bg-gray-600' 
                  : 'border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <X className="mr-2" size={16} /> Clear Filters
            </button>
          </div>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {profiles.length > 0 ? (
            profiles.map(profile => (
              <div key={profile.id} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
                <img 
                  src={profile.imageUrl} 
                  alt={profile.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <div className={`text-xl font-semibold ${darkMode ? 'text-red-400' : 'text-red-500'} mb-4`}>
                    {profile.name}
                  </div>
                  <div className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <div className="flex items-center">
                      <Cake className="mr-2" size={16} /> {profile.age} years
                    </div>
                    <div className="flex items-center">
                      <Languages className="mr-2" size={16} /> {profile.language}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2" size={16} /> {profile.city}
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2" size={16} /> {profile.gotra}
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate(`/profile/${profile.id}`)}
                    className={`w-full mt-4 px-4 py-2 rounded ${
                      darkMode 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : 'bg-red-500 hover:bg-red-600'
                    } text-white transition-colors duration-200`}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={`col-span-3 text-center py-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              No profiles found matching your filters
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreProfiles;