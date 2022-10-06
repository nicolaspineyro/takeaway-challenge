import { RoutesData } from "src/constants";
import { RouteObject } from "src/constants/interfaces";
import { Route, Routes } from "react-router-dom";
import { Header, Footer } from "./components";
import "src/styles/main.scss";

const App = () => {
  const renderRoutes = RoutesData.map((routeProps: RouteObject, index) => (
    <Route {...routeProps} key={`route-${index}`} />
  ));
  return (
    <>
      <Header />
      <Routes>{renderRoutes}</Routes>
      <Footer />
    </>
  );
};

export default App;
