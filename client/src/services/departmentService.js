import http from "./httpService";
import { apiEndPoint } from "../config.json";

export function getDepartments() {
  return http.get(`${apiEndPoint}/departments`);
}

// export function absentToday(childId) {
//   const date = moment().format("YYYY-MM-DD");
//   return http.post(`${apiEndPoint}/attendance/create`, {
//     child: childId,
//     date,
//     state: "Absent",
//   });
// }

// export function notAbsentToday(childId) {
//   const date = moment().format("YYYY-MM-DD");
//   return http.post(`${apiEndPoint}/attendance/create`, {
//     child: childId,
//     date,
//     state: "Present",
//   });
// }

// export function getChildAbcence(id) {
//   return http.get(`${apiEndPoint}/attendance/child/${id}`);
// }
