import styles from "./AppLayout.module.css";
import Map from "../components/map/Map";
import SideBar from "../components/sideBar/SideBar";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
    </div>
  );
}
