import api from "./api";

export const getSuppliers = async () => {
  const response = await api.get("/suppliers/get");
  return response.data;
};

export const addSupplier = async (supplier) => {
  const response = await api.post("/suppliers/add", supplier);
  return response.data;
};

export const updateSupplier = async (id, supplier) => {
  const response = await api.put(`/suppliers/update/${id}`, supplier);
  return response.data;
};

export const deleteSupplier = async (id) => {
  const response = await api.delete(`/suppliers/delete/${id}`);
  return response.data;
};
