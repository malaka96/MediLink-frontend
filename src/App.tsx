import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Topbar from "./components/TopBar";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import InventoryManagement from "./pages/InventoryManagement";
import Reservations from "./pages/Reservations";
import UserManagement from "./pages/UserManagement";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";

function AppFrame() {
  const location = useLocation();
  const showChrome = location.pathname !== "/login";

  return (
    <>
      {showChrome ? <Topbar /> : null}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* <Route index element={<Navigate to="dashboard" replace />} /> */}

          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="inventory" element={<InventoryManagement/>} />
          <Route path="reservation" element={<Reservations/>} />
          <Route path="user-management" element={<UserManagement/>} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppFrame />
    </BrowserRouter>
  );
}
