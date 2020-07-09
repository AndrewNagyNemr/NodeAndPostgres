export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  const arr = [];
  for (let i = startIndex; i < startIndex + pageSize && i < items.length; i++) {
    arr.push(items[i]);
  }
  return arr;
}
