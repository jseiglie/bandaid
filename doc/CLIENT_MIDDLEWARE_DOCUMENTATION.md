# Client Middleware Documentation

---

## auth.js

### Overview
Client-side authentication utility for checking user login status.

#### Functions
- **auth.check()**
  - Checks if the user is authenticated by verifying the token in localStorage and making a request to `/api/auth/check`.
  - **Parameters:** None
  - **Returns:** Promise resolving to authentication status (response from API).

---
