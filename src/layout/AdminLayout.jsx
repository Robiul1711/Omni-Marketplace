import CommonNavbar from "@/pages/advertisingSites/CommonNavbar";
import SideBar from "@/pages/advertisingSites/SideBar";

import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FiBox, FiHeart, FiDollarSign, FiSettings } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useUserProfile } from "@/hooks/fetchUserProfile";
const AdvertisingLayout = () => {
  useUserProfile();
  const [Open, setOpen] = useState(false);

  const sideBar = [
    {
      id: 1,
      icon: <MdDashboard />,
      text: "Dashboard",
      path: "/advertising/dashboard",
      activePaths: ["/advertising/dashboard"],
      sublink: false,
    },
    {
      id: 2,
      icon: <FiBox />,
      text: "My Campaigns",
      path: "/advertising/dashboard/my-campaigns",
      activePaths: ["/advertising/dashboard/my-campaigns"],
      sublink: false,
    },
    {
      id: 3,
      icon: <FiHeart />,
      text: "Saved Placements",
      path: "/advertising/dashboard/saved-placements",
      activePaths: ["/advertising/dashboard/saved-placements"],
      sublink: false,
    },
    {
      id: 4,
      icon: <FiDollarSign />,
      text: "Payment History",
      path: "/advertising/dashboard/payment-history",
      activePaths: ["/advertising/dashboard/payment-history"],
      sublink: false,
    },
    {
      id: 5,
      icon: <FiSettings />,
      text: "Settings",
      path: "/advertising/dashboard/settings",
      activePaths: ["/advertising/dashboard/settings"],
      sublink: false,
    },
  ];
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);
  return (
    <>
      <ScrollRestoration />
      <div className="flex min-h-screen w-full bg-[#F8F9FC]">
        <SideBar open={Open} setOpen={setOpen} sidebar={sideBar} />
        
        <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 xlg:ml-[300px]">
          <div className="flex flex-col flex-1 ">
            <CommonNavbar open={Open} setOpen={setOpen} />
            <main className="flex-1 p-4 md:p-6">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvertisingLayout;
