import { FaEdit, FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";

const InventoryItem = ({ item, onDelete, onEdit }) => {
  const { name, quantity, supplier } = item;
  const stockColor = quantity < 10 ? "text-red-500" : "text-green-500";

  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-bold">{name}</h3>
      <p>
        Quantity: <span className={stockColor}>{quantity}</span>
      </p>
      <p>Supplier: {supplier.name}</p>
      <div className="mt-4 flex justify-end">
        <button onClick={() => onEdit(item)} className="mr-2 text-blue-500">
          <FaEdit />
        </button>
        <button onClick={() => onDelete(item)} className="text-red-500">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

InventoryItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    supplier: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default InventoryItem;
