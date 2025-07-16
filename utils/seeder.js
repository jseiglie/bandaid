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
  PurchaseHistory,
  Categories,
  BandFollowers,
  MerchandiseFavorites,
  Posts,
  Comments,
  PostLikes,
  CommentLikes,
  Tags,
  PostMedia,
  PostTags,
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
        phoneNumber: "123-456-7890",
        address: "123 Rock St, NYC",
      },
      {
        email: "user2@ex.com",
        password: "Pepe@123",
        username: "drumking2",
        role: "user",
        admin: false,
        avatar: null,
        phoneNumber: "123-456-7891",
        address: "124 Rock St, NYC",
      },
      {
        email: "user3@ex.com",
        password: "Pepe@123",
        username: "popvoice3",
        role: "user",
        admin: false,
        avatar: null,
        phoneNumber: "123-456-7892",
        address: "125 Rock St, NYC",
      },
      {
        email: "user4@ex.com",
        password: "Pepe@123",
        username: "bassboss4",
        role: "user",
        admin: false,
        avatar: null,
        phoneNumber: "123-456-7893",
        address: "1230 Rock St, NYC",
      },
      {
        email: "user5@ex.com",
        password: "Pepe@123",
        username: "keyboarder5",
        role: "admin",
        admin: true,
        avatar: null,
        phoneNumber: "123-456-7895",
        address: "1238 Rock St, NYC",
      },
      {
        email: "user6@ex.com",
        password: "Pepe@123",
        username: "altqueen6",
        role: "user",
        admin: false,
        avatar: null,
        phoneNumber: "123-456-7896",
        address: "1231 Rock St, NYC",
      },
      {
        email: "user7@ex.com",
        password: "Pepe@123",
        username: "metalcore7",
        role: "user",
        admin: false,
        avatar: null,
        phoneNumber: "123-456-7899",
        address: "1234 Rock St, NYC",
      },
      {
        email: "user8@ex.com",
        password: "Pepe@123",
        username: "latinlover8",
        role: "user",
        admin: false,
        avatar: null,
        phoneNumber: "123-456-7870",
        address: "113 Rock St, NYC",
      },
      {
        email: "user9@ex.com",
        password: "Pepe@123",
        username: "funkybeat9",
        role: "user",
        admin: false,
        avatar: null,
        phoneNumber: "123-456-6890",
        address: "23 Rock St, NYC",
      },
      {
        email: "user10@ex.com",
        password: "Pepe@123",
        username: "progman10",
        role: "admin",
        admin: true,
        avatar: null,
        phoneNumber: "123-456-5890",
        address: "723 Rock St, NYC",
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

    // Seed Categories
    const categories = await Categories.bulkCreate(
      [
        { category: "Apparel" },
        { category: "Accessories" },
        { category: "Posters" },
        { category: "Music" },
        { category: "Collectibles" },
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
          owner: bands[0].id,
          category: categories[0].id,
          isAvailable: true,
        },
        {
          name: "Cap",
          description: "Band Cap",
          price: 15.0,
          stock: 50,
          imageUrl: "https://example.com/cap.jpg",
          owner: bands[1].id,
          category: categories[1].id,
          isAvailable: true,
        },
        {
          name: "Poster",
          description: "Band Poster",
          price: 10.0,
          stock: 200,
          imageUrl: "https://example.com/poster.jpg",
          owner: bands[0].id,
          category: categories[2].id,
          isAvailable: true,
        },
        {
          name: "Vinyl Record",
          description: "Band Vinyl Record",
          price: 25.0,
          stock: 30,
          imageUrl: "https://example.com/vinyl.jpg",
          owner: bands[1].id,
          category: categories[3].id,
          isAvailable: true,
        },
        {
          name: "Hoodie",
          description: "Band Hoodie",
          price: 40.0,
          stock: 80,
          imageUrl: "https://example.com/hoodie.jpg",
          owner: bands[4].id,
          category: categories[0].id,
          isAvailable: true,
        },
        {
          name: "Stickers",
          description: "Band Stickers",
          price: 5.0,
          stock: 500,
          imageUrl: "https://example.com/stickers.jpg",
          owner: bands[0].id,
          category: categories[1].id,
          isAvailable: true,
        },
        {
          name: "CD Album",
          description: "Band CD Album",
          price: 15.0,
          stock: 100,
          imageUrl: "https://example.com/cd.jpg",
          owner: bands[1].id,
          category: categories[3].id,
          isAvailable: false,
        },
        {
          name: "Keychain",
          description: "Band Keychain",
          price: 8.0,
          stock: 300,
          imageUrl: "https://example.com/keychain.jpg",
          owner: bands[0].id,
          category: categories[0].id,
          isAvailable: false,
        },
        {
          name: "Wristband",
          description: "Band Wristband",
          price: 3.0,
          stock: 400,
          imageUrl: "https://example.com/wristband.jpg",
          owner: bands[1].id,
          category: categories[1].id,
          isAvailable: true,
        },
        {
          name: "Poster Set",
          description: "Set of Band Posters",
          price: 12.0,
          stock: 150,
          imageUrl: "https://example.com/posterset.jpg",
          owner: bands[0].id,
          category: categories[2].id,
          isAvailable: false,
        },
      ],
      { returning: true }
    );

    // Create Carts for some users
    const carts = await Carts.bulkCreate(
      [
        { user_id: users[0].id },
        { user_id: users[1].id },
        { user_id: users[2].id },
        { user_id: users[3].id },
      ],
      { returning: true }
    );

    // Add Cart Items
    await CartItems.bulkCreate(
      [
        {
          cart_id: carts[0].id,
          merchandise_id: merchandise[0].id,
          quantity: 2,
        },
        {
          cart_id: carts[0].id,
          merchandise_id: merchandise[1].id,
          quantity: 1,
        },
        {
          cart_id: carts[1].id,
          merchandise_id: merchandise[2].id,
          quantity: 3,
        },
        {
          cart_id: carts[1].id,
          merchandise_id: merchandise[3].id,
          quantity: 1,
        },
        {
          cart_id: carts[0].id,
          merchandise_id: merchandise[4].id,
          quantity: 2,
        },
        {
          cart_id: carts[1].id,
          merchandise_id: merchandise[5].id,
          quantity: 1,
        },
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

    await PurchaseHistory.bulkCreate(
      [
        {
          user_id: users[0].id,
          merchandise_id: merchandise[0].id,
          quantity: 2,
          purchaseDate: new Date(),
          totalPrice: merchandise[0].price * 2,
        },
        {
          user_id: users[1].id,
          merchandise_id: merchandise[1].id,
          quantity: 1,
          purchaseDate: new Date(),
          totalPrice: merchandise[1].price * 1,
        },
        {
          user_id: users[2].id,
          merchandise_id: merchandise[2].id,
          quantity: 3,
          purchaseDate: new Date(),
          totalPrice: merchandise[2].price * 3,
        },
        {
          user_id: users[3].id,
          merchandise_id: merchandise[0].id,
          quantity: 1,
          purchaseDate: new Date(),
          totalPrice: merchandise[0].price * 1,
        },
        {
          user_id: users[0].id,
          merchandise_id: merchandise[1].id,
          quantity: 2,
          purchaseDate: new Date(),
          totalPrice: merchandise[1].price * 2,
        },
        {
          user_id: users[2].id,
          merchandise_id: merchandise[2].id,
          quantity: 1,
          purchaseDate: new Date(),
          totalPrice: merchandise[2].price * 1,
        },
        {
          user_id: users[2].id,
          merchandise_id: merchandise[3].id,
          quantity: 4,
          purchaseDate: new Date(),
          totalPrice: merchandise[3].price * 4,
        },
        {
          user_id: users[0].id,
          merchandise_id: merchandise[4].id,
          quantity: 5,
          purchaseDate: new Date(),
          totalPrice: merchandise[4].price * 5,
        },
        {
          user_id: users[0].id,
          merchandise_id: merchandise[5].id,
          quantity: 1,
          purchaseDate: new Date(),
          totalPrice: merchandise[5].price * 1,
        },
        {
          user_id: users[1].id,
          merchandise_id: merchandise[6].id,
          quantity: 2,
          purchaseDate: new Date(),
          totalPrice: merchandise[6].price * 2,
        },
      ],
      { returning: true }
    );
    // Seed BandFollowers
    await BandFollowers.bulkCreate([
      { band_id: bands[0].id, follower_id: users[1].id },
      { band_id: bands[1].id, follower_id: users[2].id },
      { band_id: bands[2].id, follower_id: users[3].id },
      { band_id: bands[3].id, follower_id: users[4].id },
    ]);

    // Seed MerchandiseFavorites
    await MerchandiseFavorites.bulkCreate([
      { user_id: users[0].id, merchandise_id: merchandise[0].id },
      { user_id: users[1].id, merchandise_id: merchandise[1].id },
      { user_id: users[2].id, merchandise_id: merchandise[2].id },
      { user_id: users[3].id, merchandise_id: merchandise[3].id },
    ]);

    //seed tags
    // const tags = await BandTags.bulkCreate(
    //   [
    //     { name: "Pop" },
    //     { name: "Rock" },
    //     { name: "Country" },
    //     { name: "Jazz" },
    //     { name: "R&B" },
    //     { name: "Hip-Hop" },
    //     { name: "Electronic" },
    //     { name: "Indie" },
    //     { name: "Metal" },
    //     { name: "Alternative" },
    //     { name: "Folk" },
    //     { name: "Classical" },
    //     { name: "Blues" },
    //     { name: "Soul" },
    //     { name: "Funk" },
    //     { name: "Reggae" },
    //     { name: "Latin" },
    //     { name: "World" },
    //     { name: "Experimental" },
    //     { name: "Punk" },
    //     { name: "Gospel" },
    //     { name: "Ska" },
    //     { name: "Rap" },
    //     { name: "Hip-Hop" },
    //     { name: "Dance" },
    //     { name: "Techno" },
    //     { name: "House" },
    //     { name: "Trance" },
    //     { name: "Dubstep" },
    //     { name: "Ambient" },
    //     { name: "Chillout" },
    //     { name: "Synthwave" },
    //     { name: "Lo-fi" },
    //     { name: "Acoustic" },
    //     { name: "Experimental Rock" },
    //     { name: "Post-Rock" },
    //     { name: "Progressive Rock" },
    //     { name: "Hard Rock" },
    //     { name: "Soft Rock" },
    //     { name: "Classic Rock" },
    //     { name: "Grunge" },
    //     { name: "Psychedelic Rock" },
    //     { name: "Garage Rock" },
    //     { name: "Surf Rock" },
    //     { name: "Death Metal" },
    //     { name: "Black Metal" },
    //     { name: "Power Metal" },
    //     { name: "Thrash Metal" },
    //     { name: "Deathcore" },
    //     { name: "Metalcore" },
    //     { name: "Djent" },
    //     { name: "Post-Hardcore" },
    //     { name: "Screamo" },
    //     { name: "Emo" },
    //     { name: "Pop Punk" },
    //     { name: "Skate Punk" },
    //     { name: "Synth Punk" },
    //     { name: "Techno Punk" },
    //     { name: "Dubstep Punk" },
    //     { name: "Minimal Punk" },
    //     { name: "Alternative Rock Punk" },
    //     { name: "Grunge Punk" },
    //     { name: "Post-Grunge Punk" },
    //     { name: "Alternative Grunge Punk" },
    //     { name: "Post-Alternative Grunge Punk" },
    //     { name: "Psychedelic Grunge Punk" },
    //     { name: "Gangsta Punk" },
    //     { name: "Punk Rock" },
    //     { name: "Hardcore Punk" },
    //     { name: "Deathcore Punk" },
    //     { name: "Post-Deathcore Punk" },
    //     { name: "Punk Rock Punk" },
    //     { name: "Hardcore Punk Punk" },
    //     { name: "Deathcore Punk Punk" },
    //     { name: "Post-Deathcore Punk Punk" },
    //     { name: "Alternative Rock Punk Punk" },
    //     { name: "Grunge Punk Punk" },
    //     { name: "Post-Grunge Punk Punk" },
    //     { name: "Psychedelic Grunge Punk Punk" },
    //   ],
    //   { returning: true }
    // );

    //post Tags
    const tagsData = [
      { tag_name: "Lives" },
      { tag_name: "Rehearsals" },
      { tag_name: "Merchandise" },
      { tag_name: "Music" },
      { tag_name: "Band News" },
      { tag_name: "Events" },
      { tag_name: "Announcements" },
      { tag_name: "Collaborations" },
      { tag_name: "Releases" },
      { tag_name: "Behind the Scenes" },
      { tag_name: "Updates" },
      { tag_name: "Music Videos" },
      { tag_name: "Newsletters" },
      { tag_name: "Press Releases" },
      { tag_name: "Podcasts" },
      { tag_name: "Social Media" },
      { tag_name: "YouTube" },
      { tag_name: "Facebook" },
      { tag_name: "Instagram" },
      { tag_name: "Twitter" },
      { tag_name: "Snapchat" },
      { tag_name: "TikTok" },
      { tag_name: "LinkedIn" },
      { tag_name: "Pinterest" },
      { tag_name: "Reddit" },
      { tag_name: "YouTube Music" },
      { tag_name: "SoundCloud" },
      { tag_name: "Bandcamp" },
      { tag_name: "Spotify" },
      { tag_name: "Apple Music" },
      { tag_name: "Amazon Music" },
      { tag_name: "Tidal" },
      { tag_name: "Deezer" },
      { tag_name: "Gear" },
      { tag_name: "Cassette Tape" },
      { tag_name: "CD" },
      { tag_name: "Vinyl" },
      { tag_name: "LP" },
      { tag_name: "Magazine" },
      { tag_name: "Newspaper" },
      { tag_name: "Billboard" },
      { tag_name: "Billboard Top 40" },
      { tag_name: "Billboard Hot 100" },
      { tag_name: "Billboard 200" },
      { tag_name: "Billboard Rock" },
      { tag_name: "Billboard Pop" },
      { tag_name: "Billboard Country" },
      { tag_name: "Billboard Hip-Hop" },
      { tag_name: "Billboard R&B" },
      { tag_name: "Billboard Dance" },
      { tag_name: "Billboard Electronic" },
      { tag_name: "Billboard Indie" },
      { tag_name: "Billboard Alternative" },
      { tag_name: "Billboard Rock & Roll" },
      { tag_name: "Billboard Grunge" },
      { tag_name: "Billboard Punk" },
      { tag_name: "Billboard Hardcore" },
      { tag_name: "Billboard Ska" },
      { tag_name: "Billboard Disco" },
      { tag_name: "Billboard Funk" },
      { tag_name: "Billboard Jazz" },
      { tag_name: "Billboard Blues" },
      { tag_name: "Billboard Rhythm & Blues" },
      { tag_name: "Billboard Latin" },
      { tag_name: "Billboard Reggae" },
      { tag_name: "Billboard Classical" },
      { tag_name: "Billboard Easy Listening" },
      { tag_name: "Billboard Pop Rock" },
      { tag_name: "Billboard Punk Rock" },
      { tag_name: "Billboard Hardcore Punk" },
      { tag_name: "Billboard Deathcore Punk" },
      { tag_name: "Billboard Post-Deathcore Punk" },
      { tag_name: "Billboard Punk Rock Punk" },
      { tag_name: "Billboard Hardcore Punk Punk" },
      { tag_name: "Billboard Deathcore Punk Punk" },
      { tag_name: "Billboard Post-Deathcore Punk Punk" },
      { tag_name: "Billboard Alternative Rock Punk Punk" },
      { tag_name: "Billboard Grunge Punk Punk" },
      { tag_name: "Billboard Post-Grunge Punk Punk" },
      { tag_name: "Billboard Psychedelic Grunge Punk Punk" },
      { tag_name: "Billboard Gangsta Punk" },
      { tag_name: "Billboard Punk Rock" },
      { tag_name: "Billboard Hardcore Punk" },
      { tag_name: "Billboard Deathcore Punk" },
      { tag_name: "Billboard Post-Deathcore Punk" },
      { tag_name: "Billboard Alternative Rock Punk" },
      { tag_name: "Billboard Grunge Punk" },
      { tag_name: "Billboard Post-Grunge Punk" },
      { tag_name: "Billboard Psychedelic Grunge Punk" },
      { tag_name: "Billboard Experimental" },
      { tag_name: "Billboard Post-Rock" },
      { tag_name: "Billboard Progressive Rock" },
      { tag_name: "Billboard Hard Rock" },
      { tag_name: "Billboard Soft Rock" },
      { tag_name: "Billboard Classic Rock" },
      { tag_name: "Billboard Grunge" },
      { tag_name: "Billboard Psychedelic Rock" },
      { tag_name: "Billboard Garage Rock" },
      { tag_name: "Billboard Surf Rock" },
    ];

    const tags = [];
    for (const tag of tagsData) {
      const createdTag = await Tags.create(tag);
      tags.push(createdTag);
    }

    // Seed Posts
    const posts = await Posts.bulkCreate(
      [
        {
          title: "First Post",
          content: "This is the first post",
          author_id: users[0].id,
        },
        {
          title: "Second Post",
          content: "This is the second post",
          author_id: users[1].id,
        },
        {
          title: "Third Post",
          content: "This is the third post",
          author_id: users[2].id,
        },
        {
          title: "Fourth Post",
          content: "This is the fourth post",
          author_id: users[3].id,
        },
        {
          title: "Fifth Post",
          content: "This is the fifth post",
          author_id: users[4].id,
        },
        {
          title: "Sixth Post",
          content: "This is the sixth post",
          author_id: users[5].id,
        },
        {
          title: "Seventh Post",
          content: "This is the seventh post",
          author_id: users[6].id,
        },
        {
          title: "Eighth Post",
          content: "This is the eighth post",
          author_id: users[7].id,
        },
        {
          title: "Ninth Post",
          content: "This is the ninth post",
          author_id: users[8].id,
        },
        {
          title: "Tenth Post",
          content: "This is the tenth post",
          author_id: users[9].id,
        },
        {
          title: "Eleventh Post",
          content: "This is the eleventh post",
          author_id: users[0].id,
        },
        {
          title: "Twelfth Post",
          content: "This is the twelfth post",
          author_id: users[1].id,
        },
        {
          title: "Thirteenth Post",
          content: "This is the thirteenth post",
          author_id: users[2].id,
        },
        {
          title: "Fourteenth Post",
          content: "This is the fourteenth post",
          author_id: users[3].id,
        },
        {
          title: "Fifteenth Post",
          content: "This is the fifteenth post",
          author_id: users[4].id,
        },
        {
          title: "Sixteenth Post",
          content: "This is the sixteenth post",
          author_id: users[5].id,
        },
        {
          title: "Seventeenth Post",
          content: "This is the seventeenth post",
          author_id: users[6].id,
        },
        {
          title: "Eighteenth Post",
          content: "This is the eighteenth post",
          author_id: users[7].id,
        },
        {
          title: "Nineteenth Post",
          content: "This is the nineteenth post",
          author_id: users[8].id,
        },
        {
          title: "Twentieth Post",
          content: "This is the twentieth post",
          author_id: users[9].id,
        },
        {
          title: "Twenty-First Post",
          content: "This is the twenty-first post",
          author_id: users[0].id,
        },
        {
          title: "Twenty-Second Post",
          content: "This is the twenty-second post",
          author_id: users[1].id,
        },
        {
          title: "Twenty-Third Post",
          content: "This is the twenty-third post",
          author_id: users[2].id,
        },
        {
          title: "Twenty-Fourth Post",
          content: "This is the twenty-fourth post",
          author_id: users[3].id,
        },
        {
          title: "Twenty-Fifth Post",
          content: "This is the twenty-fifth post",
          author_id: users[4].id,
        },
      ],
      { returning: true }
    );

    //seed post tags
    await PostTags.bulkCreate(
      [
        { post_id: posts[0].id, tag_id: tags[0].id },
        { post_id: posts[0].id, tag_id: tags[1].id },
        { post_id: posts[1].id, tag_id: tags[2].id },
        { post_id: posts[1].id, tag_id: tags[3].id },
        { post_id: posts[2].id, tag_id: tags[4].id },
        { post_id: posts[2].id, tag_id: tags[5].id },
        { post_id: posts[3].id, tag_id: tags[6].id },
        { post_id: posts[3].id, tag_id: tags[7].id },
        { post_id: posts[4].id, tag_id: tags[8].id },
        { post_id: posts[4].id, tag_id: tags[9].id },
        { post_id: posts[5].id, tag_id: tags[10].id },
        { post_id: posts[5].id, tag_id: tags[11].id },
        { post_id: posts[6].id, tag_id: tags[12].id },
        { post_id: posts[6].id, tag_id: tags[13].id },
        { post_id: posts[7].id, tag_id: tags[14].id },
        { post_id: posts[7].id, tag_id: tags[15].id },
        { post_id: posts[8].id, tag_id: tags[16].id },
        { post_id: posts[8].id, tag_id: tags[17].id },
        { post_id: posts[9].id, tag_id: tags[18].id },
        { post_id: posts[9].id, tag_id: tags[19].id },
        { post_id: posts[10].id, tag_id: tags[20].id },
        { post_id: posts[10].id, tag_id: tags[21].id },
        { post_id: posts[11].id, tag_id: tags[22].id },
        { post_id: posts[11].id, tag_id: tags[23].id },
        { post_id: posts[12].id, tag_id: tags[24].id },
        { post_id: posts[12].id, tag_id: tags[25].id },
        { post_id: posts[13].id, tag_id: tags[26].id },
        { post_id: posts[13].id, tag_id: tags[27].id },
        { post_id: posts[14].id, tag_id: tags[28].id },
        { post_id: posts[14].id, tag_id: tags[29].id },
        { post_id: posts[15].id, tag_id: tags[30].id },
        { post_id: posts[15].id, tag_id: tags[31].id },
        { post_id: posts[16].id, tag_id: tags[32].id },
        { post_id: posts[16].id, tag_id: tags[33].id },
        { post_id: posts[17].id, tag_id: tags[34].id },
        { post_id: posts[17].id, tag_id: tags[35].id },
        { post_id: posts[18].id, tag_id: tags[36].id },
        { post_id: posts[18].id, tag_id: tags[37].id },
        { post_id: posts[19].id, tag_id: tags[38].id },
        { post_id: posts[19].id, tag_id: tags[39].id },
      ],
      { returning: true }
    );

    //seed postMedia
    let imageId = 1000;
    const width = 800;
    const height = 600;
    await PostMedia.bulkCreate(
      [
        {
          post_id: posts[0].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[0].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[1].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[1].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[2].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[2].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[3].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[3].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[4].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[4].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[5].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[5].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[6].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[6].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[7].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[7].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[8].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[8].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[9].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[9].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[10].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[10].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[11].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[11].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[12].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[12].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[13].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[13].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[14].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[14].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[15].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[15].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[16].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[16].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[17].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[17].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[18].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[18].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[19].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[19].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[20].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
        {
          post_id: posts[20].id,
          media_type: "image",
          media_url: `https://picsum.photos/id/${imageId++}/${width}/${height}`,
        },
      ],
      { returning: true }
    );
    // Seed Comments
    const comments = await Comments.bulkCreate(
      [
        {
          content: "Great post!",
          post_id: posts[0].id,
          author_id: users[1].id,
        },
        {
          content: "Thanks for sharing!",
          post_id: posts[0].id,
          author_id: users[2].id,
        },
        {
          content: "Interesting read",
          post_id: posts[1].id,
          author_id: users[0].id,
        },
        {
          content: "I love this!",
          post_id: posts[1].id,
          author_id: users[3].id,
        },
        {
          content: "Can't wait for more!",
          post_id: posts[2].id,
          author_id: users[4].id,
        },
        {
          content: "This is awesome!",
          post_id: posts[2].id,
          author_id: users[5].id,
        },
        {
          content: "So inspiring!",
          post_id: posts[3].id,
          author_id: users[6].id,
        },
        {
          content: "Keep it up!",
          post_id: posts[3].id,
          author_id: users[7].id,
        },
      ],
      { returning: true }
    );

    // Seed PostLikes
    await PostLikes.bulkCreate([
      { post_id: posts[0].id, user_id: users[1].id, liked: true },
      { post_id: posts[0].id, user_id: users[2].id, liked: true },
      { post_id: posts[1].id, user_id: users[0].id, liked: true },
      { post_id: posts[1].id, user_id: users[3].id, liked: false },
      { post_id: posts[2].id, user_id: users[4].id, liked: true },
      { post_id: posts[2].id, user_id: users[5].id, liked: false },
      { post_id: posts[3].id, user_id: users[6].id, liked: true },
      { post_id: posts[3].id, user_id: users[7].id, liked: false },
      { post_id: posts[4].id, user_id: users[8].id, liked: true },
      { post_id: posts[4].id, user_id: users[9].id, liked: true },
      { post_id: posts[5].id, user_id: users[0].id, liked: false },
      { post_id: posts[5].id, user_id: users[3].id, liked: false },
    ]);

    // Seed CommentLikes
    await CommentLikes.bulkCreate([
      { comment_id: comments[0].id, user_id: users[2].id, liked: false },
      { comment_id: comments[1].id, user_id: users[0].id, liked: true },
      { comment_id: comments[2].id, user_id: users[1].id, liked: true },
      { comment_id: comments[3].id, user_id: users[3].id, liked: false },
      { comment_id: comments[4].id, user_id: users[4].id, liked: true },
      { comment_id: comments[5].id, user_id: users[5].id, liked: true },
      { comment_id: comments[6].id, user_id: users[6].id, liked: false },
    ]);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
