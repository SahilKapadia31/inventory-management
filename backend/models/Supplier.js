import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactDetails: {
    type: String,
    required: true,
  },
});

const Supplier = mongoose.model("Supplier", SupplierSchema);

export default Supplier;
