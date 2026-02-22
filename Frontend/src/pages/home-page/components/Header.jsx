import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, X } from 'lucide-react';
import Button from '../../../components/ui/Button';
import { logoutUser } from '../../../store/slices/authSlice';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/home-page' },
    { name: 'Typing test', path: '/typing-playground' },
    { name: 'ID Registration', path: '/forms' },
    { name: 'Forms', disabled: true },
  ];

  const handleLogout = async () => {
    await dispatch(logoutUser());
    setMobileMenuOpen(false);
    navigate('/home-page');
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/home-page' || location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigate('/home-page');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/home-page" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">MT</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              MyTypingWala
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems?.map((item) => (
              item?.disabled ? (
                <div key={item?.name} className="relative group">
                  <button
                    type="button"
                    aria-disabled="true"
                    className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-50 rounded-lg cursor-default"
                  >
                    {item?.name}
                  </button>
                  <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                    Coming soon
                  </span>
                </div>
              ) : (
                item?.name === 'Home' ? (
                  <Link
                    key={item?.name}
                    to={item?.path}
                    onClick={handleHomeClick}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    {item?.name}
                  </Link>
                ) : (
                  <Link
                    key={item?.name}
                    to={item?.path}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    {item?.name}
                  </Link>
                )
              )
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {navItems?.map((item) => (
                item?.disabled ? (
                  <div key={item?.name} className="relative group">
                    <button
                      type="button"
                      aria-disabled="true"
                      className="w-full px-4 py-2 text-sm font-medium text-gray-400 bg-gray-50 rounded-lg text-left cursor-default"
                    >
                      {item?.name}
                    </button>
                    <span className="pointer-events-none absolute left-4 top-full z-10 mt-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                      Coming soon
                    </span>
                  </div>
                ) : (
                  item?.name === 'Home' ? (
                    <Link
                      key={item?.name}
                      to={item?.path}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      onClick={(e) => {
                        handleHomeClick(e);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {item?.name}
                    </Link>
                  ) : (
                    <Link
                      key={item?.name}
                      to={item?.path}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item?.name}
                    </Link>
                  )
                )
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t">
                {isAuthenticated ? (
                  <Button variant="ghost" size="sm" fullWidth onClick={handleLogout}>
                    Logout
                  </Button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" size="sm" fullWidth>
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button size="sm" fullWidth className="bg-gradient-to-r from-indigo-600 to-purple-600">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
