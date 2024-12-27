import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import SearchPage from "./pages/SearchPage";

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/search/:value" element={<Layout><SearchPage/></Layout>} /> 
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default AppRoutes;
