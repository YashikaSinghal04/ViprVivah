import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { HeartHandshake, Moon, Sun, Save, ArrowLeft, Upload, Camera } from 'lucide-react';

export default function MatrimonyRegistration() {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [isEditMode] = useState(!!location.state?.editMode);
  const [formData, setFormData] = useState({
    profileFor: '',
    firstName: '',
    middleName: '',
    lastName: '',
    fathersName: '',
    mothersName: '',
    dateOfBirth: '',
    age: '',
    subcaste: '',
    gotra: '',
    motherTongue: '',
    temporaryAddress: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    },
    permanentAddress: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      sameAsTemporary: false
    },
    livesWithFamily: null,
    maritalStatus: '',
    foodHabits: '',
    education: {
      highestQualification: '',
      specialization: '',
      university: '',
      yearOfCompletion: ''
    },
    career: {
      currentlyWorking: null,
      occupation: '',
      company: '',
      workLocation: '',
      annualIncome: ''
    },
    socialMedia: {
      instagram: '',
      facebook: '',
      linkedin: ''
    },
    idVerification: {
      type: '',
      number: ''
    }
  });

  // Check if user is logged in and load existing profile data
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Load existing profile data if in edit mode
    if (isEditMode) {
      const savedProfileData = localStorage.getItem('profileData');
      if (savedProfileData) {
        const parsedData = JSON.parse(savedProfileData);
        setFormData(parsedData);
        if (parsedData.profileImage) {
          setProfileImagePreview(parsedData.profileImage);
        }
      }
    }
  }, [navigate, isEditMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size should be less than 5MB');
        return;
      }
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleDateOfBirthChange = (e) => {
    const dob = e.target.value;
    const age = calculateAge(dob);
    setFormData(prev => ({
      ...prev,
      dateOfBirth: dob,
      age: age.toString()
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'permanentAddress.sameAsTemporary') {
      setFormData(prev => ({
        ...prev,
        permanentAddress: {
          ...prev.permanentAddress,
          sameAsTemporary: checked,
          ...(checked && {
            street: prev.temporaryAddress.street,
            city: prev.temporaryAddress.city,
            state: prev.temporaryAddress.state,
            pincode: prev.temporaryAddress.pincode
          })
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validate required fields
      const requiredFields = [
        'firstName',
        'lastName',
        'dateOfBirth',
        'gotra',
        'motherTongue',
        'maritalStatus'
      ];

      const missingFields = requiredFields.filter(field => !formData[field]);
      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      }

      // Save the profile data to localStorage
      const profileDataToSave = {
        ...formData,
        profileImage: profileImagePreview // Save the image preview URL
      };
      localStorage.setItem('profileData', JSON.stringify(profileDataToSave));
      
      // Mark registration as complete
      localStorage.setItem('registrationComplete', 'true');
      localStorage.removeItem('isNewUser');
      
      // Navigate based on whether we're editing or creating
      if (isEditMode) {
        navigate('/profile', { 
          replace: true,
          state: { updateSuccess: true }
        });
      } else {
        navigate('/registration-success', { replace: true });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSubtitle = (section) => {
    switch (section) {
      case 'Profile For Section':
        return 'Specify who this profile is being created for';
      case 'Basic Information':
        return 'Enter your personal identification details';
      case 'Family Information':
        return 'Share details about your family background';
      case 'Personal Details':
        return 'Tell us more about yourself and your preferences';
      case 'Education Details':
        return 'Share your educational background and achievements';
      case 'Career Details':
        return 'Provide information about your professional life';
      case 'Social Media Profiles':
        return 'Add your social media handles (optional)';
      case 'ID Verification':
        return 'Help us verify your identity';
      default:
        return '';
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} pb-12`}>
      {/* Header */}
      <div className="w-full fixed top-0 left-0 z-10 bg-opacity-95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center relative">
            <button
              onClick={() => navigate(-1)}
              className={`flex items-center space-x-2 ${
                darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'
              } transition-colors duration-200`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

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

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-200 ${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400 hover:text-yellow-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
              }`}
            >
              {darkMode ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className={`max-w-5xl mx-auto ${
          darkMode ? 'bg-gray-800/50' : 'bg-white'
        } rounded-xl shadow-xl backdrop-blur-sm border ${
          darkMode ? 'border-gray-700' : 'border-gray-100'
        }`}>
          {/* Form Header */}
          <div className={`px-10 py-8 border-b ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <h1 className={`text-3xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Matrimony Profile Registration
            </h1>
            <p className={`mt-3 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Fill in your details to create your matrimony profile. Fields marked with * are required.
            </p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-10 space-y-12">
            {/* Profile Image Section - Centered */}
            <div className={`flex flex-col items-center space-y-6 pb-12 border-b ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className={`w-48 h-48 rounded-full overflow-hidden border-4 ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              } shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                {profileImagePreview ? (
                  <img
                    src={profileImagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <Camera className={`w-20 h-20 ${
                      darkMode ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                  </div>
                )}
              </div>
              <label className={`inline-flex items-center px-8 py-4 rounded-lg cursor-pointer ${
                darkMode 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-red-500 hover:bg-red-600 text-white'
              } transition-all duration-200 shadow-md hover:shadow-lg`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Upload className="w-5 h-5 mr-3" />
                <span className="text-lg">Upload Profile Photo</span>
              </label>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Maximum file size: 5MB. Recommended: Square image
              </p>
            </div>

            {/* Section Components - Add section styling */}
            {[
              'Profile For Section',
              'Basic Information',
              'Family Information',
              'Personal Details',
              'Education Details',
              'Career Details',
              'Social Media Profiles',
              'ID Verification'
            ].map((section, index) => (
              <div 
                key={index} 
                className={`space-y-8 pb-12 ${
                  index < 7 ? (darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200') : ''
                } ${
                  darkMode 
                    ? 'hover:bg-gray-800/30' 
                    : 'hover:bg-gray-50'
                } rounded-lg transition-colors duration-200 p-6`}
              >
                <div className="space-y-2">
                  <h2 className={`text-2xl font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {section}
                  </h2>
                  <p className={`text-base ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {getSubtitle(section)}
                  </p>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section === 'Profile For Section' && (
                    <div className="col-span-full">
                      <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Profile For *
                      </label>
                      <select
                        name="profileFor"
                        value={formData.profileFor}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } shadow-sm focus:border-red-500 focus:ring-red-500`}
                        required
                      >
                        <option value="">Select</option>
                        <option value="self">Self</option>
                        <option value="son">Son</option>
                        <option value="daughter">Daughter</option>
                        <option value="brother">Brother</option>
                        <option value="sister">Sister</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  )}

                  {section === 'Basic Information' && (
                    <>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } shadow-sm focus:border-red-500 focus:ring-red-500`}
                          required
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Middle Name
                        </label>
                        <input
                          type="text"
                          name="middleName"
                          value={formData.middleName}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } shadow-sm focus:border-red-500 focus:ring-red-500`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } shadow-sm focus:border-red-500 focus:ring-red-500`}
                          required
                        />
                      </div>
                    </>
                  )}

                  {section === 'Family Information' && (
                    <>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Father's Name
                        </label>
                        <input
                          type="text"
                          name="fathersName"
                          value={formData.fathersName}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } shadow-sm focus:border-red-500 focus:ring-red-500`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Mother's Name
                        </label>
                        <input
                          type="text"
                          name="mothersName"
                          value={formData.mothersName}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } shadow-sm focus:border-red-500 focus:ring-red-500`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Lives with Family
                        </label>
                        <div className="mt-2 space-x-4">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="livesWithFamily"
                              value="yes"
                              checked={formData.livesWithFamily === true}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                livesWithFamily: e.target.value === "yes"
                              }))}
                              className="form-radio text-red-500"
                            />
                            <span className={`ml-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Yes</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="livesWithFamily"
                              value="no"
                              checked={formData.livesWithFamily === false}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                livesWithFamily: e.target.value === "yes"
                              }))}
                              className="form-radio text-red-500"
                            />
                            <span className={`ml-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>No</span>
                          </label>
                        </div>
                      </div>
                    </>
                  )}

                  {section === 'Personal Details' && (
                    <>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Date of Birth *
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleDateOfBirthChange}
                          className={`mt-1 block w-full rounded-md ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } shadow-sm focus:border-red-500 focus:ring-red-500`}
                          required
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Age
                        </label>
                        <input
                          type="text"
                          name="age"
                          value={formData.age}
                          readOnly
                          className={`mt-1 block w-full rounded-md ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } shadow-sm`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Subcaste
                        </label>
                        <select
                          name="subcaste"
                          value={formData.subcaste}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } shadow-sm focus:border-red-500 focus:ring-red-500`}
                        >
                          <option value="">Select Subcaste</option>
                          <option value="chitpavan">Chitpavan</option>
                          <option value="deshastha">Deshastha</option>
                          <option value="karhade">Karhade</option>
                          <option value="kokanastha">Kokanastha</option>
                          <option value="saraswat">Saraswat</option>
                          <option value="gaud_saraswat">Gaud Saraswat</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Gotra *
                        </label>
                        <input
                          type="text"
                          name="gotra"
                          value={formData.gotra}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } shadow-sm focus:border-red-500 focus:ring-red-500`}
                          required
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Mother Tongue *
                        </label>
                        <select
                          name="motherTongue"
                          value={formData.motherTongue}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } shadow-sm focus:border-red-500 focus:ring-red-500`}
                          required
                        >
                          <option value="">Select Mother Tongue</option>
                          <option value="marathi">Marathi</option>
                          <option value="hindi">Hindi</option>
                          <option value="gujarati">Gujarati</option>
                          <option value="konkani">Konkani</option>
                          <option value="bengali">Bengali</option>
                          <option value="tamil">Tamil</option>
                          <option value="telugu">Telugu</option>
                          <option value="kannada">Kannada</option>
                          <option value="malayalam">Malayalam</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Marital Status *
                        </label>
                        <select
                          name="maritalStatus"
                          value={formData.maritalStatus}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } shadow-sm focus:border-red-500 focus:ring-red-500`}
                          required
                        >
                          <option value="">Select</option>
                          <option value="never_married">Never Married</option>
                          <option value="divorced">Divorced</option>
                          <option value="widowed">Widowed</option>
                        </select>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Food Habits
                        </label>
                        <select
                          name="foodHabits"
                          value={formData.foodHabits}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } shadow-sm focus:border-red-500 focus:ring-red-500`}
                        >
                          <option value="">Select</option>
                          <option value="vegetarian">Vegetarian</option>
                          <option value="non_vegetarian">Non-vegetarian</option>
                          <option value="eggetarian">Eggetarian</option>
                        </select>
                      </div>
                    </>
                  )}

                  {section === 'Education Details' && (
                    <>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Highest Qualification
                        </label>
                        <select
                          name="education.highestQualification"
                          value={formData.education.highestQualification}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } shadow-sm focus:border-red-500 focus:ring-red-500`}
                        >
                          <option value="">Select Qualification</option>
                          <option value="high_school">High School</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="diploma">Diploma</option>
                          <option value="bachelors">Bachelor's Degree</option>
                          <option value="masters">Master's Degree</option>
                          <option value="phd">Ph.D.</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Specialization
                        </label>
                        <select
                          name="education.specialization"
                          value={formData.education.specialization}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } shadow-sm focus:border-red-500 focus:ring-red-500`}
                        >
                          <option value="">Select Specialization</option>
                          <option value="computer_science">Computer Science</option>
                          <option value="information_technology">Information Technology</option>
                          <option value="mechanical">Mechanical Engineering</option>
                          <option value="electrical">Electrical Engineering</option>
                          <option value="civil">Civil Engineering</option>
                          <option value="medicine">Medicine</option>
                          <option value="commerce">Commerce</option>
                          <option value="arts">Arts</option>
                          <option value="science">Science</option>
                          <option value="management">Management</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          University/College
                        </label>
                        <input
                          type="text"
                          name="education.university"
                          value={formData.education.university}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } shadow-sm focus:border-red-500 focus:ring-red-500`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Year of Completion
                        </label>
                        <input
                          type="text"
                          name="education.yearOfCompletion"
                          value={formData.education.yearOfCompletion}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } shadow-sm focus:border-red-500 focus:ring-red-500`}
                        />
                      </div>
                    </>
                  )}

                  {section === 'Career Details' && (
                    <>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Currently Working
                        </label>
                        <div className="mt-2 space-x-4">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="career.currentlyWorking"
                              value="yes"
                              checked={formData.career.currentlyWorking === true}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                career: {
                                  ...prev.career,
                                  currentlyWorking: e.target.value === "yes"
                                }
                              }))}
                              className="form-radio text-red-500"
                            />
                            <span className={`ml-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Yes</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="career.currentlyWorking"
                              value="no"
                              checked={formData.career.currentlyWorking === false}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                career: {
                                  ...prev.career,
                                  currentlyWorking: e.target.value === "yes"
                                }
                              }))}
                              className="form-radio text-red-500"
                            />
                            <span className={`ml-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>No</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Occupation
                        </label>
                        <select
                          name="career.occupation"
                          value={formData.career.occupation}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } shadow-sm focus:border-red-500 focus:ring-red-500`}
                        >
                          <option value="">Select Occupation</option>
                          <option value="software_engineer">Software Engineer</option>
                          <option value="doctor">Doctor</option>
                          <option value="engineer">Engineer</option>
                          <option value="teacher">Teacher</option>
                          <option value="business_owner">Business Owner</option>
                          <option value="chartered_accountant">Chartered Accountant</option>
                          <option value="lawyer">Lawyer</option>
                          <option value="banker">Banker</option>
                          <option value="government_employee">Government Employee</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Company
                        </label>
                        <input
                          type="text"
                          name="career.company"
                          value={formData.career.company}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } shadow-sm focus:border-red-500 focus:ring-red-500`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Work Location
                        </label>
                        <input
                          type="text"
                          name="career.workLocation"
                          value={formData.career.workLocation}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } shadow-sm focus:border-red-500 focus:ring-red-500`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Annual Income
                        </label>
                        <select
                          name="career.annualIncome"
                          value={formData.career.annualIncome}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } shadow-sm focus:border-red-500 focus:ring-red-500`}
                        >
                          <option value="">Select Annual Income</option>
                          <option value="0-3">Below 3 LPA</option>
                          <option value="3-5">3-5 LPA</option>
                          <option value="5-7">5-7 LPA</option>
                          <option value="7-10">7-10 LPA</option>
                          <option value="10-15">10-15 LPA</option>
                          <option value="15-20">15-20 LPA</option>
                          <option value="20-30">20-30 LPA</option>
                          <option value="30-50">30-50 LPA</option>
                          <option value="50+">Above 50 LPA</option>
                        </select>
                      </div>
                    </>
                  )}

                  {section === 'Social Media Profiles' && (
                    <>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Instagram Profile
                        </label>
                        <input
                          type="text"
                          name="socialMedia.instagram"
                          value={formData.socialMedia.instagram}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } shadow-sm focus:border-red-500 focus:ring-red-500`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Facebook Profile
                        </label>
                        <input
                          type="text"
                          name="socialMedia.facebook"
                          value={formData.socialMedia.facebook}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } shadow-sm focus:border-red-500 focus:ring-red-500`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          LinkedIn Profile
                        </label>
                        <input
                          type="text"
                          name="socialMedia.linkedin"
                          value={formData.socialMedia.linkedin}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } shadow-sm focus:border-red-500 focus:ring-red-500`}
                        />
                      </div>
                    </>
                  )}

                  {section === 'ID Verification' && (
                    <>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          ID Type
                        </label>
                        <select
                          name="idVerification.type"
                          value={formData.idVerification.type}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } shadow-sm focus:border-red-500 focus:ring-red-500`}
                        >
                          <option value="">Select</option>
                          <option value="aadhar">Aadhar Card</option>
                          <option value="pan">PAN Card</option>
                          <option value="passport">Passport</option>
                          <option value="driving_license">Driving License</option>
                        </select>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          ID Number
                        </label>
                        <input
                          type="text"
                          name="idVerification.number"
                          value={formData.idVerification.number}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } shadow-sm focus:border-red-500 focus:ring-red-500`}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}

            {/* Submit Button Section */}
            <div className={`flex justify-end space-x-6 pt-8 mt-12 border-t ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className={`px-8 py-4 rounded-lg text-lg transition-all duration-200 ${
                  darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } shadow-sm hover:shadow-md`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-4 rounded-lg flex items-center space-x-3 text-lg ${
                  darkMode 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-red-500 text-white hover:bg-red-600'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''} 
                transition-all duration-200 shadow-md hover:shadow-lg`}
              >
                <Save className="w-6 h-6" />
                <span>{loading ? 'Saving...' : isEditMode ? 'Update Profile' : 'Save Profile'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}