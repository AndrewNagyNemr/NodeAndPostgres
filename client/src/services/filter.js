export function filterProducts(products, departments, selectedDepartment) {
  if (selectedDepartment === "All") return products;
  const selectedDepartment_id = departments.find(
    (d) => d.name === selectedDepartment
  ).department_id;
  return products.filter((p) => p.dep_id === selectedDepartment_id);
}
