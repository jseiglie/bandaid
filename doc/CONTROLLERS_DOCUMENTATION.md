# Controllers Documentation

---

## VenueScoresController

### Overview
Handles venue score API endpoints.

#### Endpoints
- **GET /venueScores**
  - Gets all venue scores.
  - **Parameters:** None
  - **Returns:** Array of venue scores.

- **GET /venueScores/:id**
  - Gets a venue score by ID.
  - **Parameters:**
    - `id` (string or number): Venue score ID (from URL params).
  - **Returns:** Venue score object.

- **POST /venueScores**
  - Creates a venue score.
  - **Parameters:**
    - Request body: Venue score data (object).
  - **Returns:** Created venue score object.

- **PUT /venueScores/:id**
  - Updates a venue score.
  - **Parameters:**
    - `id` (string or number): Venue score ID (from URL params).
    - Request body: Updated venue score data (object).
  - **Returns:** Updated venue score object.

- **DELETE /venueScores/:id**
  - Deletes a venue score.
  - **Parameters:**
    - `id` (string or number): Venue score ID (from URL params).
  - **Returns:** Success status.

---

## VenuesController

### Overview
Handles venue API endpoints.

#### Endpoints
- **GET /venues**
  - Gets all venues.
  - **Parameters:** None
  - **Returns:** Array of venues.

- **GET /venues/:id**
  - Gets a venue by ID.
  - **Parameters:**
    - `id` (string or number): Venue ID (from URL params).
  - **Returns:** Venue object.

- **POST /venues**
  - Creates a venue.
  - **Parameters:**
    - Request body: Venue data (object).
  - **Returns:** Created venue object.

- **PUT /venues/:id**
  - Updates a venue.
  - **Parameters:**
    - `id` (string or number): Venue ID (from URL params).
    - Request body: Updated venue data (object).
  - **Returns:** Updated venue object.

- **DELETE /venues/:id**
  - Deletes a venue.
  - **Parameters:**
    - `id` (string or number): Venue ID (from URL params).
  - **Returns:** Success status.

---

## VenueOwnersController

### Overview
Handles venue owner API endpoints.

#### Endpoints
- **GET /venueOwners**
  - Gets all venue owners.
  - **Parameters:** None
  - **Returns:** Array of venue owners.

- **GET /venueOwners/:id**
  - Gets a venue owner by ID.
  - **Parameters:**
    - `id` (string or number): Venue owner ID (from URL params).
  - **Returns:** Venue owner object.

- **POST /venueOwners**
  - Creates a venue owner.
  - **Parameters:**
    - Request body: Venue owner data (object).
  - **Returns:** Created venue owner object.

- **PUT /venueOwners/:id**
  - Updates a venue owner.
  - **Parameters:**
    - `id` (string or number): Venue owner ID (from URL params).
    - Request body: Updated venue owner data (object).
  - **Returns:** Updated venue owner object.

- **DELETE /venueOwners/:id**
  - Deletes a venue owner.
  - **Parameters:**
    - `id` (string or number): Venue owner ID (from URL params).
  - **Returns:** Success status.

---

## UserController

### Overview
Handles user API endpoints (authentication, profile, CRUD).

#### Endpoints
- **POST /logout**
  - Logs out a user.
  - **Parameters:**
    - JWT token (from request header or cookie).
  - **Returns:** Success status and message.

- **GET /users**
  - Gets all users.
  - **Parameters:** None
  - **Returns:** Array of users.

- **GET /users/:id**
  - Gets a user by ID.
  - **Parameters:**
    - `id` (string or number): User ID (from URL params).
  - **Returns:** User object.

- **PUT /users/:id**
  - Updates a user.
  - **Parameters:**
    - `id` (string or number): User ID (from URL params).
    - Request body: Updated user data (object).
  - **Returns:** Updated user object.

- **DELETE /users/:id**
  - Deletes a user.
  - **Parameters:**
    - `id` (string or number): User ID (from URL params).
  - **Returns:** Success status.

- **GET /users/email/:email**
  - Gets a user by email.
  - **Parameters:**
    - `email` (string): User email (from URL params).
  - **Returns:** User object.

- **GET /users/username/:username**
  - Gets a user by username.
  - **Parameters:**
    - `username` (string): Username (from URL params).
  - **Returns:** User object.

- **POST /login**
  - Authenticates a user.
  - **Parameters:**
    - Request body: `{ identifier: string, password: string }`
  - **Returns:** Authenticated user object and token.

- **POST /register**
  - Registers a new user.
  - **Parameters:**
    - Request body: `{ email: string, password: string }`
  - **Returns:** Created user object.

---

## StripeController

### Overview
Handles Stripe payment and subscription API endpoints.

#### Endpoints
- **POST /stripe/payment-intent**
  - Creates a Stripe payment intent.
  - **Parameters:**
    - Request body: `{ items: Array<{ id: string, quantity: number }> }`
  - **Returns:** Stripe payment intent object.

- **POST /stripe/checkout-session**
  - Creates a Stripe checkout session.
  - **Parameters:**
    - Request body: `{ items: Array<{ id: string, quantity: number }> }`
  - **Returns:** Stripe checkout session object.

- **GET /stripe/session-status**
  - Gets the status of a Stripe session.
  - **Parameters:**
    - `session_id` (string): Stripe session ID (from query params).
  - **Returns:** Stripe session status object.

- **POST /stripe/subscription**
  - Creates a Stripe subscription.
  - **Parameters:**
    - Request body: `{ email: string, paymentMethodId: string, priceId: string }`
    - Authenticated user ID (from request context).
  - **Returns:** Stripe subscription object.

- **POST /stripe/webhook**
  - Handles Stripe webhook events.
  - **Parameters:**
    - Stripe signature (from request headers).
    - Webhook event data (from request body).
  - **Returns:** Webhook event handling result.

---

## SongController

### Overview
Handles song API endpoints.

#### Endpoints
- **GET /songs**
  - Gets all songs.
  - **Parameters:** None
  - **Returns:** Array of songs.

- **GET /songs/:id**
  - Gets a song by ID.
  - **Parameters:**
    - `id` (string or number): Song ID (from URL params).
  - **Returns:** Song object.

- **POST /songs**
  - Creates a song.
  - **Parameters:**
    - Request body: Song data (object).
  - **Returns:** Created song object.

- **PUT /songs/:id**
  - Updates a song.
  - **Parameters:**
    - `id` (string or number): Song ID (from URL params).
    - Request body: Updated song data (object).
  - **Returns:** Updated song object.

- **DELETE /songs/:id**
  - Deletes a song.
  - **Parameters:**
    - `id` (string or number): Song ID (from URL params).
  - **Returns:** Success status.

---

## SetListController

### Overview
Handles set list API endpoints.

#### Endpoints
- **GET /setLists**
  - Gets all set lists.
  - **Parameters:** None
  - **Returns:** Array of set lists.

- **GET /setLists/band/:bandId**
  - Gets set lists for a band.
  - **Parameters:**
    - `bandId` (string or number): Band ID (from URL params).
  - **Returns:** Array of set lists.

- **GET /setLists/:id**
  - Gets a set list by ID.
  - **Parameters:**
    - `id` (string or number): Set list ID (from URL params).
  - **Returns:** Set list object.

- **POST /setLists**
  - Creates a set list.
  - **Parameters:**
    - Request body: Set list data (object).
  - **Returns:** Created set list object.

- **PUT /setLists/:id**
  - Updates a set list.
  - **Parameters:**
    - `id` (string or number): Set list ID (from URL params).
    - Request body: Updated set list data (object).
  - **Returns:** Updated set list object.

- **DELETE /setLists/:id**
  - Deletes a set list.
  - **Parameters:**
    - `id` (string or number): Set list ID (from URL params).
  - **Returns:** Success status.

---

## RehearsalLocalsController

### Overview
Handles rehearsal local API endpoints.

#### Endpoints
- **GET /rehearsalLocals**
  - Gets all rehearsal locals.
  - **Parameters:** None
  - **Returns:** Array of rehearsal locals.

- **GET /rehearsalLocals/:id**
  - Gets a rehearsal local by ID.
  - **Parameters:**
    - `id` (string or number): Local ID (from URL params).
  - **Returns:** Rehearsal local object.

- **POST /rehearsalLocals**
  - Creates a rehearsal local.
  - **Parameters:**
    - Request body: Local data (object).
  - **Returns:** Created rehearsal local object.

- **PUT /rehearsalLocals/:id**
  - Updates a rehearsal local.
  - **Parameters:**
    - `id` (string or number): Local ID (from URL params).
    - Request body: Updated local data (object).
  - **Returns:** Updated rehearsal local object.

- **DELETE /rehearsalLocals/:id**
  - Deletes a rehearsal local.
  - **Parameters:**
    - `id` (string or number): Local ID (from URL params).
  - **Returns:** Success status.

---

## RehearsalsController

### Overview
Handles rehearsal API endpoints.

#### Endpoints
- **GET /rehearsals/band/:band_id**
  - Gets all rehearsals for a band.
  - **Parameters:**
    - `band_id` (string or number): Band ID (from URL params).
  - **Returns:** Array of rehearsals.

- **GET /rehearsals/local/:local_id**
  - Gets all rehearsals for a local.
  - **Parameters:**
    - `local_id` (string or number): Local ID (from URL params).
  - **Returns:** Array of rehearsals.

- **GET /rehearsals/:id**
  - Gets a rehearsal by ID.
  - **Parameters:**
    - `id` (string or number): Rehearsal ID (from URL params).
  - **Returns:** Rehearsal object.

- **POST /rehearsals**
  - Creates a rehearsal.
  - **Parameters:**
    - Request body: Rehearsal data (object).
  - **Returns:** Created rehearsal object.

- **GET /rehearsals/band/:band_id/local/:local_id**
  - Gets rehearsals for a band and local.
  - **Parameters:**
    - `band_id` (string or number): Band ID (from URL params).
    - `local_id` (string or number): Local ID (from URL params).
  - **Returns:** Array of rehearsals.

- **POST /rehearsals/band/:band_id**
  - Creates a new rehearsal for a band.
  - **Parameters:**
    - `band_id` (string or number): Band ID (from URL params).
    - Request body: Rehearsal data (object).
  - **Returns:** Created rehearsal object.

- **PUT /rehearsals/:id**
  - Updates a rehearsal.
  - **Parameters:**
    - `id` (string or number): Rehearsal ID (from URL params).
    - Request body: Updated rehearsal data (object).
  - **Returns:** Updated rehearsal object.

---

## PurchaseHistoryController

### Overview
Handles purchase history API endpoints.

#### Endpoints
- **GET /purchaseHistory/user/:user_id**
  - Gets all purchases for a user.
  - **Parameters:**
    - `user_id` (string or number): User ID (from URL params).
  - **Returns:** Array of purchases.

- **POST /purchaseHistory/complete**
  - Completes a purchase.
  - **Parameters:**
    - Request body: `{ userId, merchandiseId, quantity }`
  - **Returns:** Purchase result object.

---

## PostsController

### Overview
Handles post API endpoints.

#### Endpoints
- **GET /posts**
  - Gets all posts (supports pagination).
  - **Parameters:**
    - `limit` (number, optional): Number of posts to fetch.
    - `offset` (number, optional): Pagination offset.
  - **Returns:** `{ posts: Array, totalItems: number }`

- **GET /posts/:id**
  - Gets a post by ID.
  - **Parameters:**
    - `id` (string or number): Post ID (from URL params).
  - **Returns:** Post object.

- **POST /posts**
  - Creates a post.
  - **Parameters:**
    - Request body: `{ title: string, content: string }`
  - **Returns:** Created post object.

- **PUT /posts/:id**
  - Updates a post.
  - **Parameters:**
    - `id` (string or number): Post ID (from URL params).
    - Request body: Updated post data.
  - **Returns:** Updated post object.

- **DELETE /posts/:id**
  - Deletes a post.
  - **Parameters:**
    - `id` (string or number): Post ID (from URL params).
  - **Returns:** Success status.

- **GET /posts/search**
  - Searches posts by term (supports pagination).
  - **Parameters:**
    - `searchTerm` (string): Search term (from query).
    - `limit` (number, optional): Number of posts to fetch.
    - `offset` (number, optional): Pagination offset.
  - **Returns:** `{ posts: Array, totalItems: number }`

---

## MusicianProfileController

### Overview
Handles musician profile API endpoints.

#### Endpoints
- **GET /musicianProfile/user/:user_id**
  - Gets a musician profile by user ID.
  - **Parameters:**
    - `user_id` (string or number): User ID (from URL params).
  - **Returns:** Profile object.

- **POST /musicianProfile**
  - Creates a musician profile.
  - **Parameters:**
    - Request body: Profile data (object).
  - **Returns:** Created profile object.

- **PUT /musicianProfile/user/:user_id**
  - Updates a musician profile.
  - **Parameters:**
    - `user_id` (string or number): User ID (from URL params).
    - Request body: Updated profile data.
  - **Returns:** Updated profile object.

---

## MerchandiseFavoritesController

### Overview
Handles merchandise favorites API endpoints.

#### Endpoints
- **GET /merchandiseFavorites/user/:user_id**
  - Gets all merchandise favorites for a user.
  - **Parameters:**
    - `user_id` (string or number): User ID (from URL params).
  - **Returns:** Array of favorites.

- **POST /merchandiseFavorites/add**
  - Adds merchandise to favorites.
  - **Parameters:**
    - Request body: `{ merchandise_id, user_id }`
  - **Returns:** Favorite object.

- **DELETE /merchandiseFavorites/remove**
  - Removes merchandise from favorites.
  - **Parameters:**
    - Request body: `{ merchandise_id, user_id }`
  - **Returns:** Success status.

- **GET /merchandiseFavorites/count/:merchandise_id**
  - Gets the count of favorites for a merchandise item.
  - **Parameters:**
    - `merchandise_id` (string or number): Merchandise ID (from URL params).
  - **Returns:** Count (number).

- **GET /merchandiseFavorites/band/:band_id**
  - Gets the count of favorites for all merchandise of a band.
  - **Parameters:**
    - `band_id` (string or number): Band ID (from URL params).
  - **Returns:** Count (number).

---

## MerchandiseController

### Overview
Handles merchandise API endpoints.

#### Endpoints
- **GET /merchandise**
  - Gets all merchandise.
  - **Parameters:** None
  - **Returns:** Array of merchandise.

- **GET /merchandise/:id**
  - Gets merchandise by ID.
  - **Parameters:**
    - `id` (string or number): Merchandise ID (from URL params).
  - **Returns:** Merchandise object.

- **POST /merchandise**
  - Creates merchandise.
  - **Parameters:**
    - Request body: Merchandise data (object).
  - **Returns:** Created merchandise object.

- **PUT /merchandise/:id**
  - Updates merchandise.
  - **Parameters:**
    - `id` (string or number): Merchandise ID (from URL params).
    - Request body: Updated merchandise data.
  - **Returns:** Updated merchandise object.

- **DELETE /merchandise/:id**
  - Deletes merchandise.
  - **Parameters:**
    - `id` (string or number): Merchandise ID (from URL params).
  - **Returns:** Success status.

- **GET /merchandise/search**
  - Searches merchandise by name.
  - **Parameters:**
    - `searchTerm` (string): Search term (from query).
  - **Returns:** Array of merchandise.

- **GET /merchandise/category/:categoryId**
  - Gets merchandise by category.
  - **Parameters:**
    - `categoryId` (string or number): Category ID (from URL params).
  - **Returns:** Array of merchandise.

---

## MailerController

### Overview
Handles email sending and template rendering API endpoints.

#### Endpoints
- **POST /mailer/send**
  - Sends an email using a template.
  - **Parameters:**
    - Request body: `{ to: string, templateKey: string, variables: object }`
  - **Returns:** Email send result object.

- **POST /mailer/password-reset**
  - Sends a password reset link to a user.
  - **Parameters:**
    - Request body: `{ to: string }`
  - **Returns:** Email send result object.

- **POST /mailer/render**
  - Renders an MJML template to HTML.
  - **Parameters:**
    - Request body: `{ templateKey: string, variables: object }`
  - **Returns:** `{ subject: string, html: string }`

---

## LiveController

### Overview
Handles live event API endpoints.

#### Endpoints
- **GET /lives**
  - Gets all live events.
  - **Parameters:** None
  - **Returns:** Array of live events.

- **GET /lives/:id**
  - Gets a live event by ID.
  - **Parameters:**
    - `id` (string or number): Live event ID (from URL params).
  - **Returns:** Live event object.

- **POST /lives**
  - Creates a new live event.
  - **Parameters:**
    - Request body: `{ date_time, city, venue }`
  - **Returns:** Created live event object.

- **PUT /lives/:id**
  - Updates a live event.
  - **Parameters:**
    - `id` (string or number): Live event ID (from URL params).
    - Request body: Updated event data.
  - **Returns:** Updated live event object.

- **DELETE /lives/:id**
  - Deletes a live event.
  - **Parameters:**
    - `id` (string or number): Live event ID (from URL params).
  - **Returns:** Success status.

---

## CloudinaryController

### Overview
Handles media upload and deletion API endpoints via Cloudinary.

#### Endpoints
- **POST /cloudinary/upload-image**
  - Uploads an image file.
  - **Parameters:**
    - Request body: `{ path: string }`
  - **Returns:** Uploaded image object.

- **DELETE /cloudinary/delete-image/:publicId**
  - Deletes an image by public ID.
  - **Parameters:**
    - `publicId` (string): Cloudinary public ID (from URL params).
  - **Returns:** Deletion result object.

- **POST /cloudinary/upload-audio**
  - Uploads an audio file.
  - **Parameters:**
    - Request body: `{ path: string }`
  - **Returns:** Uploaded audio object.

- **DELETE /cloudinary/delete-audio/:publicId**
  - Deletes an audio file by public ID.
  - **Parameters:**
    - `publicId` (string): Cloudinary public ID (from URL params).
  - **Returns:** Deletion result object.

- **POST /cloudinary/upload-media**
  - Uploads media (image/video) to a folder.
  - **Parameters:**
    - Request body: `{ path: string, mimetype: string, folderName: string }`
  - **Returns:** Uploaded media object.

- **DELETE /cloudinary/delete-media/:publicId**
  - Deletes media by public ID.
  - **Parameters:**
    - `publicId` (string): Cloudinary public ID (from URL params).
  - **Returns:** Deletion result object.

---

## CategoriesController

### Overview
Handles category API endpoints.

#### Endpoints
- **GET /categories**
  - Gets all categories.
  - **Parameters:** None
  - **Returns:** Array of categories.

- **GET /categories/:id**
  - Gets a category by ID.
  - **Parameters:**
    - `id` (string or number): Category ID (from URL params).
  - **Returns:** Category object.

- **POST /categories**
  - Creates a category.
  - **Parameters:**
    - Request body: Category data (object).
  - **Returns:** Created category object.

- **PUT /categories/:id**
  - Updates a category.
  - **Parameters:**
    - `id` (string or number): Category ID (from URL params).
    - Request body: Updated category data.
  - **Returns:** Updated category object.

- **DELETE /categories/:id**
  - Deletes a category.
  - **Parameters:**
    - `id` (string or number): Category ID (from URL params).
  - **Returns:** Success status.

- **GET /categories/with-merchandise**
  - Gets categories with their merchandise.
  - **Parameters:** None
  - **Returns:** Array of categories with merchandise.

---

## CartsController

### Overview
Handles cart API endpoints.

#### Endpoints
- **GET /carts/user/:userId**
  - Gets all carts for a user.
  - **Parameters:**
    - `userId` (string or number): User ID (from URL params).
  - **Returns:** Array of carts.

- **POST /carts/add-item**
  - Adds an item to a user's cart.
  - **Parameters:**
    - Request body: `{ userId, merchandiseId, quantity }`
  - **Returns:** Cart item object.

- **DELETE /carts/remove-item/:cartItemId**
  - Removes an item from the cart.
  - **Parameters:**
    - `cartItemId` (string or number): Cart item ID (from URL params).
  - **Returns:** Success status.

---

## BandTagsRelController

### Overview
Handles band tag relationship API endpoints.

#### Endpoints
- **GET /bandTagsRel**
  - Gets all band tag relationships.
  - **Parameters:** None
  - **Returns:** Array of relationships.

- **GET /bandTagsRel/:id**
  - Gets a band tag relationship by ID.
  - **Parameters:**
    - `id` (string or number): Relationship ID (from URL params).
  - **Returns:** Relationship object.

- **POST /bandTagsRel**
  - Creates a band tag relationship.
  - **Parameters:**
    - Request body: Relationship data (object).
  - **Returns:** Created relationship object.

- **PUT /bandTagsRel/:id**
  - Updates a band tag relationship.
  - **Parameters:**
    - `id` (string or number): Relationship ID (from URL params).
    - Request body: Updated relationship data.
  - **Returns:** Updated relationship object.

- **DELETE /bandTagsRel/:id**
  - Deletes a band tag relationship.
  - **Parameters:**
    - `id` (string or number): Relationship ID (from URL params).
  - **Returns:** Success status.

---

## BandTagsController

### Overview
Handles band tag API endpoints.

#### Endpoints
- **GET /bandTags**
  - Gets all band tags.
  - **Parameters:** None
  - **Returns:** Array of band tags.

- **GET /bandTags/:id**
  - Gets a band tag by ID.
  - **Parameters:**
    - `id` (string or number): Tag ID (from URL params).
  - **Returns:** Tag object.

- **POST /bandTags**
  - Creates a band tag.
  - **Parameters:**
    - Request body: `{ name: string }`
  - **Returns:** Created tag object.

- **PUT /bandTags/:id**
  - Updates a band tag.
  - **Parameters:**
    - `id` (string or number): Tag ID (from URL params).
    - Request body: Updated tag data.
  - **Returns:** Updated tag object.

- **DELETE /bandTags/:id**
  - Deletes a band tag.
  - **Parameters:**
    - `id` (string or number): Tag ID (from URL params).
  - **Returns:** Success status.

---

## BandMembersController

### Overview
Handles band member API endpoints.

#### Endpoints
- **GET /bandMembers**
  - Gets all band members.
  - **Parameters:** None
  - **Returns:** Array of band members.

- **GET /bandMembers/:id**
  - Gets a band member by ID.
  - **Parameters:**
    - `id` (string or number): Band member ID (from URL params).
  - **Returns:** Band member object.

- **GET /bandMembers/user/:musician_id**
  - Gets all bands for a musician.
  - **Parameters:**
    - `musician_id` (string or number): Musician ID (from URL params).
  - **Returns:** Array of bands.

- **GET /bandMembers/band/:bandId**
  - Gets all members for a band.
  - **Parameters:**
    - `bandId` (string or number): Band ID (from URL params).
  - **Returns:** Array of band members.

---

## BandsController

### Overview
Handles band API endpoints.

#### Endpoints
- **PUT /bands/change-admin**
  - Changes the admin of a band.
  - **Parameters:**
    - Request body: `{ bandId, newAdminId }`
  - **Returns:** Updated band object.

- **PUT /bands/update-logo**
  - Updates a band's logo.
  - **Parameters:**
    - Request body: `{ band_id, logo, logo_public_id }`
  - **Returns:** Updated band object.

- **PUT /bands/update-cover-photo**
  - Updates a band's cover photo.
  - **Parameters:**
    - Request body: `{ band_id, cover_photo, cover_photo_public_id }`
  - **Returns:** Updated band object.

- **GET /bands**
  - Gets all bands.
  - **Parameters:** None
  - **Returns:** Array of bands.

- **GET /bands/name/:band_name**
  - Gets a band by name.
  - **Parameters:**
    - `band_name` (string): Band name (from URL params).
  - **Returns:** Band object.

---

## BandFollowersController

### Overview
Handles band follower API endpoints.

#### Endpoints
- **GET /bandFollowers/band/:band_id**
  - Gets all followers for a band.
  - **Parameters:**
    - `band_id` (string or number): Band ID (from URL params).
  - **Returns:** Array of followers.

- **POST /bandFollowers/add**
  - Adds a follower to a band.
  - **Parameters:**
    - Request body: `{ band_id, follower_id }`
  - **Returns:** Follower object.

- **DELETE /bandFollowers/remove/:id**
  - Removes a follower by ID.
  - **Parameters:**
    - `id` (string or number): Follower record ID (from URL params).
  - **Returns:** Success status.

- **GET /bandFollowers/count/:band_id**
  - Gets the number of followers for a band.
  - **Parameters:**
    - `band_id` (string or number): Band ID (from URL params).
  - **Returns:** Count (number).

- **GET /bandFollowers/user-follows**
  - Checks if a user follows a band.
  - **Parameters:**
    - `band_id` (string or number): Band ID (from query).
    - `user_id` (string or number): User ID (from query).
  - **Returns:** Array of matching records.

