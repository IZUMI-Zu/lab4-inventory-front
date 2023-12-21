import {API_URL} from "./url";

export interface InventoryType {
    item_number: string;
    card_number: string;
    item_name: string;
    warehouse_number: string;
    shelf_number: string;
    storage_time: string;
    is_in_stock: boolean;
}


export default async function updateInventory(inventory: InventoryType) {
  try {
    const response = await fetch(
      `${API_URL}/${inventory.item_number}`,
      {
        method: "PUT",
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inventory)
      }
    );

    if (!response.ok) {
      throw new Error("Error updating inventory: " + response.status);
    }

    const data = await response.json();
    // Use the data here. For example:

    return data;
  } catch (error) {
    console.error("Error updating inventory:", error);
    return [];
  }
}
