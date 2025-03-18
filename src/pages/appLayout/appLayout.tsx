import styles from './AppLayout.module.css';
import SideBar from '../../components/sideBar/SideBar';
import Map from '../../components/map/Map';
import User from '../../components/user/user';

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
      <User />
    </div>
  );
}
