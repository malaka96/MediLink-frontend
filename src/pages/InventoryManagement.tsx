export default function InventoryManagement() {
  const inventory = [
    { id: 1, name: 'Medication A', quantity: 450, unit: 'pills', status: 'In Stock', icon: '💊' },
    { id: 2, name: 'Medication B', quantity: 12, unit: 'bottles', status: 'Low Stock', icon: '💊' },
    { id: 3, name: 'Medical Supplies', quantity: 89, unit: 'units', status: 'In Stock', icon: '🩹' },
    { id: 4, name: 'Equipment X', quantity: 3, unit: 'pieces', status: 'Low Stock', icon: '⚙️' },
    { id: 5, name: 'Syringes', quantity: 1200, unit: 'units', status: 'In Stock', icon: '💉' },
    { id: 6, name: 'Bandages', quantity: 50, unit: 'boxes', status: 'Critical', icon: '🩹' },
  ];

  const categories = [
    { name: 'Medications', count: 45, icon: '💊' },
    { name: 'Medical Supplies', count: 23, icon: '🩹' },
    { name: 'Equipment', count: 12, icon: '⚙️' },
    { name: 'Consumables', count: 34, icon: '🧴' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Inventory Management</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
            + Add Item
          </button>
        </div>

        {/* Category Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {categories.map((category, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">{category.count}</p>
              <p className="text-sm text-gray-600 mt-2">items in category</p>
            </div>
          ))}
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-900">Current Inventory</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Item</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Quantity</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Unit</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="font-semibold text-gray-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 font-semibold">{item.quantity}</td>
                    <td className="py-4 px-6 text-gray-600">{item.unit}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        item.status === 'In Stock' 
                          ? 'bg-green-100 text-green-800'
                          : item.status === 'Low Stock'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button className="text-blue-600 hover:text-blue-800 font-semibold">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Total Items</h3>
            <p className="text-4xl font-bold">2,145</p>
            <p className="text-blue-100 text-sm mt-2">across all categories</p>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Low Stock Items</h3>
            <p className="text-4xl font-bold">8</p>
            <p className="text-yellow-100 text-sm mt-2">need reordering soon</p>
          </div>
          
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Critical Stock</h3>
            <p className="text-4xl font-bold">2</p>
            <p className="text-red-100 text-sm mt-2">immediate action required</p>
          </div>
        </div>
      </div>
    </div>
  )
}
