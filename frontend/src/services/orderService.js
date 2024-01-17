import axios from "axios";

// will get the order from the checkout page and post it on the server
export const createOrder = async (order) => {
  try {
    const { data } = axios.post("/api/orders/create", order);
    return data;
  } catch (error) {}
};

export const getNewOrderForCurrentUser = async () => {
  const { data } = await axios.get("/api/orders/newOrderForCurrentUser");
  return data;
};

export const pay = async (paymentId) => {
  try {
    const { data } = await axios.put("/api/orders/pay", { paymentId });
    return data;
  } catch (error) {}
};

export const trackOrderById = async (orderId) => {
  const { data } = await axios.get("/api/orders/track/" + orderId);
  return data;
};

export const getAll = async (state) => {
  const { data } = await axios.get(`/api/orders/${state ?? ""}`);
  return data;
};
