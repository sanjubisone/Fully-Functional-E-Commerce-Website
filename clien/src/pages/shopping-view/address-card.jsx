import { Pencil, Trash2 } from "lucide-react";

const AddressCard = ({ address, onEdit, onDelete }) => {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white space-y-2 relative">
      {address.isDefault && (
        <span className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
          Default
        </span>
      )}

      <div className="text-lg font-semibold">{address.fullName}</div>
      <div className="text-sm text-gray-600">{address.phoneNumber}</div>
      <div className="text-sm text-gray-700">
        {address.addressLine1}
        {address.addressLine2 ? `, ${address.addressLine2}` : ""}
      </div>
      <div className="text-sm text-gray-700">
        {address.city}, {address.state} - {address.postalCode}
      </div>
      <div className="text-sm text-gray-700">{address.country}</div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => onEdit(address)}
          className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
        >
          <Pencil size={16} />
          Edit
        </button>
        <button
          onClick={() => onDelete(address._id)}
          className="flex items-center gap-1 text-red-600 hover:underline text-sm"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
