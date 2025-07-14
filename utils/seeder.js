const {
  Bands,
  Songs,
  SetLists,
  Lives,
  SetListSongs,
  UserBands,
  BandMembers,
  MusicianProfile,
  Rehearsals,
  Rehearsal_Locals,
  BandDefaultSchedules,
  Merchandise,
  Carts,
  CartItems,
} = require("../models");
const Users = require("../class/users.class.js");

const seedDatabase = async () => {
  try {
    console.log("Seeding database...");

    const userData = [
      {
        email: "user1@ex.com",
        password: "Pepe@123",
        username: "rockstar1",
        role: "user",
        admin: false,
        avatar: null,
      },
      {
        email: "user2@ex.com",
        password: "Pepe@123",
        username: "drumking2",
        role: "user",
        admin: false,
        avatar: null,
      },
      {
        email: "user3@ex.com",
        password: "Pepe@123",
        username: "popvoice3",
        role: "user",
        admin: false,
        avatar: null,
      },
      {
        email: "user4@ex.com",
        password: "Pepe@123",
        username: "bassboss4",
        role: "user",
        admin: false,
        avatar: null,
      },
      {
        email: "user5@ex.com",
        password: "Pepe@123",
        username: "keyboarder5",
        role: "admin",
        admin: true,
        avatar: null,
      },
      {
        email: "user6@ex.com",
        password: "Pepe@123",
        username: "altqueen6",
        role: "user",
        admin: false,
        avatar: null,
      },
      {
        email: "user7@ex.com",
        password: "Pepe@123",
        username: "metalcore7",
        role: "user",
        admin: false,
        avatar: null,
      },
      {
        email: "user8@ex.com",
        password: "Pepe@123",
        username: "latinlover8",
        role: "user",
        admin: false,
        avatar: null,
      },
      {
        email: "user9@ex.com",
        password: "Pepe@123",
        username: "funkybeat9",
        role: "user",
        admin: false,
        avatar: null,
      },
      {
        email: "user10@ex.com",
        password: "Pepe@123",
        username: "progman10",
        role: "admin",
        admin: true,
        avatar: null,
      },
    ];

    const users = [];
    for (const user of userData) {
      const registeredUser = await Users.register(user.email, user.password);
      users.push(registeredUser);
    }


    const bands = await Bands.bulkCreate(
      [
        {
          name: "Band A",
          description: "Rock band",
          band_admin: users[0].id,
          genre: "Rock",
          location: "NYC",
          social_media: JSON.stringify([
            { name: "Instagram", link: "https://instagram.com/bandA" },
          ]),
        },
        {
          name: "Band B",
          description: "Jazz band",
          band_admin: users[1].id,
          genre: "Jazz",
          location: "LA",
          social_media: JSON.stringify([
            { name: "Facebook", link: "https://facebook.com/bandB" },
          ]),
        },
        {
          name: "Band C",
          description: "Pop band",
          band_admin: users[2].id,

          genre: "Pop",
          location: "Chicago",
          social_media: JSON.stringify([
            { name: "YouTube", link: "https://youtube.com/bandC" },
          ]),
        },
        {
          name: "Band D",
          description: "Metal band",
          band_admin: users[3].id,
          genre: "Metal",
          location: "Seattle",
          social_media: JSON.stringify([
            { name: "LinkedIn", link: "https://linkedin.com/in/bandD" },
          ]),
        },
        {
          name: "Band E",
          description: "Indie band",
          band_admin: users[4].id,
          genre: "Indie",
          location: "Austin",
          social_media: JSON.stringify([
            { name: "Instagram", link: "https://instagram.com/bandE" },
          ]),
        },
        {
          name: "Band F",
          description: "Alternative rock band",
          band_admin: users[5].id,
          genre: "Alternative",
          location: "Portland",
          social_media: JSON.stringify([
            { name: "Instagram", link: "https://instagram.com/bandF" },
          ]),
        },
        {
          name: "Band G",
          description: "Latin fusion band",
          band_admin: users[6].id,
          genre: "Latin",
          location: "Miami",
          social_media: JSON.stringify([
            { name: "Facebook", link: "https://facebook.com/bandG" },
          ]),
        },
      ],
      { returning: true }
    );

// Seed Merchandise
    const merchandise = await Merchandise.bulkCreate(
      [
        {
          name: "T-Shirt",
          description: "Band T-Shirt",
          price: 20.0,
          stock: 100,
          imageUrl: "https://example.com/tshirt.jpg",
        },
        {
          name: "Cap",
          description: "Band Cap",
          price: 15.0,
          stock: 50,
          imageUrl: "https://example.com/cap.jpg",
        },
        {
          name: "Poster",
          description: "Band Poster",
          price: 10.0,
          stock: 200,
          imageUrl: "https://example.com/poster.jpg",
        },
      ],
      { returning: true }
    );

 // Create Carts for some users
    const carts = await Carts.bulkCreate(
      [
        { userId: users[0].id },
        { userId: users[1].id },
      ],
      { returning: true }
    );

    // Add Cart Items
    await CartItems.bulkCreate(
      [
        { cartId: carts[0].id, merchandiseId: merchandise[0].id, quantity: 2 },
        { cartId: carts[0].id, merchandiseId: merchandise[1].id, quantity: 1 },
        { cartId: carts[1].id, merchandiseId: merchandise[2].id, quantity: 3 },
      ],
      { returning: true }
    );


    const locals = await Rehearsal_Locals.bulkCreate(
      [
        {
          name: 101,
          address: "123 Main St",
          city: "NYC",
          state: "NY",
          zip_code: "10001",
          phone: "123-456-7890",
          email: "local1@example.com",
        },
        {
          name: 202,
          address: "456 Maple Ave",
          city: "LA",
          state: "CA",
          zip_code: "90001",
          phone: "234-567-8901",
          email: "local2@example.com",
        },
        {
          name: 303,
          address: "789 Oak Blvd",
          city: "Chicago",
          state: "IL",
          zip_code: "60601",
          phone: "345-678-9012",
          email: "local3@example.com",
        },
      ],
      { returning: true }
    );

    await Rehearsals.bulkCreate([
      {
        band_id: bands[0].id,
        local_id: locals[0].id,
        date: "2025-07-15",
        time: "18:00:00",
        location: "Studio A - NYC",
        notes: "Warm-up rehearsal for upcoming gig.",
      },
      {
        band_id: bands[1].id,
        local_id: locals[1].id,
        date: "2025-07-18",
        time: "20:00:00",
        location: "Jazz Room - LA",
        notes: "Focus on improvisation pieces.",
      },
      {
        band_id: bands[5].id,
        local_id: locals[2].id,
        date: "2025-07-22",
        time: "17:00:00",
        location: "Alt Garage - Portland",
        notes: "New setlist review.",
      },
      {
        band_id: bands[6].id,
        local_id: locals[1].id,
        date: "2025-07-25",
        time: "19:30:00",
        location: "Tropical Room - Miami",
        notes: "Percussion focus.",
      },
    ]);

    const songs = await Songs.bulkCreate(
      [
        {
          title: "Song 1",
          key: "C",
          isSingle: true,
          band_id: bands[0].id,
          proposed_by: users[0].id,
        },
        {
          title: "Song 2",
          key: "D",
          isSingle: false,
          band_id: bands[1].id,
          proposed_by: users[1].id,
        },
        {
          title: "Song 3",
          key: "E",
          isSingle: true,
          band_id: bands[2].id,
          proposed_by: users[2].id,
        },
        {
          title: "Song 4",
          key: "F",
          isSingle: false,
          band_id: bands[3].id,
          proposed_by: users[3].id,
        },
        {
          title: "Song 5",
          key: "G",
          isSingle: true,
          band_id: bands[4].id,
          proposed_by: users[4].id,
        },
        {
          title: "Song 6",
          key: "A",
          isSingle: true,
          band_id: bands[5].id,
          proposed_by: users[5].id,
        },
        {
          title: "Song 7",
          key: "B",
          isSingle: false,
          band_id: bands[5].id,
          proposed_by: users[6].id,
        },
        {
          title: "Song 8",
          key: "Am",
          isSingle: true,
          band_id: bands[6].id,
          proposed_by: users[7].id,
        },
        {
          title: "Song 9",
          key: "Dm",
          isSingle: false,
          band_id: bands[6].id,
          proposed_by: users[8].id,
        },
      ],
      { returning: true }
    );

    const setLists = await SetLists.bulkCreate(
      [
        {
          band_id: bands[0].id,
          name: "SetList 1",
          accepted: true,
          proposed_by: users[0].id,
        },
        {
          band_id: bands[1].id,
          name: "SetList 2",
          accepted: false,
          proposed_by: users[1].id,
        },
        {
          band_id: bands[5].id,
          name: "SetList 6",
          accepted: false,
          proposed_by: users[5].id,
        },
        {
          band_id: bands[6].id,
          name: "SetList 7",
          accepted: true,
          proposed_by: users[6].id,
        },
      ],
      { returning: true }
    );

    await SetListSongs.bulkCreate([
      { setlist_id: setLists[0].id, song_id: songs[0].id },
      { setlist_id: setLists[0].id, song_id: songs[1].id },
      { setlist_id: setLists[1].id, song_id: songs[2].id },
      { setlist_id: setLists[2].id, song_id: songs[5].id },
      { setlist_id: setLists[2].id, song_id: songs[6].id },
      { setlist_id: setLists[3].id, song_id: songs[7].id },
      { setlist_id: setLists[3].id, song_id: songs[8].id },
    ]);

    await UserBands.bulkCreate([
      { user_id: users[0].id, band_id: bands[0].id },
      { user_id: users[1].id, band_id: bands[1].id },
      { user_id: users[5].id, band_id: bands[5].id },
      { user_id: users[6].id, band_id: bands[5].id },
      { user_id: users[7].id, band_id: bands[6].id },
    ]);

    const musicianProfiles = await MusicianProfile.bulkCreate(
      [
        {
          user_id: users[0].id,
          bio: "Experienced guitarist.",
          instruments: "Guitar",
          genres: "Rock",
          experience: "10 years",
          social_links: JSON.stringify({
            instagram: "https://instagram.com/user1",
          }),
        },
        {
          user_id: users[1].id,
          bio: "Jazz drummer.",
          instruments: "Drums",
          genres: "Jazz",
          experience: "8 years",
          social_links: JSON.stringify({
            twitter: "https://twitter.com/user2",
          }),
        },
        {
          user_id: users[5].id,
          bio: "Alternative vocalist.",
          instruments: "Vocals",
          genres: "Alternative",
          experience: "5 years",
          social_links: JSON.stringify({
            instagram: "https://instagram.com/user6",
          }),
        },
        {
          user_id: users[6].id,
          bio: "Metalcore guitarist.",
          instruments: "Guitar",
          genres: "Metalcore",
          experience: "7 years",
          social_links: JSON.stringify({
            soundcloud: "https://soundcloud.com/user7",
          }),
        },
        {
          user_id: users[7].id,
          bio: "Latin percussionist.",
          instruments: "Percussion",
          genres: "Latin",
          experience: "9 years",
          social_links: JSON.stringify({
            youtube: "https://youtube.com/user8",
          }),
        },
      ],
      { returning: true }
    );

    await BandMembers.bulkCreate([
      {
        musician_id: musicianProfiles[0].id,
        band_id: bands[0].id,
        role: "Guitarist",
      },
      {
        musician_id: musicianProfiles[1].id,
        band_id: bands[0].id,
        role: "Drummer",
      },
      {
        musician_id: musicianProfiles[2].id,
        band_id: bands[5].id,
        role: "Vocalist",
      },
      {
        musician_id: musicianProfiles[3].id,
        band_id: bands[5].id,
        role: "Guitarist",
      },
      {
        musician_id: musicianProfiles[4].id,
        band_id: bands[6].id,
        role: "Percussionist",
      },
    ]);

    await BandDefaultSchedules.bulkCreate([
      {
        band_id: bands[0].id,
        local_id: locals[0].id,
        day: "Tuesday",
        start_time: "18:30:00",
        end_time: "21:30:00",
      },
      {
        band_id: bands[0].id,
        local_id: locals[0].id,
        day: "Thursday",
        start_time: "18:30:00",
        end_time: "21:30:00",
      },
      {
        band_id: bands[5].id,
        local_id: locals[2].id,
        day: "Wednesday",
        start_time: "17:00:00",
        end_time: "20:00:00",
      },
      {
        band_id: bands[6].id,
        local_id: locals[1].id,
        day: "Monday",
        start_time: "19:00:00",
        end_time: "21:00:00",
      },
    ]);

    await Lives.bulkCreate([
      {
        date_time: new Date(),
        city: "NYC",
        location: "Central Park",
        venue: "Main Stage",
        band_id: bands[0].id,
        setlist_id: setLists[0].id,
      },
      {
        date_time: new Date(),
        city: "LA",
        location: "Hollywood Bowl",
        venue: "Stage A",
        band_id: bands[1].id,
        setlist_id: setLists[1].id,
      },
    ]);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
