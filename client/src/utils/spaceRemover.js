export const removeSpace = (str) => {
  if (typeof str !== "string") {
    return str;
  }
  return str.replace(/\s+/g, "_").toLowerCase();
}

export const removeUnderscore = (str) => {
  if (typeof str !== "string") {
    return str;
  }
  return str.replace(/_/g, " ").toLowerCase();
}