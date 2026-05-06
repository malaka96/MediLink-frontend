import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">MediLink</div>
          <ul className="flex gap-6 items-center">
            <li>
              <Link 
                to="/" 
                className="hover:text-blue-200 transition-colors font-medium"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/inventory" 
                className="hover:text-blue-200 transition-colors font-medium"
              >
                Inventory
              </Link>
            </li>
            <li>
              <Link 
                to="/reservations" 
                className="hover:text-blue-200 transition-colors font-medium"
              >
                Reservations
              </Link>
            </li>
            <li>
              <Link 
                to="/user-management" 
                className="hover:text-blue-200 transition-colors font-medium"
              >
                User Management
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
