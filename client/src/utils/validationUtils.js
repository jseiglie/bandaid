const validationUtils = {};


validationUtils.validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

validationUtils.validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
}

validationUtils.validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9]{3,20}$/; // Alphanumeric and 3-20 characters
  return usernameRegex.test(username);
}

validationUtils.validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
  return phoneRegex.test(phoneNumber);
}

validationUtils.validateDate = (date) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
  return dateRegex.test(date);
}

validationUtils.validateURL = (url) => {
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/; // Basic URL format
    return urlRegex.test(url);
    }

validationUtils.validateJSONResponse = (contentType, endpoint) => {
    if (!contentType || !contentType.includes("application/json")) {
        console.error("Expected JSON response NOT received at " + endpoint);
        return new Error("Expected JSON response NOT received");
    }
}


export default validationUtils;