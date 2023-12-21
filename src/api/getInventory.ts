import {API_URL} from "./url";

export interface InventoryType {
  id: number;
  item_number: string;
  card_number: string;
  item_name: string;
  warehouse_number: string;
  shelf_number: string;
  storage_time: string;
  is_in_stock: boolean;
}

export default async function getInventory() {
  try {
    const response = await fetch(
      API_URL.concat("?offset=0"),
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching inventory: " + response.status);
    }

    const data = await response.json();
    // Use the data here. For example:

    return data;
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return [];
  }
}
