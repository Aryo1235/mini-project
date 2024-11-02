import axios from "axios";

const api = axios.create({
  baseURL: "https://6718aacc7fc4c5ff8f4a7ab2.mockapi.io/energy",
});

export const getEnergyData = () => api.get("/");
export const getEnergyDataById = (id) => api.get(`/${id}`);
export const addEnergyData = (data) => api.post("/", data);
export const updateEnergyData = (id, data) => api.put(`/${id}`, data);
export const deleteEnergyData = (id) => api.delete(`/${id}`);
