import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
  },
  lowStockThreshold: {
    type: Number,
    default: 10,
  },
});

const Inventory = mongoose.model("Inventory", InventorySchema);

export default Inventory;
