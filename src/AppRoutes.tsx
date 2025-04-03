import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import SearchPage from "./pages/SearchPage";
import AuthCallbackPage from "./pages/AuthCallbackPage";

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/search/:value" element={<Layout><SearchPage/></Layout>} /> 
      <Route path="*" element={<Navigate to={"/"} />} />
      <Route path="/auth-callback" element={<AuthCallbackPage/>} />
    </Routes>
  );
};

export default AppRoutes;
