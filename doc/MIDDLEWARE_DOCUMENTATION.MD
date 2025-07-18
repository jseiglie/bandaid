
# Middleware Documentation

## auth.middleware.js

### Overview
Authentication and token management middleware for API requests.

#### Functions
- **tokenGenerator(user)**
  - Generates a JWT token for a user.
  - **Parameters:**
    - `user` (object): User data.
  - **Returns:** JWT token (string).

- **tokenVerifier(token)**
  - Verifies a JWT token and checks blacklist.
  - **Parameters:**
    - `token` (string): JWT token.
  - **Returns:** Decoded token payload or throws error.

- **invalidateToken(token, logout=false)**
  - Blacklists a token (optionally on logout).
  - **Parameters:**
    - `token` (string): JWT token.
    - `logout` (boolean): If true, marks as logout.
  - **Returns:** None.

- **tokenExtractor(req)**
  - Extracts JWT token from request headers.
  - **Parameters:**
    - `req` (object): Express request object.
  - **Returns:** Token (string).

- **tokenMiddleware(req, res, next)**
  - Express middleware to verify token and attach user info.
  - **Parameters:**
    - `req`, `res`, `next`: Express objects.
  - **Returns:** Calls next() or sends error response.

---

## multer.middleware.js

### Overview
File upload middleware using Multer for handling multipart/form-data.

#### Usage
- Provides configuration and middleware for file uploads.
- **Exports:** `multerMiddleware` object for use in Express routes.

---