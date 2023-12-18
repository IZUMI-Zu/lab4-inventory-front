const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Item Number", uid: "item_number", sortable: true },
  { name: "Card Number", uid: "card_number", sortable: true },
  { name: "Item Name", uid: "item_name", sortable: true },
  { name: "Warehouse Number", uid: "warehouse_number", sortable: true },
  { name: "Shelf Number", uid: "shelf_number", sortable: true },
  { name: "Storage Time", uid: "storage_time", sortable: true },
  { name: "In Stock", uid: "is_in_stock", sortable: true },
];

const statusOptions = [
  {name: "True", uid: "true"},
  {name: "False", uid: "false"},
];


export {columns, statusOptions};
