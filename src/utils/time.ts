export function getNextClosestTime() {
  var now = new Date();
  var minutes = now.getMinutes();

  // Round to the next closest 30-minute interval
  var roundedMinutes = Math.ceil(minutes / 30) * 30;

  // Adjust hours if rounding exceeds 60 minutes
  var hours = now.getHours() + Math.floor(roundedMinutes / 60);
  roundedMinutes %= 60;

  // Convert to 12-hour format
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 to 12

  // Format the result as h:mm AM/PM (omit leading zero for single-digit hours)
  var formattedTime = hours + ":" + ("0" + roundedMinutes).slice(-2) + ampm;

  return formattedTime;
}
