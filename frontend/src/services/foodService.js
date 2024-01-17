import axios from "axios";

// we'r importing it here as we need to link it with backend
// as we no longer have data.js file in frontend foler anymore

export const getAll = async () => {
  const { data } = await axios.get("/api/foods");
  return data;
};

export const search = async (searchTerm) => {
  const { data } = await axios.get("/api/foods/search/" + searchTerm);
  return data;
};

export const getAllTags = async () => {
  const { data } = await axios.get("/api/foods/tags");
  return data;
};

// food will be filtered on the basis of the tags
export const getAllByTag = async (tag) => {
  if (tag === "All") return getAll();
  const { data } = await axios.get("/api/foods/tag/" + tag);
  return data;
};

export const getById = async (foodId) => {
  const { data } = await axios.get("/api/foods/" + foodId);
  return data;
};
