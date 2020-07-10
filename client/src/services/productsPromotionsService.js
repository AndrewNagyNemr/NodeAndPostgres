import http from "./httpService";
import { apiEndPoint } from "../config.json";

export function getProductsPromos() {
  return http.get(`${apiEndPoint}/products-promotions`);
}

export function getProductPromos(product_id) {
  return http.get(`${apiEndPoint}/products-promotions/${product_id}`);
}

export function addProductPromo(product_id, promotion_id) {
  return http.post(`${apiEndPoint}/products-promotions`, {
    product_id,
    promotion_id,
  });
}

export function deleteProductPromo(product_id, promotion_id) {
  return http.delete(
    `${apiEndPoint}/products-promotions/${product_id}/${promotion_id}`
  );
}
