import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, BookOpen, Calendar, Hash } from 'lucide-react';
import { getProfile } from '../../../services/studentService';
import StudentSidebar from '../components/StudentSidebar';

const StudentDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      if (response.success) {
        setProfile(response.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const infoCards = profile ? [
    { icon: User, label: 'Full Name', value: profile.name, color: 'from-blue-500 to-cyan-500' },
    { icon: Hash, label: 'Roll Number', value: profile.rollNumber, color: 'from-purple-500 to-pink-500' },
    { icon: BookOpen, label: 'Course', value: profile.course, color: 'from-green-500 to-emerald-500' },
    { icon: Calendar, label: 'Year', value: `${profile.year} Year`, color: 'from-orange-500 to-red-500' },
    { icon: Mail, label: 'Email', value: profile.email, color: 'from-indigo-500 to-purple-500' },
    { icon: Phone, label: 'Phone', value: profile.phoneNumber, color: 'from-pink-500 to-rose-500' },
    { icon: Calendar, label: 'Date of Birth', value: formatDate(profile.dateOfBirth), color: 'from-teal-500 to-cyan-500' },
  ] : [];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar />
      
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Student Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your information.</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : profile ? (
          <>
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-2xl mb-8"
            >
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <User className="w-12 h-12" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">{profile.name}</h2>
                  <p className="text-lg opacity-90">{profile.rollNumber}</p>
                  <p className="text-sm opacity-75">{profile.course} - Year {profile.year}</p>
                </div>
              </div>
            </motion.div>

            {/* Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {infoCards.map((card, index) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 bg-gradient-to-br ${card.color} rounded-xl`}>
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">{card.label}</p>
                      <p className="text-lg font-semibold text-gray-800 break-words">{card.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8 bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Account Status</h3>
              <div className="flex items-center gap-3">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  profile.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {profile.status === 'active' ? '✓ Active' : '✗ Inactive'}
                </span>
                <p className="text-gray-600">
                  {profile.status === 'active' 
                    ? 'Your account is active and in good standing' 
                    : 'Please contact admin for account activation'}
                </p>
              </div>
            </motion.div>
          </>
        ) : (
          <div className="text-center text-gray-600">
            Failed to load profile. Please try again later.
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
