# Services Documentation

---

## adminServices.js

### Overview
Handles admin-related API calls.

#### Methods

- **getPremiumUsers()**
  - Fetches premium users grouped by month.
  - **Parameters:** None
  - **Returns:** `Promise<Object[]>` (array of `{ name, count }`)

---

## userServices.js

### Overview
Handles user authentication and user data retrieval.

#### Methods

- **getUsers()**
  - Fetches all users.
  - **Parameters:** None
  - **Returns:** `Promise<Object[]>`

- **auth(login, formData)**
  - Authenticates or registers a user.
  - **Parameters:**
    - `login` (`boolean`): If true, logs in; if false, registers.
    - `formData` (`object`): Should contain user credentials or registration info, e.g. `{ email: string, password: string, username?: string }`
  - **Returns:** `Promise<Object>`

- **logout()**
  - Logs out the current user.
  - **Parameters:** None
  - **Returns:** `Promise<Object>`

---

## stripeServices.js

### Overview
Handles Stripe payment and subscription operations.

#### Methods

- **createPaymentIntent(items)**
  - Creates a Stripe payment intent.
  - **Parameters:**
    - `items` (`array`): Array of items to purchase, e.g. `[ { id: string, quantity: number } ]`
  - **Returns:** `Promise<Object>`

- **createSubscription(email, paymentMethodId, priceId)**
  - Creates a Stripe subscription.
  - **Parameters:**
    - `email` (`string`): User's email address.
    - `paymentMethodId` (`string`): Stripe payment method ID.
    - `priceId` (`string`): Stripe price ID for the subscription.
  - **Returns:** `Promise<Object>`

---

## songServices.js

### Overview
Handles song-related API calls.

#### Methods

- **getSongs()**
  - Fetches all songs.
  - **Parameters:** None
  - **Returns:** `Promise<Object[]>`

---

## setListServices.js

### Overview
Handles set list-related API calls.

#### Methods

- **getSetLists(id)**
  - Fetches set lists for a given ID.
  - **Parameters:**
    - `id` (`string` or `number`): The set list ID.
  - **Returns:** `Promise<Object[]>`

---

## liveServices.js

### Overview
Handles live event-related API calls.

#### Methods

- **getLives()**
  - Fetches all live events.
  - **Parameters:** None
  - **Returns:** `Promise<Object[]>`

---

## emailServices.js

### Overview
Handles email notification API calls.

#### Methods

- **sendEmailNotification(emailData)**
  - Sends an email notification.
  - **Parameters:**
    - `emailData` (`object`): Should contain email details, e.g. `{ to: string, subject: string, message: string }`
  - **Returns:** `Promise<Object>`

---

## contactServices.js

### Overview
Handles contact form submissions.

#### Methods

- **sendContactForm(formData)**
  - Sends contact form data.
  - **Parameters:**
    - `formData` (`object`): Should contain contact form fields, e.g. `{ name: string, email: string, message: string }`
  - **Returns:** `Promise<Object>`

---

## bandServices.js

### Overview
Handles band-related API calls.

#### Methods

- **getBands()**
  - Fetches all bands.
  - **Parameters:** None
  - **Returns:** `Promise<Object[]>`

---
