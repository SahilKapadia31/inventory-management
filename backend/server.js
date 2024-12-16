import express from "express";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

import inventoryRoutes from "./routes/inventoryRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/inventory", inventoryRoutes);
app.use("/api/suppliers", supplierRoutes);

const PORT = ENV_VARS.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});
