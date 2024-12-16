import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addInventory, updateInventory } from "../../services/inventoryService";
import { getSuppliers } from "../../services/supplierService";

const InventoryForm = ({ item, onSubmit }) => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    const data = await getSuppliers();
    setSuppliers(data);
  };

  const initialValues = item
    ? { name: item.name, quantity: item.quantity, supplier: item.supplier._id }
    : { name: "", quantity: "", supplier: "" };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    quantity: Yup.number().required("Required"),
    supplier: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (item) {
      await updateInventory(item, values);
    } else {
      await addInventory(values);
    }
    resetForm();
    setSubmitting(false);
    onSubmit();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="mb-4">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Item Name
            </label>
            <Field
              id="name"
              name="name"
              placeholder="Item Name"
              className="mt-1 px-3 py-2 border rounded w-full"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <Field
              id="quantity"
              name="quantity"
              type="number"
              placeholder="Quantity"
              className="mt-1 px-3 py-2 border rounded w-full"
            />
            <ErrorMessage
              name="quantity"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="supplier"
              className="block text-sm font-medium text-gray-700"
            >
              Supplier
            </label>
            <Field
              id="supplier"
              name="supplier"
              as="select"
              className="mt-1 px-3 py-2 border rounded w-full"
            >
              <option value="">Select Supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.name}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="supplier"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {item ? "Update" : "Add"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

InventoryForm.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    supplier: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }).isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default InventoryForm;
