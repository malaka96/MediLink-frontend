export default function Reservations() {
  const reservations = [
    { id: 1, patient: 'John Doe', date: '2026-05-05', time: '10:00 AM', doctor: 'Dr. Smith', status: 'Confirmed', icon: '✓' },
    { id: 2, patient: 'Jane Smith', date: '2026-05-05', time: '02:00 PM', doctor: 'Dr. Johnson', status: 'Pending', icon: '⏳' },
    { id: 3, patient: 'Mike Johnson', date: '2026-05-06', time: '09:30 AM', doctor: 'Dr. Williams', status: 'Confirmed', icon: '✓' },
    { id: 4, patient: 'Sarah Davis', date: '2026-05-06', time: '03:30 PM', doctor: 'Dr. Brown', status: 'Cancelled', icon: '✕' },
  ];

  const availableSlots = [
    { doctor: 'Dr. Smith', date: '2026-05-05', slots: 3 },
    { doctor: 'Dr. Johnson', date: '2026-05-05', slots: 5 },
    { doctor: 'Dr. Williams', date: '2026-05-06', slots: 2 },
    { doctor: 'Dr. Brown', date: '2026-05-06', slots: 4 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Reservations</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
            + New Reservation
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-3">📅</div>
            <h3 className="text-lg font-semibold text-gray-700">Total Reservations</h3>
            <p className="text-4xl font-bold text-blue-600 mt-2">124</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-3">✓</div>
            <h3 className="text-lg font-semibold text-gray-700">Confirmed</h3>
            <p className="text-4xl font-bold text-green-600 mt-2">98</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-3">⏳</div>
            <h3 className="text-lg font-semibold text-gray-700">Pending</h3>
            <p className="text-4xl font-bold text-yellow-600 mt-2">26</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Reservations List */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Reservations</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Patient</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Date & Time</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Doctor</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((res) => (
                    <tr key={res.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-gray-900">{res.patient}</td>
                      <td className="py-4 px-6 text-gray-600">
                        <div className="text-sm">{res.date}</div>
                        <div className="font-semibold text-gray-900">{res.time}</div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{res.doctor}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 w-fit ${
                          res.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-800'
                            : res.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          <span className="text-lg">{res.icon}</span>
                          {res.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Available Slots */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Slots</h2>
            <div className="space-y-4">
              {availableSlots.map((slot, idx) => (
                <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
                  <h3 className="font-semibold text-gray-900">{slot.doctor}</h3>
                  <p className="text-sm text-gray-600 mt-1">{slot.date}</p>
                  <p className="text-lg font-bold text-blue-600 mt-2">{slot.slots} slots available</p>
                  <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors text-sm">
                    Reserve
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Calendar View</h2>
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-bold text-gray-600 py-2">{day}</div>
            ))}
            {Array.from({ length: 35 }).map((_, idx) => (
              <div 
                key={idx} 
                className={`p-2 text-center rounded border ${
                  idx < 5 ? 'text-gray-400 border-gray-100' :
                  idx > 30 ? 'text-gray-400 border-gray-100' :
                  Math.random() > 0.7 ? 'border-blue-500 bg-blue-50 font-bold text-blue-600' :
                  'border-gray-200'
                }`}
              >
                {idx < 5 ? idx + 27 : idx > 30 ? idx - 30 : idx - 4}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
