import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TopBar from './components/TopBar'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import InventoryManagement from './pages/InventoryManagement'
import Reservations from './pages/Reservations'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <TopBar />
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<InventoryManagement />} />
            <Route path="/reservations" element={<Reservations />} />
          </Routes>
        </main>
        <footer className="bg-gray-900 text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400">© 2026 MediLink. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
