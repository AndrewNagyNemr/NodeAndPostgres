import http from "./httpService";
import { apiEndPoint } from "../config.json";

export function getProducts() {
  return http.get(`${apiEndPoint}/products`);
}

export function getProduct(id) {
  return http.get(`${apiEndPoint}/products/${id}`);
}

export function addProduct(product) {
  return http.post(`${apiEndPoint}/products`, product);
}

export function updateProduct(id, data) {
  return http.put(`${apiEndPoint}/products/${id}`, data);
}

export function deleteProduct(id) {
  return http.delete(`${apiEndPoint}/products/${id}`);
}