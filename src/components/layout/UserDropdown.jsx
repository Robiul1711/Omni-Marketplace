import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";


const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = useSelector((state) => state.ui.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setIsOpen(false);
  };

  const isHost = location.pathname.startsWith('/host');
  const profilePath = isHost ? '/host/dashboard/profile' : '/dashboard/profile';

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center gap-3 cursor-pointer select-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border-2 border-transparent group-hover:border-blue-100 transition-all">
          {user?.avatar ? (
            <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-500">
              <CgProfile size={24} />
            </div>
          )}
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-bold text-[#1A1D1F] truncate max-w-[120px]">
            {user?.fullName || user?.name || "Kabir Nishat"}
          </p>
          <p className="text-xs text-[#6F767E] truncate max-w-[120px]">
            {user?.email || "example@gmail.com"}
          </p>
        </div>
        <MdKeyboardArrowDown
          className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          size={18}
        />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-[300] animate-in fade-in zoom-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-2 border-b border-gray-50 mb-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Account</p>
          </div>
          
          <Link
            to={profilePath}
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[#1A1D1F] hover:bg-gray-50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <CgProfile className="text-[#6F767E]" size={20} />
            Profile Settings
          </Link>
          
          <div className="h-px bg-gray-50 my-2 mx-4"></div>
          
          <button
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
            onClick={handleLogout}
          >
            <IoLogOutOutline size={20} />
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;

