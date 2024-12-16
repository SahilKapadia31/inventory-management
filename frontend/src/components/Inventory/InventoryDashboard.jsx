import { useEffect, useState } from "react";
import InventoryItem from "./InventoryItem";
import InventoryForm from "./InventoryForm";
import { getInventory, deleteInventory } from "../../services/inventoryService";

const InventoryDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const data = await getInventory();
    setInventory(data);
  };

  const handleDelete = async (id) => {
    await deleteInventory(id);
    fetchInventory();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleFormSubmit = () => {
    setEditingItem(null);
    fetchInventory();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Inventory Dashboard</h2>
      <InventoryForm item={editingItem} onSubmit={handleFormSubmit} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {inventory.map((item) => (
          <InventoryItem
            key={item._id}
            item={item}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default InventoryDashboard;
