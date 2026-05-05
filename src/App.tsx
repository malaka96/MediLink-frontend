import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Topbar from "./components/TopBar";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import InventoryManagement from "./pages/InventoryManagement";
import Reservations from "./pages/Reservations";

export default function App() {
  return (
    <BrowserRouter>
    <Topbar/>
      <Routes>
        <Route path="/" element={<Layout/>}>

          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="inventory" element={<InventoryManagement/>} />
          <Route path="reservation" element={<Reservations/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}