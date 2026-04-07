import Footer from "@/shared/footer/Footer";
import Navbar from "@/shared/navbar/Navbar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useUserProfile } from "@/hooks/fetchUserProfile";

const Layout = () => {
  useUserProfile();
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
