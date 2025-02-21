import { Outlet } from "react-router-dom";
import AppNav from "../appNav/appNav";
import Logo from "../logo/Logo";
import styles from "./Sidebar.module.css";
import Footer from "../footer/footer";

export default function sideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}
