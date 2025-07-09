import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../asset/default.png";
import { useAppContext } from "../../context/AppContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
          <img src={logo} alt="logo" className="w-50 h-10 object-cover" />
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-black focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            className="text-gray-800 hover:text-indigo-600 transition font-medium text-lg"
          >
            Home
          </NavLink>
          {user && (
            <NavLink
              to="/dashboard"
              className="text-gray-800 hover:text-indigo-600 transition font-medium text-lg"
            >
              Dashboard
            </NavLink>
          )}
          <NavLink
            to="/contact"
            className="text-gray-800 hover:text-indigo-600 transition font-medium text-lg"
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/about"
            className="text-gray-800 hover:text-indigo-600 transition font-medium text-lg"
          >
            About Us
          </NavLink>
        </div>

        {/* Desktop Right Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div
              className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
              onClick={() => {
                navigate("/dashboard/my-profile");
                scrollTo(0, 0);
              }}
            >
              <img
                src={user?.profile_image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => {
                  navigate("/login");
                  scrollTo(0, 0);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition
                cursor-pointer"
              >
                Log in
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                  scrollTo(0, 0);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition
                cursor-pointer"
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <NavLink
            to="/"
            onClick={toggleMenu}
            className="block text-gray-800 hover:text-indigo-600 text-base"
          >
            Home
          </NavLink>
          {user && (
            <NavLink
              to="/dashboard"
              onClick={toggleMenu}
              className="block text-gray-800 hover:text-indigo-600 text-base"
            >
              Dashboard
            </NavLink>
          )}
          <NavLink
            to="/contact"
            onClick={toggleMenu}
            className="block text-gray-800 hover:text-indigo-600 text-base"
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/about"
            onClick={toggleMenu}
            className="block text-gray-800 hover:text-indigo-600 text-base"
          >
            About Us
          </NavLink>

          {user ? (
            <div
              className="flex items-center gap-3 mt-4"
              onClick={() => {
                navigate("/dashboard/my-profile");
                scrollTo(0, 0);
                toggleMenu();
              }}
            >
              <img
                src={user?.profile_image}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-sm text-gray-800">My Profile</span>
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => {
                  navigate("/login");
                  toggleMenu();
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Log in
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                  toggleMenu();
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
