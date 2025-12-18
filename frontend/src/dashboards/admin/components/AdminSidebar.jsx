import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  UserCog, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { logout, user } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/add-student', icon: UserPlus, label: 'Add Student' },
    { path: '/admin/students', icon: Users, label: 'Student List' },
    { path: '/admin/add-admin', icon: UserCog, label: 'Add Admin' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-lg shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed lg:sticky top-0 left-0 h-screen w-64 bg-gradient-to-b from-indigo-900 to-purple-900 text-white shadow-2xl z-40 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
                  <UserCog className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Admin Panel</h2>
                  <p className="text-xs text-gray-300 truncate">{user?.name}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-white/20 shadow-lg scale-105'
                      : 'hover:bg-white/10 hover:scale-102'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-white/10">
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl transition-all duration-300 font-medium"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}
    </>
  );
};

export default AdminSidebar;
