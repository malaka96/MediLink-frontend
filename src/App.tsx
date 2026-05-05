import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Topbar from "./components/TopBar";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
    <Topbar/>
      <Routes>
        <Route path="/" element={<Layout/>}>

          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="inventory" element={<h1>Inventory Management</h1>} />
          <Route path="reservation" element={<h1>Reservation</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}