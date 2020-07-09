import http from "./httpService";
import { apiEndPoint } from "../config.json";

export function getDepartments() {
  return http.get(`${apiEndPoint}/departments`);
}

export function getDepartment(id) {
  return http.get(`${apiEndPoint}/departments/${id}`);
}

export function addDepartment(department) {
  return http.post(`${apiEndPoint}/departments`, department);
}

export function updateDepartment(id, data) {
  return http.put(`${apiEndPoint}/departments/${id}`, data);
}

export function deleteDepartment(id) {
  return http.delete(`${apiEndPoint}/departments/${id}`);
}
