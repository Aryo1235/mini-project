import axios from "axios";

const instance = axios.create({
  baseURL: "https://6718aacc7fc4c5ff8f4a7ab2.mockinstance.io/energy",
});

export const getEnergyData = () => instance.get("/");
export const getEnergyDataById = (id) => instance.get(`/${id}`);
export const addEnergyData = (data) => instance.post("/", data);
export const updateEnergyData = (id, data) => instance.put(`/${id}`, data);
export const deleteEnergyData = (id) => instance.delete(`/${id}`);
