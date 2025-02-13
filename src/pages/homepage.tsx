import { Link } from "react-router-dom";
import PageNav from "../components/pageNav/PageNav";

export default function homepage() {
  return (
    <div>
      <PageNav />
      <h1>WordWise</h1>
      <Link to="/app">Go to the app</Link>
    </div>
  );
}
