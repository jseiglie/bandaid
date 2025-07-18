# Client Utils Documentation

---

## validationUtils.js

### Overview
Provides validation functions for common input types (email, password, username, phone, date, URL).

#### Functions
- **validateEmail(email)**
  - Validates email format.
  - **Parameters:**
    - `email` (string)
  - **Returns:** Boolean

- **validatePassword(password)**
  - Validates password strength (8-16 chars, uppercase, lowercase, digit, special char).
  - **Parameters:**
    - `password` (string)
  - **Returns:** Boolean

- **validateUsername(username)**
  - Validates username (alphanumeric, 3-20 chars).
  - **Parameters:**
    - `username` (string)
  - **Returns:** Boolean

- **validatePhone(phone)**
  - Validates phone number (E.164 format).
  - **Parameters:**
    - `phone` (string)
  - **Returns:** Boolean

- **validateDate(date)**
  - Validates date (YYYY-MM-DD format).
  - **Parameters:**
    - `date` (string)
  - **Returns:** Boolean

- **validateURL(url)**
  - Validates URL format.
  - **Parameters:**
    - `url` (string)
  - **Returns:** Boolean

---

## spaceRemover.js

### Overview
String utility functions for removing spaces and underscores.

#### Functions
- **removeSpace(str)**
  - Removes spaces from a string.
  - **Parameters:**
    - `str` (string)
  - **Returns:** String

- **removeUnderscore(str)**
  - Removes underscores from a string.
  - **Parameters:**
    - `str` (string)
  - **Returns:** String

---

## response.js

### Overview
Creates standardized response objects for client-side API calls.

#### Functions
- **responseObject(statusCode, success, message, data)**
  - Generates a response object.
  - **Parameters:**
    - `statusCode` (number)
    - `success` (boolean)
    - `message` (string)
    - `data` (any)
  - **Returns:** Object

---

## fetcher.js

### Overview
Utility for making API requests to the backend.

#### Functions
- **fetcher(endpoint, options = {})**
  - Makes a fetch request to the API endpoint, returns parsed JSON or throws error.
  - **Parameters:**
    - `endpoint` (string): API endpoint
    - `options` (object): Fetch options
  - **Returns:** Promise resolving to response data

---

## extractor.js

### Overview
Extracts usernames from social media URLs and maps them to platforms.

#### Functions
- **extractUsernameSocialMedia(socialMedia)**
  - Extracts username from a social media URL and maps to known platforms.
  - **Parameters:**
    - `socialMedia` (string)
  - **Returns:** Object with platform and username

---

## chartUtils.js

### Overview
Utility functions for chart data manipulation and month calculations.

#### Functions
- **getMonthCounts(items)**
  - Returns an array of counts per month from items with `createdAt` dates.
  - **Parameters:**
    - `items` (array)
  - **Returns:** Array of counts (length 12)

---
