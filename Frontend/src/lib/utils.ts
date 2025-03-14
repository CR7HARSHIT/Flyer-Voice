import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function convertUTCtoReadable(utcTimestamp) {
  const date = new Date(utcTimestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric', // 'numeric' is a valid value
    month: 'long', // 'long' is a valid value
    day: 'numeric', // 'numeric' is a valid value
    hour: '2-digit', // '2-digit' is a valid value
    minute: '2-digit', // '2-digit' is a valid value
    hour12: false  // Ensures 24-hour format (false means no AM/PM)
};
        return date.toLocaleString('en-GB', options); 
}

export function convertUTCtoDate(utcTimestamp) {
  // Create a new Date object from the UTC timestamp
  const date = new Date(utcTimestamp);

  // Format the date into a readable string (day month year)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric', // 'numeric' is a valid value
    month: 'long', // 'long' is a valid value
    day: 'numeric', // 'numeric' is a valid value
  
};

  // Return the date in readable format
   return date.toLocaleString('en-GB', options);
}

export function calculateFlightDuration(arrivalUTC: string, departureUTC: string): string {
  // Convert UTC timestamps to Date objects
  const arrivalDate: Date = new Date(arrivalUTC);
  const departureDate: Date = new Date(departureUTC);

  // Calculate the difference in milliseconds
  const durationInMillis = departureDate.getTime() - arrivalDate.getTime();

  // Convert the duration from milliseconds to hours and minutes
  const hours = Math.floor(durationInMillis / (1000 * 60 * 60)); // Hours
  const minutes = Math.floor((durationInMillis % (1000 * 60 * 60)) / (1000 * 60)); // Minutes

  // Return the formatted duration as "Xh Ym"
  return `${hours}h ${minutes}m`;
}

// Example usage:
const arrivalUTC = "2025-03-13T01:49:00Z"; // Arrival time (UTC)
const departureUTC = "2025-03-13T15:30:00Z"; // Departure time (UTC)

const flightDuration = calculateFlightDuration(arrivalUTC, departureUTC);
console.log(flightDuration); // Example output: "13h 41m"
