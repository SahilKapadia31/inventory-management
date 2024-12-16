import api from "./api";

export const getInventory = async () => {
  const response = await api.get("/inventory/get");
  return response.data;
};

export const addInventory = async (item) => {
  const response = await api.post("/inventory/add", item);
  return response.data;
};

export const updateInventory = async (id, item) => {
  const response = await api.put(`/inventory/update/${id}`, item);
  return response.data;
};

export const deleteInventory = async (id) => {
  const response = await api.delete(`/inventory/delete/${id}`);
  return response.data;
};
