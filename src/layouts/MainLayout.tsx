import Footer from "@/components/custom/shared/Footer";
import Navbar from "@/components/custom/shared/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <section className="px-6 lg:px-10 py-4" >
        <Outlet />
      </section>
      <Footer />
    </>
  );
};

export default MainLayout;