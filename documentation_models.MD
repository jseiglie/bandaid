# Documentation: Models, Relationships, and CRUD Operations

This documentation provides an overview of the data models, their relationships, and how to use the classes and controllers for CRUD operations. It's intended to help developers understand the structure, functionality, and &quot;how to&quot; of the project.

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
- `Bands` has many `BandMembers`.

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
- `Users` has many `BandMembers`.

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
- `notes`: Additional notes about the performance.
- `price`: Ticket price.
- `tickets_link`: URL for ticket purchase.
- `promoted`: Boolean indicating if the performance is promoted.

**Associations:**
- `Lives` belongs to `Bands`.
- `Lives` belongs to `SetLists`.

---

### **1.5 SetLists**
Represents a setlist for a band.

**Fields:**
- `id`: Primary key.
- `band_id`: Foreign key referencing `Bands`.
- `proposed_by`: Foreign key referencing `Users`.
- `name`: Name of the setlist.
- `accepted`: Boolean indicating if the setlist is accepted.

**Associations:**
- `SetLists` belongs to `Bands`.
- `SetLists` belongs to many `Songs` through `SetListSongs`.
- `SetLists` has many `Lives`.

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

### **1.7 BandMembers**
Represents members of a band.

**Fields:**
- `id`: Primary key.
- `band_id`: Foreign key referencing `Bands`.
- `user_id`: Foreign key referencing `Users`.
- `role`: Role of the member in the band.

**Associations:**
- `BandMembers` belongs to `Bands`.
- `BandMembers` belongs to `Users`.

---

### **1.8 MusicianProfile**
Represents a musician's profile.

**Fields:**
- `id`: Primary key.
- `user_id`: Foreign key referencing `Users`.
- `bio`: Biography of the musician.
- `instruments`: Instruments played by the musician.
- `genres`: Genres the musician is associated with.
- `experience`: Experience level of the musician.
- `social_links`: JSON object of social media links.

**Associations:**
- `MusicianProfile` belongs to `Users`.

---

## **2. Relationships**

- **Users ↔ Bands**: Many-to-Many via `UserBands`.
- **Bands ↔ Lives**: One-to-Many.
- **Bands ↔ SetLists**: One-to-Many.
- **SetLists ↔ Songs**: Many-to-Many via `SetListSongs`.
- **Bands ↔ BandMembers**: One-to-Many.
- **Users ↔ BandMembers**: One-to-Many.
- **Users ↔ MusicianProfile**: One-to-One.

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