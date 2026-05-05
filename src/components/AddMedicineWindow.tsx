type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddMedicine({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-5 space-y-5">

        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Add Medicine
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Fill in the details to create a new medicine record
          </p>
        </div>

        {/* Form */}
        <div className="grid grid-cols-2 gap-3">

          <input className="border border-gray-300 p-2 rounded-lg col-span-2" placeholder="Medicine Name" />
          <input className="border border-gray-300 p-2 rounded-lg" placeholder="Category" />
          <input className="border border-gray-300 p-2 rounded-lg" placeholder="Batch" />
          <input className="border border-gray-300 p-2 rounded-lg" placeholder="Stock" />
          <input className="border border-gray-300 p-2 rounded-lg" placeholder="Min Stock" />
          <input className="border border-gray-300 p-2 rounded-lg" type="date" />
          <input className="border border-gray-300 p-2 rounded-lg" placeholder="Price" />

        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-3">

          {/* Close */}
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
          >
            Close
          </button>

          {/* Add Button */}
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
          >
            Add Medicine
          </button>

        </div>

      </div>
    </div>
  );
}