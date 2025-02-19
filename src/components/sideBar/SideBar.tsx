import AppNav from "../appNav/appNav";
import Logo from "../logo/Logo";
import styles from "./Sidebar.module.css";

export default function sideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <p>cities</p>
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          {" "}
          &copy; Copyright {new Date().getFullYear()} by Marina
        </p>
      </footer>
    </div>
  );
}
