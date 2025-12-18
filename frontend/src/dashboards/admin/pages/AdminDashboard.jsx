import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, UserCog, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllStudents } from '../../../services/adminService';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    recentStudents: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await getAllStudents();
      if (response.success) {
        const students = response.data;
        setStats({
          totalStudents: students.length,
          activeStudents: students.filter(s => s.status === 'active').length,
          recentStudents: students.slice(0, 5)
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      title: 'Total Students', 
      value: stats.totalStudents, 
      icon: Users, 
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    { 
      title: 'Active Students', 
      value: stats.activeStudents, 
      icon: TrendingUp, 
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    },
  ];

  const quickActions = [
    { 
      title: 'Add Student', 
      description: 'Register a new student', 
      icon: UserPlus, 
      link: '/admin/add-student',
      color: 'from-indigo-500 to-purple-500'
    },
    { 
      title: 'Add Admin', 
      description: 'Create a new admin account', 
      icon: UserCog, 
      link: '/admin/add-admin',
      color: 'from-pink-500 to-rose-500'
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
              {statCards.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${stat.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 font-medium mb-1">{stat.title}</p>
                      <h3 className="text-4xl font-bold text-gray-800">{stat.value}</h3>
                    </div>
                    <div className={`p-4 bg-gradient-to-br ${stat.color} rounded-xl`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <Link
                      to={action.link}
                      className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-4 bg-gradient-to-br ${action.color} rounded-xl`}>
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{action.title}</h3>
                          <p className="text-gray-600">{action.description}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Students */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Recent Students</h2>
                <Link 
                  to="/admin/students" 
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  View All →
                </Link>
              </div>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Roll Number</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Course</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Year</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {stats.recentStudents.length > 0 ? (
                      stats.recentStudents.map((student) => (
                        <tr key={student._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-gray-800">{student.name}</td>
                          <td className="px-6 py-4 text-gray-600">{student.rollNumber}</td>
                          <td className="px-6 py-4 text-gray-600">{student.course}</td>
                          <td className="px-6 py-4 text-gray-600">{student.year}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              student.status === 'active' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {student.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                          No students found. Add your first student!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
