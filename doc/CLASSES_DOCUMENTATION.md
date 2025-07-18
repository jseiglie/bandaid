# Classes Documentation

---

## AdminClass

### Overview
Provides admin-level operations and aggregates other class modules.

#### Methods
- **getPremiumUsers()**
  - Returns premium users grouped by month.
  - **Parameters:** None
  - **Returns:** `Promise<Object[]>`

---

## BandFollowers

### Overview
Handles band follower operations.

#### Methods
- **getFollowersByBandId(band_id)**
  - Gets all followers for a band.
  - **Parameters:**
    - `band_id` (`number` or `string`): Band ID.
  - **Returns:** `Promise<Object[]>`

- **addFollower(band_id, follower_id)**
  - Adds a follower to a band.
  - **Parameters:**
    - `band_id` (`number` or `string`): Band ID.
    - `follower_id` (`number` or `string`): Follower/User ID.
  - **Returns:** `Promise<Object>`

- **removeFollower(id)**
  - Removes a follower by ID.
  - **Parameters:**
    - `id` (`number` or `string`): Follower record ID.
  - **Returns:** `Promise<boolean>`

- **getBandsFollowersCount(band_id)**
  - Gets the number of followers for a band.
  - **Parameters:**
    - `band_id` (`number` or `string`): Band ID.
  - **Returns:** `Promise<number>`

- **getBandsUserFollows(band_id, user_id)**
  - Checks if a user follows a band.
  - **Parameters:**
    - `band_id` (`number` or `string`): Band ID.
    - `user_id` (`number` or `string`): User ID.
  - **Returns:** `Promise<Object[]>`

---

## Lives

### Overview
Handles live event operations.

#### Methods
- **getLives()**
  - Gets all live events.
  - **Parameters:** None
  - **Returns:** `Promise<Object[]>`

- **getLiveById(id)**
  - Gets a live event by ID.
  - **Parameters:**
    - `id` (`number` or `string`): Live event ID.
  - **Returns:** `Promise<Object>`

- **createLive(liveData)**
  - Creates a new live event.
  - **Parameters:**
    - `liveData` (`object`): Should contain at least `date_time`, `city`, and `venue`.
  - **Returns:** `Promise<Object>`

- **updateLive(id, liveData)**
  - Updates a live event.
  - **Parameters:**
    - `id` (`number` or `string`): Live event ID.
    - `liveData` (`object`): Updated event data.
  - **Returns:** `Promise<Object>`

- **deleteLive(id)**
  - Deletes a live event.
  - **Parameters:**
    - `id` (`number` or `string`): Live event ID.
  - **Returns:** `Promise<Object>`

---

## MusicianProfile

### Overview
Handles musician profile operations.

#### Methods
- **getProfileByUserId(user_id)**
  - Gets a musician profile by user ID.
  - **Parameters:**
    - `user_id` (`number` or `string`): User ID.
  - **Returns:** `Promise<Object>`

- **createProfile(profileData)**
  - Creates a musician profile.
  - **Parameters:**
    - `profileData` (`object`): Should contain at least `user_id` and profile info.
  - **Returns:** `Promise<Object>`

- **updateProfile(user_id, profileData)**
  - Updates a musician profile.
  - **Parameters:**
    - `user_id` (`number` or `string`): User ID.
    - `profileData` (`object`): Updated profile info.
  - **Returns:** `Promise<Object>`

---

## BandMembers

### Overview
Handles band member operations.

#### Methods
- **getBandMembers()**
  - Gets all band members.
  - **Parameters:** None
  - **Returns:** `Promise<Object[]>`

- **getBandMemberById(id)**
  - Gets a band member by ID.
  - **Parameters:**
    - `id` (`number` or `string`): Band member ID.
  - **Returns:** `Promise<Object>`

- **getAllUserBands(musician_id)**
  - Gets all bands for a musician.
  - **Parameters:**
    - `musician_id` (`number` or `string`): Musician ID.
  - **Returns:** `Promise<Object[]>`

- **getBandMembersByBandId(bandId)**
  - Gets all members for a band.
  - **Parameters:**
    - `bandId` (`number` or `string`): Band ID.
  - **Returns:** `Promise<Object[]>`

---

## Bands

### Overview
Handles band operations.

#### Methods
- **changeBandAdmin(bandId, newAdminId)**
  - Changes the admin of a band.
  - **Parameters:**
    - `bandId` (`number` or `string`): Band ID.
    - `newAdminId` (`number` or `string`): New admin user ID.
  - **Returns:** `Promise<Object>`

- **updateBandLogo(data)**
  - Updates a band's logo.
  - **Parameters:**
    - `data` (`object`): Should contain `band_id`, `logo`, `logo_public_id`.
  - **Returns:** `Promise<Object>`

- **updateBandCoverPhoto(data)**
  - Updates a band's cover photo.
  - **Parameters:**
    - `data` (`object`): Should contain `band_id`, `cover_photo`, `cover_photo_public_id`.
  - **Returns:** `Promise<Object>`

- **getBands()**
  - Gets all bands.
  - **Parameters:** None
  - **Returns:** `Promise<Object[]>`

- **getBandByBandName(band_name)**
  - Gets a band by name.
  - **Parameters:**
    - `band_name` (`string`): Band name.
  - **Returns:** `Promise<Object>`

---

## BandTags

### Overview
Handles band tag operations.

#### Methods
- **getAll()**
  - Gets all band tags.
  - **Parameters:** None
  - **Returns:** `Promise<Object[]>`

- **getById(id)**
  - Gets a band tag by ID.
  - **Parameters:**
    - `id` (`number` or `string`): Tag ID.
  - **Returns:** `Promise<Object>`

- **create(data)**
  - Creates a band tag.
  - **Parameters:**
    - `data` (`object`): Should contain `name` (string).
  - **Returns:** `Promise<Object>`

- **update(id, data)**
  - Updates a band tag.
  - **Parameters:**
    - `id` (`number` or `string`): Tag ID.
    - `data` (`object`): Updated tag data.
  - **Returns:** `Promise<Object>`

- **delete(id)**
  - Deletes a band tag.
  - **Parameters:**
    - `id` (`number` or `string`): Tag ID.
  - **Returns:** `Promise<Object>`

---

## BandTagsRel

### Overview
Handles band tag relationship operations.

#### Methods
- **getAll()**
  - Gets all band tag relationships.
  - **Parameters:** None
  - **Returns:** `Promise<Object[]>`

- **getById(id)**
  - Gets a band tag relationship by ID.
  - **Parameters:**
    - `id` (`number` or `string`): Relationship ID.
  - **Returns:** `Promise<Object>`

- **create(data)**
  - Creates a band tag relationship.
  - **Parameters:**
    - `data` (`object`): Relationship data.
  - **Returns:** `Promise<Object>`

- **update(id, data)**
  - Updates a band tag relationship.
  - **Parameters:**
    - `id` (`number` or `string`): Relationship ID.
    - `data` (`object`): Updated relationship data.
  - **Returns:** `Promise<Object>`

- **delete(id)**
  - Deletes a band tag relationship.
  - **Parameters:**
    - `id` (`number` or `string`): Relationship ID.
  - **Returns:** `Promise<Object>`

---

## CartsClass

### Overview
Handles cart operations.

#### Methods
- **getUserCarts(userId)**
  - Gets all carts for a user.
  - **Parameters:**
    - `userId` (`number` or `string`): User ID.
  - **Returns:** `Promise<Object[]>`

- **addItem(userId, merchandiseId, quantity)**
  - Adds an item to a user's cart.
  - **Parameters:**
    - `userId` (`number` or `string`): User ID.
    - `merchandiseId` (`number` or `string`): Merchandise ID.
    - `quantity` (`number`): Quantity to add.
  - **Returns:** `Promise<Object>`

- **removeItem(cartItemId)**
  - Removes an item from the cart.
  - **Parameters:**
    - `cartItemId` (`number` or `string`): Cart item ID.
  - **Returns:** `Promise<Object>`

---

## Categories

### Overview
Handles category operations.

#### Methods
- **getAllCategories()**
  - Gets all categories.
  - **Parameters:** None
  - **Returns:** `Promise<Object[]>`

- **getCategoryById(id)**
  - Gets a category by ID.
  - **Parameters:**
    - `id` (`number` or `string`): Category ID.
  - **Returns:** `Promise<Object>`

- **createCategory(categoryData)**
  - Creates a category.
  - **Parameters:**
    - `categoryData` (`object`): Category data.
  - **Returns:** `Promise<Object>`

- **updateCategory(id, categoryData)**
  - Updates a category.
  - **Parameters:**
    - `id` (`number` or `string`): Category ID.
    - `categoryData` (`object`): Updated category data.
  - **Returns:** `Promise<Object>`

- **deleteCategory(id)**
  - Deletes a category.
  - **Parameters:**
    - `id` (`number` or `string`): Category ID.
  - **Returns:** `Promise<Object>`

- **getCategoriesWithMerchandise()**
  - Gets categories with their merchandise.
  - **Parameters:** None
  - **Returns:** `Promise<Object[]>`

---

## Cloudinary

### Overview
Handles media upload and deletion via Cloudinary.

#### Methods
- **uploadImage(file)**
  - Uploads an image file.
  - **Parameters:**
    - `file` (`object`): Should contain `path` (string).
  - **Returns:** `Promise<Object>`

- **deleteImage(publicId)**
  - Deletes an image by public ID.
  - **Parameters:**
    - `publicId` (`string`): Cloudinary public ID.
  - **Returns:** `Promise<Object>`

- **uploadAudio(file)**
  - Uploads an audio file.
  - **Parameters:**
    - `file` (`object`): Should contain `path` (string).
  - **Returns:** `Promise<Object>`

- **deleteAudio(publicId)**
  - Deletes an audio file by public ID.
  - **Parameters:**
    - `publicId` (`string`): Cloudinary public ID.
  - **Returns:** `Promise<Object>`

- **uploadMedia(file, folderName)**
  - Uploads media (image/video) to a folder.
  - **Parameters:**
    - `file` (`object`): Should contain `path` (string), `mimetype` (string).
    - `folderName` (`string`): Target folder name.
  - **Returns:** `Promise<Object>`

- **deleteMedia(publicId)**
  - Deletes media by public ID.
  - **Parameters:**
    - `publicId` (`string`): Cloudinary public ID.
  - **Returns:** `Promise<Object>`

---

## Mailer

### Overview
Handles email sending and template rendering.

#### Methods
- **sendMail(to, templateKey, variables)**
  - Sends an email using a template.
  - **Parameters:**
    - `to` (`string`): Recipient email address.
    - `templateKey` (`string`): Template key from JSON.
    - `variables` (`object`): Data for template rendering.
  - **Returns:** `Promise<Object>`

- **sendPasswordResetLink(to)**
  - Sends a password reset link to a user.
  - **Parameters:**
    - `to` (`string`): Recipient email address.
  - **Returns:** `Promise<Object>`

- **renderEmail(templateKey, variables)**
  - Renders an MJML template to HTML.
  - **Parameters:**
    - `templateKey` (`string`): Template key.
    - `variables` (`object`): Data for template rendering.
  - **Returns:** `{ subject: string, html: string }`

---

## Merchandise

### Overview
Handles merchandise operations.

#### Methods
- **getAllMerchandise()**
  - Gets all merchandise.
  - **Parameters:** None
  - **Returns:** `Promise<Object[]>`

- **getMerchandiseById(id)**
  - Gets merchandise by ID.
  - **Parameters:**
    - `id` (`number` or `string`): Merchandise ID.
  - **Returns:** `Promise<Object>`

- **createMerchandise(data)**
  - Creates merchandise.
  - **Parameters:**
    - `data` (`object`): Merchandise data.
  - **Returns:** `Promise<Object>`

- **updateMerchandise(id, data)**
  - Updates merchandise.
  - **Parameters:**
    - `id` (`number` or `string`): Merchandise ID.
    - `data` (`object`): Updated merchandise data.
  - **Returns:** `Promise<Object>`

- **deleteMerchandise(id)**
  - Deletes merchandise.
  - **Parameters:**
    - `id` (`number` or `string`): Merchandise ID.
  - **Returns:** `Promise<Object>`

- **searchMerchandise(searchTerm)**
  - Searches merchandise by name.
  - **Parameters:**
    - `searchTerm` (`string`): Search term.
  - **Returns:** `Promise<Object[]>`

- **getMerchandiseByCategory(categoryId)**
  - Gets merchandise by category.
  - **Parameters:**
    - `categoryId` (`number` or `string`): Category ID.
  - **Returns:** `Promise<Object[]>`

---

## MerchandiseFavorites

### Overview
Handles merchandise favorites operations.

#### Methods
- **getFavoritesByUserId(user_id)**
  - Gets all merchandise favorites for a user.
  - **Parameters:**
    - `user_id` (`number` or `string`): User ID.
  - **Returns:** `Promise<Object[]>`

- **addMerchandiseToFavorites(merchandise_id, user_id)**
  - Adds merchandise to favorites.
  - **Parameters:**
    - `merchandise_id` (`number` or `string`): Merchandise ID.
    - `user_id` (`number` or `string`): User ID.
  - **Returns:** `Promise<Object>`

- **removeMerchandiseFromFavorites(merchandise_id, user_id)**
  - Removes merchandise from favorites.
  - **Parameters:**
    - `merchandise_id` (`number` or `string`): Merchandise ID.
    - `user_id` (`number` or `string`): User ID.
  - **Returns:** `Promise<boolean>`

- **getFavoritesCount(merchandise_id)**
  - Gets the count of favorites for a merchandise item.
  - **Parameters:**
    - `merchandise_id` (`number` or `string`): Merchandise ID.
  - **Returns:** `Promise<number>`

- **getAllFavoritesCountForBandMerchandise(band_id)**
  - Gets the count of favorites for all merchandise of a band.
  - **Parameters:**
    - `band_id` (`number` or `string`): Band ID.
  - **Returns:** `Promise<number>`

---

## Posts

### Overview
Handles post operations.

#### Methods
- **getAllPosts(limit, offset)**
  - Gets all posts with pagination.
  - **Parameters:**
    - `limit` (`number`): Number of posts to fetch (default: 10).
    - `offset` (`number`): Offset for pagination (default: 0).
  - **Returns:** `{ posts: Object[], totalItems: number }`

- **getPostById(id)**
  - Gets a post by ID.
  - **Parameters:**
    - `id` (`number` or `string`): Post ID.
  - **Returns:** `Promise<Object>`

- **createPost(postData)**
  - Creates a post.
  - **Parameters:**
    - `postData` (`object`): Should contain `title` (string), `content` (string).
  - **Returns:** `Promise<Object>`

- **updatePost(id, postData)**
  - Updates a post.
  - **Parameters:**
    - `id` (`number` or `string`): Post ID.
    - `postData` (`object`): Updated post data.
  - **Returns:** `Promise<Object>`

- **deletePost(id)**
  - Deletes a post.
  - **Parameters:**
    - `id` (`number` or `string`): Post ID.
  - **Returns:** `Promise<boolean>`

- **searchPosts(searchTerm, limit, offset)**
  - Searches posts by term with pagination.
  - **Parameters:**
    - `searchTerm` (`string`): Search term.
    - `limit` (`number`): Number of posts to fetch (default: 10).
    - `offset` (`number`): Offset for pagination (default: 0).
  - **Returns:** `{ posts: Object[], totalItems: number }`

---

## PurchaseClass

### Overview
Handles purchase history operations.

#### Methods
- **getPurchasesByUserId(user_id)**
  - Gets all purchases for a user.
  - **Parameters:**
    - `user_id` (`number` or `string`): User ID.
  - **Returns:** `Promise<Object[]>`

- **completePurchase(purchaseData)**
  - Completes a purchase.
  - **Parameters:**
    - `purchaseData` (`object`): Should contain `userId`, `merchandiseId`, `quantity`.
  - **Returns:** `Promise<Object>`

---

## RehearsalLocals

### Overview
Handles rehearsal local operations.

#### Methods
- **getRehearsalLocals()**
  - Gets all rehearsal locals.
  - **Parameters:** None
  - **Returns:** `Promise<Object[]>`

- **getRehearsalLocalById(id)**
  - Gets a rehearsal local by ID.
  - **Parameters:**
    - `id` (`number` or `string`): Local ID.
  - **Returns:** `Promise<Object>`

- **createRehearsalLocal(rehearsalLocalData)**
  - Creates a rehearsal local.
  - **Parameters:**
    - `rehearsalLocalData` (`object`): Local data.
  - **Returns:** `Promise<Object>`

- **updateRehearsalLocal(id, rehearsalLocalData)**
  - Updates a rehearsal local.
  - **Parameters:**
    - `id` (`number` or `string`): Local ID.
    - `rehearsalLocalData` (`object`): Updated local data.
  - **Returns:** `Promise<Object>`

- **deleteRehearsalLocal(id)**
  - Deletes a rehearsal local.
  - **Parameters:**
    - `id` (`number` or `string`): Local ID.
  - **Returns:** `Promise<Object>`

---

## Rehearsals

### Overview
Handles rehearsal operations.

#### Methods
- **getBandRehearsals(band_id)**
  - Gets all rehearsals for a band.
  - **Parameters:**
    - `band_id` (`number` or `string`): Band ID.
  - **Returns:** `Promise<Object[]>`

- **getLocalRehearsals(local_id)**
  - Gets all rehearsals for a local.
  - **Parameters:**
    - `local_id` (`number` or `string`): Local ID.
  - **Returns:** `Promise<Object[]>`

- **getRehearsalById(id)**
  - Gets a rehearsal by ID.
  - **Parameters:**
    - `id` (`number` or `string`): Rehearsal ID.
  - **Returns:** `Promise<Object>`

- **createRehearsal(rehearsalData)**
  - Creates a rehearsal.
  - **Parameters:**
    - `rehearsalData` (`object`): Rehearsal data.
  - **Returns:** `Promise<Object>`

- **getRehearsalsByBandAndLocal(band_id, local_id)**
  - Gets rehearsals for a band and local.
  - **Parameters:**
    - `band_id` (`number` or `string`): Band ID.
    - `local_id` (`number` or `string`): Local ID.
  - **Returns:** `Promise<Object[]>`

---

## SetLists

### Overview
Handles set list operations.

#### Methods
- **getSetLists()**
  - Gets all set lists.
  - **Parameters:** None
  - **Returns:** `Promise<Object[]>`

- **getSetListsByBandId(bandId)**
  - Gets set lists for a band.
  - **Parameters:**
    - `bandId` (`number` or `string`): Band ID.
  - **Returns:** `Promise<Object[]>`

- **getSetListById(id)**
  - Gets a set list by ID.
  - **Parameters:**
    - `id` (`number` or `string`): Set list ID.
  - **Returns:** `Promise<Object>`

---

## Songs

### Overview
Handles song operations.

#### Methods
- **getSongs()**
  - Gets all songs.
  - **Parameters:** None
  - **Returns:** `Promise<Object[]>`

- **getSongById(id)**
  - Gets a song by ID.
  - **Parameters:**
    - `id` (`number` or `string`): Song ID.
  - **Returns:** `Promise<Object>`

- **createSong(songData)**
  - Creates a song.
  - **Parameters:**
    - `songData` (`object`): Should contain `title` (string), `key` (string).
  - **Returns:** `Promise<Object>`

- **updateSong(id, songData)**
  - Updates a song.
  - **Parameters:**
    - `id` (`number` or `string`): Song ID.
    - `songData` (`object`): Updated song data.
  - **Returns:** `Promise<Object>`

- **deleteSong(id)**
  - Deletes a song.
  - **Parameters:**
    - `id` (`number` or `string`): Song ID.
  - **Returns:** `Promise<Object>`

---

## StripeClass

### Overview
Handles Stripe payment and subscription operations.

#### Methods
- **getAmount(items)**
  - Calculates total amount for items.
  - **Parameters:**
    - `items` (`array`): Array of items, e.g. `[ { id: string, quantity: number } ]`
  - **Returns:** `number`

- **createPaymentIntent(items)**
  - Creates a Stripe payment intent.
  - **Parameters:**
    - `items` (`array`): Array of items, e.g. `[ { id: string, quantity: number } ]`
  - **Returns:** `Promise<Object>`

- **createCheckoutSession(items)**
  - Creates a Stripe checkout session.
  - **Parameters:**
    - `items` (`array`): Array of items for checkout.
  - **Returns:** `Promise<Object>`

- **getSessionStatus(sessionId)**
  - Gets the status of a Stripe session.
  - **Parameters:**
    - `sessionId` (`string`): Stripe session ID.
  - **Returns:** `Promise<Object>`

---

## Users

### Overview
Handles user operations.

#### Methods
- **logout(token)**
  - Logs out a user.
  - **Parameters:**
    - `token` (`string`): JWT token.
  - **Returns:** `{ success: boolean, message?: string, error?: string }

- **getPremuimUsers()**
  - Gets premium users grouped by month.
  - **Parameters:** None
  - **Returns:** `Promise<Object[]>`

- **avatarUpdate(data)**
  - Updates user avatar.
  - **Parameters:**
    - `data` (`object`): Should contain `avatar` (string), `avatar_public_id` (string), `id` (number or string).
  - **Returns:** `Promise<Object>`

---

## VenueOwners

### Overview
Handles venue owner operations.

#### Methods
- **getAll()**
  - Gets all venue owners.
  - **Parameters:** None
  - **Returns:** `Promise<Object[]>`

- **getById(id)**
  - Gets a venue owner by ID.
  - **Parameters:**
    - `id` (`number` or `string`): Venue owner ID.
  - **Returns:** `Promise<Object>`

- **create(data)**
  - Creates a venue owner.
  - **Parameters:**
    - `data` (`object`): Venue owner data.
  - **Returns:** `Promise<Object>`

- **update(id, data)**
  - Updates a venue owner.
  - **Parameters:**
    - `id` (`number` or `string`): Venue owner ID.
    - `data` (`object`): Updated venue owner data.
  - **Returns:** `Promise<Object>`

- **delete(id)**
  - Deletes a venue owner.
  - **Parameters:**
    - `id` (`number` or `string`): Venue owner ID.
  - **Returns:** `Promise<Object>`

---

## Venues

### Overview
Handles venue operations.

#### Methods
- **getAll()**
  - Gets all venues.
  - **Parameters:** None
  - **Returns:** `Promise<Object[]>`

- **getById(id)**
  - Gets a venue by ID.
  - **Parameters:**
    - `id` (`number` or `string`): Venue ID.
  - **Returns:** `Promise<Object>`

- **create(data)**
  - Creates a venue.
  - **Parameters:**
    - `data` (`object`): Venue data.
  - **Returns:** `Promise<Object>`

- **update(id, data)**
  - Updates a venue.
  - **Parameters:**
    - `id` (`number` or `string`): Venue ID.
    - `data` (`object`): Updated venue data.
  - **Returns:** `Promise<Object>`

- **delete(id)**
  - Deletes a venue.
  - **Parameters:**
    - `id` (`number` or `string`): Venue ID.
  - **Returns:** `Promise<Object>`

---

## VenueScores

### Overview
Handles venue score operations.

#### Methods
- **getAll()**
  - Gets all venue scores.
  - **Parameters:** None
  - **Returns:** `Promise<Object[]>`

- **getById(id)**
  - Gets a venue score by ID.
  - **Parameters:**
    - `id` (`number` or `string`): Venue score ID.
  - **Returns:** `Promise<Object>`

- **create(data)**
  - Creates a venue score.
  - **Parameters:**
    - `data` (`object`): Venue score data.
  - **Returns:** `Promise<Object>`

- **update(id, data)**
  - Updates a venue score.
  - **Parameters:**
    - `id` (`number` or `string`): Venue score ID.
    - `data` (`object`): Updated venue score data.
  - **Returns:** `Promise<Object>`

- **delete(id)**
  - Deletes a venue score.
  - **Parameters:**
    - `id` (`number` or `string`): Venue score ID.
  - **Returns:** `Promise<Object>`

---
