export default function convertToDateTime(dateString: string): string {
    // Split date parts
    const [year, month, day] = dateString.split("-").map(Number);

    // Get the current time
    const now = new Date();

    // Construct a date object with the date from the string and the current time
    const date = new Date(year, month - 1, day, now.getHours(), now.getMinutes(), now.getSeconds());

    // Return in ISO format
    return date.toISOString();
}