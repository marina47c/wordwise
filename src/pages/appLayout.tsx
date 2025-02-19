import styles from "./AppLayout.module.css";
import Map from "../components/map/map";
import SideBar from "../components/sideBar/sideBar";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
    </div>
  );
}
