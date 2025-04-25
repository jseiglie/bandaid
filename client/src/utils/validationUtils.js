const validationUtils = {};


validationUtils.validateEmail = (email) => {
  if (!email) {
    return false;
  }
  if (email.length > 254) {
    return false;
  }
  if (email.length < 5) {
    return false;
  }
  const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/ // Basic email format
  return emailRegex.test(email);
}

validationUtils.validatePassword = (password) => {
  if (!password) {
    return false;
  }
  if (password.length < 6) {
    return false;
  }
  const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;
  return passwordRegex.test(password);
}

validationUtils.validateUsername = (username) => {
  if (!username) {
    return false;
  }
  if (username.length < 3 || username.length > 20) {
    return false;
  }
  if (username.includes(" ")) {
    return false;
  }

  
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