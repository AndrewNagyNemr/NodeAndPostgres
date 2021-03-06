import http from "./httpService";
import { apiEndPoint } from "../config.json";

export function getPromotions() {
  return http.get(`${apiEndPoint}/promotions`);
}

export function getPromotion(id) {
  return http.get(`${apiEndPoint}/promotions/${id}`);
}

export function addPromotion(promotion) {
  promotion.discount = parseInt(promotion.discount);
  return http.post(`${apiEndPoint}/promotions`, promotion);
}

export function updatePromotion(id,promotion) {
  promotion.discount = parseInt(promotion.discount);
  return http.put(`${apiEndPoint}/promotions/${id}`, promotion);
}

export function deletePromotion(id) {
  return http.delete(`${apiEndPoint}/promotions/${id}`);
}
