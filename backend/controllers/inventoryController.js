import Inventory from "../models/Inventory.js";
import { exportToCSV, importFromCSV } from "../services/csvService.js";
import {
  getAllInventory,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  // getLowStockItems,
  bulkInsertInventory,
} from "../services/inventoryService.js";

export const getInventory = async (req, res) => {
  try {
    const inventory = await getAllInventory();
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addInventory = async (req, res) => {
  try {
    const savedItem = await addInventoryItem(req.body);
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateInventory = async (req, res) => {
  try {
    const updatedItem = await updateInventoryItem(req.params.id, req.body);
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteInventory = async (req, res) => {
  try {
    await deleteInventoryItem(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const exportInventory = async (req, res) => {
  try {
    const inventory = await getAllInventory();
    const fields = [
      "name",
      "quantity",
      "supplier.name",
      "supplier.contactDetails",
    ];
    const csv = await exportToCSV(inventory, fields);
    res.attachment("inventory.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const importInventory = async (req, res) => {
  try {
    const results = await importFromCSV(req.file.path);
    const importedItems = await bulkInsertInventory(results);
    res.json({ message: "Import successful", importedItems });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLowStock = async (req, res) => {
  try {
    const lowStockItems = await Inventory.aggregate([
      {
        $addFields: {
          lowStock: { $lt: ["$quantity", "$lowStockThreshold"] },
        },
      },
      {
        $match: { lowStock: true },
      },
    ]).exec();
    res.json(lowStockItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
