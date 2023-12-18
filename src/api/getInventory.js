import {API_URL} from "./url.js";

export default async function getInventory() {
  const response = await fetch(
    API_URL.concat("?limit=1000&offset=0"),
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
};

