import HostNavbar from "@/components/hostDashbaord/HostNavbar";
import HostSidebar from "@/components/hostDashbaord/HostSidebar";
import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FiBox, FiDollarSign, FiSettings, FiShoppingCart, FiLifeBuoy } from "react-icons/fi";
import { useUserProfile } from "@/hooks/fetchUserProfile";

const HostLayout = () => {
  useUserProfile();
  const [Open, setOpen] = useState(false);

  const sideBar = [
    {
      id: 1,
      icon: <MdDashboard size={22} />,
      text: "Dashboard",
      path: "/host/dashboard",
      activePaths: ["/host/dashboard"],
    },
    {
      id: 2,
      icon: <FiShoppingCart size={22} />,
      text: "Orders",
      path: "/host/dashboard/total-order",
      activePaths: ["/host/dashboard/total-order", "/host/dashboard/my-placements/:id"],
    },
    {
      id: 3,
      icon: <FiDollarSign size={22} />,
      text: "Earnings",
      path: "/host/dashboard/earnings",
      activePaths: ["/host/dashboard/earnings"],
    },
    {
      id: 4,
      icon: <FiLifeBuoy size={22} />,
      text: "Support",
      path: "/host/dashboard/support",
      activePaths: ["/host/dashboard/support"],
    },
    {
      id: 5,
      icon: <FiSettings size={22} />,
      text: "Setting",
      path: "/host/dashboard/settings",
      activePaths: ["/host/dashboard/settings"],
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
        <HostSidebar open={Open} setOpen={setOpen} sidebar={sideBar} />
        
        <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 xlg:ml-[300px]">
          <div className="flex flex-col flex-1 ">
            <HostNavbar open={Open} setOpen={setOpen} />
            <main className="flex-1 p-4 md:p-6">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default HostLayout;