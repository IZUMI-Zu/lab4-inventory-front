import { API_URL } from "./url";
import convertToDateTime from "../utils/time";

export interface FormValues {
    itemNumber: string;
    itemName: string;
    warehouseNumber: string;
    shelfNumber: string;
    storageTime: string;
}

export default async function postInventory(formData: FormValues, cardNumber: string, is_in_stock: boolean) {

    const formattedData = {
        item_number: formData.itemNumber,
        card_number: cardNumber,
        item_name: formData.itemName,
        warehouse_number: formData.warehouseNumber,
        shelf_number: formData.shelfNumber,
        storage_time: convertToDateTime(formData.storageTime),
        is_in_stock: is_in_stock
    };

    const res = await fetch(API_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(formattedData)
    });

    return await res.json()
}  