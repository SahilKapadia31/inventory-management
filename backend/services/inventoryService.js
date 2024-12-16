import Inventory from "../models/Inventory.js";

export const getAllInventory = async () => {
  return await Inventory.find().populate("supplier");
};

export const addInventoryItem = async (itemData) => {
  const newItem = new Inventory(itemData);
  return await newItem.save();
};

export const updateInventoryItem = async (itemId, itemData) => {
  return await Inventory.findByIdAndUpdate(itemId, itemData, { new: true });
};

export const deleteInventoryItem = async (itemId) => {
  return await Inventory.findByIdAndDelete(itemId);
};

export const bulkInsertInventory = async (items) => {
  return await Inventory.insertMany(items);
};
