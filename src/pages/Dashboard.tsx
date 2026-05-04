export default function Dashboard() {
  const stats = [
    { label: 'Total Patients', value: '1,234', icon: '👥', color: 'bg-blue-500' },
    { label: 'Appointments Today', value: '28', icon: '📅', color: 'bg-green-500' },
    { label: 'Pending Tasks', value: '12', icon: '✓', color: 'bg-yellow-500' },
    { label: 'Revenue', value: '$4,500', icon: '💰', color: 'bg-purple-500' },
  ];

  const recentPatients = [
    { id: 1, name: 'John Doe', status: 'Active', lastVisit: '2 days ago' },
    { id: 2, name: 'Jane Smith', status: 'Active', lastVisit: '1 week ago' },
    { id: 3, name: 'Mike Johnson', status: 'Pending', lastVisit: '10 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 font-semibold">{stat.label}</h3>
                <span className="text-3xl">{stat.icon}</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <div className={`${stat.color} w-2 h-1 mt-4 rounded`}></div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Recent Patients */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Patients</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Last Visit</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPatients.map((patient) => (
                    <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{patient.name}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          patient.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{patient.lastVisit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                New Patient
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                Schedule Appointment
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                View Reports
              </button>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                Manage Settings
              </button>
            </div>
          </div>
        </div>

        {/* Activity Chart Section */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekly Activity</h2>
          <div className="flex items-end justify-between h-64 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div 
                  className="w-12 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg"
                  style={{ height: `${Math.random() * 200 + 50}px` }}
                ></div>
                <span className="text-sm font-semibold text-gray-600">{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
