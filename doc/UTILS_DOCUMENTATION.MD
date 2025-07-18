
# Utils Documentation

## response.js

### Overview
Utility for generating standardized API response objects.

#### Functions
- **responseObject(statusCode, success, message, data)**
  - Creates a response object for API responses.
  - **Parameters:**
    - `statusCode` (number): HTTP status code.
    - `success` (boolean): Success flag.
    - `message` (string): Message to client.
    - `data` (any): Response data.
  - **Returns:** Response object.

---

## randomUsername.js

### Overview
Generates a random username based on email and word lists.

#### Functions
- **randomUsername(email)**
  - Generates a random username for a given email.
  - **Parameters:**
    - `email` (string): User email.
  - **Returns:** Username (string).

---

## loadRoutes.js

### Overview
Dynamically loads and registers Express routes from the routes directory.

#### Functions
- **loadRoutes(app, basePath = "/api")**
  - Loads all route modules and registers them with the Express app.
  - **Parameters:**
    - `app` (object): Express app instance.
    - `basePath` (string): Base API path (default: "/api").
  - **Returns:** None.

---

## seeder.js

### Overview
Seeds the database with initial data for development/testing.

#### Functions
- **seedDatabase()**
  - Seeds all major tables with sample data.
  - **Parameters:** None
  - **Returns:** None (runs async operations to populate DB).
