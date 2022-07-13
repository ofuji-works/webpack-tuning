import { lazy } from "react";
import ReactDom from "react-dom";
// import Home from "./pages/Home";

const Home = lazy(() => import("./pages/Home"));

const Root = () => {
  return <Home />;
};

ReactDom.render(<Root />, document.getElementById("root"));
