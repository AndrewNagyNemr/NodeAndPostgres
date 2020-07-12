import http from "./httpService";
import { apiEndPoint } from "../config.json";

export function getProducts() {
  return http.get(`${apiEndPoint}/products`);
}

export function getProduct(id) {
  return http.get(`${apiEndPoint}/products/${id}`);
}

export function addProduct(product) {
  product.price = parseInt(product.price);
  product.dep_id = parseInt(product.dep_id);
  return http.post(`${apiEndPoint}/products`, product);
}

export function updateProduct(id, product) {
  product.price = parseInt(product.price);
  product.dep_id = parseInt(product.dep_id);
  return http.put(`${apiEndPoint}/products/${id}`, product);
}

export function deleteProduct(id) {
  return http.delete(`${apiEndPoint}/products/${id}`);
}
