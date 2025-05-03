# Documentation: Models, Relationships, and CRUD Operations

This documentation provides an overview of the data models, their relationships, and how to use the classes and controllers for CRUD operations. It's intended to help developers understand the structure, functionality and "how to" of the project.

---

## **1. Models**

### **1.1 Bands**
Represents a music band.

**Fields:**
- `id`: Primary key.
- `name`: Unique name of the band.
- `description`: Description of the band.
- `genre`: Music genre.
- `location`: Band's location.
- `logo`: URL for the band's logo.
- `social_media`: JSON array of social media links (e.g., Instagram, Twitter).

**Associations:**
- `Bands` belongs to many `Users` through the `UserBands` table.
- `Bands` has many `Lives` (live performances).
- `Bands` has many `SetLists`.

---

### **1.2 Users**
Represents a user in the system.

**Fields:**
- `id`: Primary key.
- `username`: Unique username.
- `email`: Unique email address.
- `password`: Hashed password.
- `avatar`: URL for the user's avatar.

**Associations:**
- `Users` belongs to many `Bands` through the `UserBands` table.
- `Users` has one `MusicianProfile`.

---

### **1.3 UserBands**
Represents the many-to-many relationship between `Users` and `Bands`.

**Fields:**
- `id`: Primary key.
- `user_id`: Foreign key referencing `Users`.
- `band_id`: Foreign key referencing `Bands`.

---

### **1.4 Lives**
Represents live performances.

**Fields:**
- `id`: Primary key.
- `date_time`: Date and time of the performance.
- `city`: City where the performance takes place.
- `location`: Specific location of the performance.
- `venue`: Venue name.

**Associations:**
- `Lives` belongs to `Bands`.
- `Lives` belongs to `SetLists`.

---

### **1.5 SetLists**
Represents a setlist for a band.

**Fields:**
- `id`: Primary key.
- `band_id`: Foreign key referencing `Bands`.
- `name`: Name of the setlist.
- `accepted`: Boolean indicating if the setlist is accepted.

**Associations:**
- `SetLists` belongs to `Bands`.
- `SetLists` belongs to many `Songs` through `SetListSongs`.

---

### **1.6 Songs**
Represents songs in the system.

**Fields:**
- `id`: Primary key.
- `title`: Title of the song.
- `key`: Musical key of the song.
- `isSingle`: Boolean indicating if the song is a single.

**Associations:**
- `Songs` belongs to many `SetLists` through `SetListSongs`.

---

## **2. Relationships**

- **Users ↔ Bands**: Many-to-Many via `UserBands`.
- **Bands ↔ Lives**: One-to-Many.
- **Bands ↔ SetLists**: One-to-Many.
- **SetLists ↔ Songs**: Many-to-Many via `SetListSongs`.

---

## **3. Classes**

Classes provide methods to interact with the models and perform CRUD operations.

### **3.1 Bands Class**
File: `d:\bandaid\class\bands.class.js`

**Key Methods:**
- `getBands()`: Fetch all bands.
- `getBandById(id)`: Fetch a band by its ID.
- `createBand(bandData)`: Create a new band.
- `updateBand(id, bandData)`: Update a band's details.
- `deleteBand(id)`: Delete a band.

**Example:**
```javascript
const Bands = require('./bands.class');
const allBands = await Bands.getBands();
```

### 3.2 Users Class
File: `d:\bandaid\class\users.class.js`

**Key Methods:**

- getUsers(): Fetch all users.
- getUserById(id): Fetch a user by ID.
- register(email, password): Register a new user.
- updateUser(id, userData): Update user details.
- deleteUser(id): Delete a user.

**Example:**

```javascript
const Users = require('./users.class');
const user = await Users.register('email@example.com', 'password123');
```

### 3.3 Lives Class
File: `d:\bandaid\class\lives.class.js`

**Key Methods:**

- getLives(): Fetch all live performances.
- getLiveById(id): Fetch a live performance by ID.
- createLive(liveData): Create a new live performance.
- updateLive(id, liveData): Update a live performance.
- deleteLive(id): Delete a live performance.


### 3.4 SetLists Class
File: `d:\bandaid\class\setLists.class.js`

**Key Methods:**

- getSetLists(): Fetch all setlists.
- getSetListById(id): Fetch a setlist by ID.
- createSetList(setListData): Create a new setlist.
- updateSetList(id, setListData): Update a setlist.
- deleteSetList(id): Delete a setlist.

## 4. Controllers

Controllers handle API requests and use the classes to perform operations.

### 4.1 Band Controller
File: `d:\bandaid\controllers\band.controller.js`

**Key Endpoints:**

- GET /bands: Fetch all bands.
- GET /bands/:id: Fetch a band by ID.
- POST /bands: Create a new band.
- PUT /bands/:id: Update a band's details.
- DELETE /bands/:id: Delete a band.

**Example:**

```javascript
const bandController = require('./band.controller');
app.get('/bands', bandController.getBands);
```

### 4.2 User Controller
File: `d:\bandaid\controllers\user.controller.js`

**Key Endpoints:**

- GET /users: Fetch all users
- GET /users/:id: Fetch a user by ID.
- POST /users/register: Register a new user.
- PUT /users/:id: Update a user's details.
- DELETE /users/:id: Delete a user.


### 4.3 Lives Controller
File: `d:\bandaid\controllers\live.controller.js`

**Key Endpoints:**

- GET /lives: Fetch all live performances.
- GET /lives/:id: Fetch a live performance by ID.
- POST /lives: Create a new live performance.
- PUT /lives/:id: Update a live performance.
- DELETE /lives/:id: Delete a live performance.

## 5. How to Start Working
Understand the Models: Review the models and their relationships in the d:\bandaid\models folder.
Use Classes for Logic: Use the classes in the d:\bandaid\class folder for CRUD operations.
Use Controllers for APIs: Use the controllers in the d:\bandaid\controllers folder to handle API requests.
Run the Seeder: Populate the database with initial data using the seeder in d:\bandaid\utils\seeder.js.

## 6. Example Workflow
Create a New Band

Use the Bands class:

```javascript
const Bands = require('./class/bands.class');
const newBand = await Bands.createBand({
  name: 'New Band',
  genre: 'Rock',
  location: 'NYC',
});
```

Use the Band Controller to expose an API:

```javascript
app.post('/bands', bandController.createBand);
```

This documentation should provide a clear understanding of the project's structure and how to work with it.