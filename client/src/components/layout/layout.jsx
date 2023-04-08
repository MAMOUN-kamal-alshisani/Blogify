import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

function Layout() {
  return (
    <>
      <Navbar />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
export default Layout;
