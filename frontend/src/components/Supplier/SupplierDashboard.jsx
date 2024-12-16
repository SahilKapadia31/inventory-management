import { useEffect, useState } from "react";
import SupplierForm from "./SupplierForm";
import { getSuppliers, deleteSupplier } from "../../services/supplierService";

const SupplierDashboard = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [editingSupplier, setEditingSupplier] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    const data = await getSuppliers();
    setSuppliers(data);
  };

  const handleDelete = async (id) => {
    await deleteSupplier(id);
    fetchSuppliers();
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
  };

  const handleFormSubmit = () => {
    setEditingSupplier(null);
    fetchSuppliers();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Supplier Dashboard</h2>
      <SupplierForm supplier={editingSupplier} onSubmit={handleFormSubmit} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suppliers.map((supplier) => (
          <div key={supplier._id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-bold">{supplier.name}</h3>
            <p>Contact: {supplier.contactDetails}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => handleEdit(supplier)}
                className="mr-2 text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(supplier._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplierDashboard;
