import { Link } from "react-router-dom";
import PageNav from "../components/pageNav/PageNav";
import AppNav from "../components/appNav/appNav";

export default function homepage() {
  return (
    <div>
      <PageNav />
      <AppNav />
      <h1>WordWise</h1>
      <Link to="/app">Go to the app</Link>
    </div>
  );
}
