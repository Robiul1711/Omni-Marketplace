import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import Logo from "@/assets/images/logo.png";

const HostSidebar = ({ sidebar, open, setOpen }) => {
  const location = useLocation();
  const [activeParentIndex, setActiveParentIndex] = useState(null);

  useEffect(() => {
    sidebar?.forEach((item, index) => {
      if (item.sublink) {
        const activeSub = item.sublink.find(
          (sub) => sub.path === location.pathname
        );
        if (activeSub) {
          setActiveParentIndex(index);
        }
      }
    });
  }, [location.pathname, sidebar]);

  const isActive = (paths) => {
    if (!paths) return false;
    const pathArray = Array.isArray(paths) ? paths : [paths];
    
    return pathArray.some(path => {
      if (path.includes(':')) {
        const basePath = path.split(':')[0];
        return location.pathname.startsWith(basePath);
      }
      return path === location.pathname;
    });
  };

  const isParentActive = (item) => {
    if (!item.sublink) return isActive(item.activePaths);
    return item.sublink.some((sub) => isActive(sub.path));
  };

  const toggleSubmenu = (index) => {
    setActiveParentIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-all duration-300 ease-in-out ${open ? "opacity-100 visible" : "opacity-0 invisible"
          } xl:hidden z-[250]`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 bottom-0 h-screen transition-all duration-300 ease-in-out z-[260] bg-white border-r border-gray-100 flex flex-col ${open ? "left-0 w-[300px]" : "-left-full xlg:left-0 xlg:w-[300px]"
          }`}
      >
        {/* Logo */}
        <div className="p-8 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="Logo" className="w-8 h-8 object-contain" />
            <span className="text-[#1A1D1F] font-bold text-xl tracking-tight">
              Omni Marketplace
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-4 custom-scrollbar">
          <div className="flex flex-col gap-2">
            {sidebar?.map((item, index) => {
              const active = isParentActive(item);
              return !item?.sublink ? (
                <Link
                  key={index}
                  to={item?.path}
                  onClick={() => setOpen(false)}
                  className={`group relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 ${active
                    ? "bg-[#3366FF] text-white shadow-lg shadow-blue-100"
                    : "text-[#6F767E] hover:bg-gray-50 hover:text-[#1A1D1F]"
                    }`}
                >
                  <span className={`transition-colors duration-200 ${active ? "text-white" : "text-[#6F767E] group-hover:text-[#1A1D1F]"}`}>
                    {item.icon}
                  </span>
                  <span className="font-semibold text-[15px]">{item?.text}</span>

                  {active && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-white/40 rounded-l-full"></div>
                  )}
                </Link>
              ) : (
                <div className="flex flex-col gap-1" key={index}>
                  <div
                    className={`flex items-center justify-between px-4 py-3.5 cursor-pointer rounded-xl transition-all duration-200 ${active
                      ? "bg-gray-50 text-[#1A1D1F]"
                      : "text-[#6F767E] hover:bg-gray-50 hover:text-[#1A1D1F]"
                      }`}
                    onClick={() => toggleSubmenu(index)}
                  >
                    <div className="flex items-center gap-4">
                      <span className={active ? "text-[#3366FF]" : ""}>{item.icon}</span>
                      <span className="font-semibold text-[15px]">{item?.text}</span>
                    </div>
                    <MdKeyboardArrowDown
                      size={20}
                      className={`transition-transform duration-300 ${activeParentIndex === index ? "rotate-180" : ""
                        }`}
                    />
                  </div>

                  {activeParentIndex === index && (
                    <div className="ml-11 flex flex-col gap-1 mt-1 border-l-2 border-gray-100 pl-4 animate-in slide-in-from-top-2 duration-300">
                      {item?.sublink?.map((sub, idx) => (
                        <Link
                          key={idx}
                          to={sub?.path}
                          onClick={() => setOpen(false)}
                          className={`py-2 text-[14px] font-medium transition-colors duration-200 ${isActive(sub.path)
                            ? "text-[#3366FF]"
                            : "text-[#6F767E] hover:text-[#1A1D1F]"
                            }`}
                        >
                          {sub?.text}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Section - Logout */}
        <div className="p-4 border-t border-gray-100">
          <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-[#6F767E] hover:bg-red-50 hover:text-red-600 transition-all duration-200 group">
            <IoLogOutOutline size={22} className="group-hover:text-red-600" />
            <span className="font-semibold text-[15px]">Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default HostSidebar;