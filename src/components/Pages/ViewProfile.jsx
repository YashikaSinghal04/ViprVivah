import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Home, 
  Mail, 
  User, 
  Search,
  MessageSquare, 
  LogOut,
  Moon,
  Sun,
  Cake,
  MapPin,
  GraduationCap,
  Briefcase,
  Users,
  Phone,
  Languages,
  Clock,
  Heart as HeartIcon
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ViewProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Fetch profile data (mock data for now)
    const fetchProfile = async () => {
      try {
        // Mock data - replace with actual API call
        const mockProfile = {
          id: id,
          name: "Alok Sharma",
          age: 27,
          gender: "Male",
          height: "5'10\"",
          birthDate: "1997-05-15",
          maritalStatus: "Never Married",
          language: "Hindi, English",
          location: {
            city: "Mumbai",
            state: "Maharashtra",
            country: "India"
          },
          education: {
            degree: "B.Tech",
            field: "Computer Science",
            university: "IIT Mumbai",
            graduationYear: "2019"
          },
          occupation: {
            profession: "Software Engineer",
            company: "Tech Solutions Ltd",
            experience: "4 years",
            income: "15-20 LPA"
          },
          family: {
            gotra: "Kashyap",
            fatherOccupation: "Retired Government Officer",
            motherOccupation: "Homemaker",
            siblings: "1 Brother, 1 Sister"
          },
          contact: {
            email: "alok.sharma@example.com",
            phone: "+91 98765XXXXX"
          },
          about: "I am a dedicated professional looking for a life partner who shares my values and aspirations. I believe in maintaining a balance between tradition and modernity. I enjoy reading, traveling, and spending time with family.",
          preferences: {
            ageRange: "24-28 years",
            height: "5'2\" - 5'8\"",
            education: "Graduate",
            occupation: "Any",
            location: "Mumbai/Pune preferred"
          },
          photos: [
            "/api/placeholder/400/500",
            "/api/placeholder/400/500",
            "/api/placeholder/400/500"
          ]
        };

        setProfile(mockProfile);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
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

      {/* Main Content */}
      <div className="container mx-auto pt-20 px-4 pb-8">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
          {/* Profile Header */}
          <div className="relative h-64 bg-gradient-to-r from-red-500 to-red-600">
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
              <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {profile.location.city}, {profile.location.state}
                </span>
                <span className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-1" />
                  {profile.occupation.profession}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Basic Information */}
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg`}>
                <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Basic Information
                </h2>
                <div className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className="flex items-center">
                    <Cake className="w-5 h-5 mr-2" />
                    <span>{profile.age} years</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    <span>{profile.height}</span>
                  </div>
                  <div className="flex items-center">
                    <Languages className="w-5 h-5 mr-2" />
                    <span>{profile.language}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{profile.maritalStatus}</span>
                  </div>
                </div>
              </div>

              {/* Education & Career */}
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg`}>
                <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Education & Career
                </h2>
                <div className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className="flex items-start">
                    <GraduationCap className="w-5 h-5 mr-2 mt-1" />
                    <div>
                      <p>{profile.education.degree} in {profile.education.field}</p>
                      <p className="text-sm">{profile.education.university}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Briefcase className="w-5 h-5 mr-2 mt-1" />
                    <div>
                      <p>{profile.occupation.profession}</p>
                      <p className="text-sm">{profile.occupation.company}</p>
                      <p className="text-sm">{profile.occupation.experience} experience</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Family Background */}
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg`}>
                <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Family Background
                </h2>
                <div className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    <span>Gotra: {profile.family.gotra}</span>
                  </div>
                  <div>
                    <p>Father: {profile.family.fatherOccupation}</p>
                    <p>Mother: {profile.family.motherOccupation}</p>
                    <p>Siblings: {profile.family.siblings}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* About Me */}
            <div className={`mt-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg`}>
              <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                About Me
              </h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {profile.about}
              </p>
            </div>

            {/* Partner Preferences */}
            <div className={`mt-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg`}>
              <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Partner Preferences
              </h2>
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div>
                  <p><strong>Age:</strong> {profile.preferences.ageRange}</p>
                  <p><strong>Height:</strong> {profile.preferences.height}</p>
                </div>
                <div>
                  <p><strong>Education:</strong> {profile.preferences.education}</p>
                  <p><strong>Location:</strong> {profile.preferences.location}</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className={`mt-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg`}>
              <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Contact Information
              </h2>
              <div className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>{profile.contact.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>{profile.contact.phone}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-center space-x-4">
              <button className={`flex items-center px-6 py-3 rounded-lg ${
                darkMode 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-red-500 hover:bg-red-600'
              } text-white transition-colors`}>
                <HeartIcon className="w-5 h-5 mr-2" />
                Express Interest
              </button>
              <button className={`flex items-center px-6 py-3 rounded-lg ${
                darkMode 
                  ? 'bg-gray-600 hover:bg-gray-700' 
                  : 'bg-gray-100 hover:bg-gray-200'
              } ${darkMode ? 'text-white' : 'text-gray-800'} transition-colors`}>
                <MessageSquare className="w-5 h-5 mr-2" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile; 