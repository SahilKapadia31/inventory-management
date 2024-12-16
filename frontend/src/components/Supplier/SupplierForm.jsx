import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { addSupplier, updateSupplier } from "../../services/supplierService";

const SupplierForm = ({ supplier, onSubmit }) => {
  const initialValues = supplier
    ? { name: supplier.name, contactDetails: supplier.contactDetails }
    : { name: "", contactDetails: "" };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    contactDetails: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (supplier) {
      await updateSupplier(supplier, values);
    } else {
      await addSupplier(values);
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
          <Field
            name="name"
            placeholder="Supplier Name"
            className="px-3 py-2 border rounded mb-2"
          />
          <Field
            name="contactDetails"
            placeholder="Contact Details"
            className="px-3 py-2 border rounded mb-2"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {supplier ? "Update" : "Add"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

SupplierForm.propTypes = {
  supplier: PropTypes.shape({
    name: PropTypes.string.isRequired,
    contactDetails: PropTypes.string.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default SupplierForm;
