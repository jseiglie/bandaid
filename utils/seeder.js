const { Bands, Songs, SetLists, Lives, SetListSongs, UserBands, BandMembers, MusicianProfile } = require('../models');
const Users = require('../class/users.class.js'); // Import the Users class

const seedDatabase = async () => {
  try {
    console.log('Seeding database...');

    //Seed Users using the register method
    const users = [];
    const userData = [
      { email: 'user1@example.com', password: 'User123!' },
      { email: 'user2@example.com', password: 'User223!' },
      { email: 'user3@example.com', password: 'User323!' },
      { email: 'user4@example.com', password: 'User423!' },
      { email: 'user5@example.com', password: 'User523!' },
    ];

    for (const user of userData) {
      const registeredUser = await Users.register(user.email, user.password);
      users.push(registeredUser);
    }

    // Seed Bands
    const bands = await Bands.bulkCreate([
      { name: 'Band A', description: 'Rock band', genre: 'Rock', location: 'NYC' },
      { name: 'Band B', description: 'Jazz band', genre: 'Jazz', location: 'LA' },
      { name: 'Band C', description: 'Pop band', genre: 'Pop', location: 'Chicago' },
      { name: 'Band D', description: 'Metal band', genre: 'Metal', location: 'Seattle' },
      { name: 'Band E', description: 'Indie band', genre: 'Indie', location: 'Austin' },
    ], { returning: true });

    // Seed Songs
    const songs = await Songs.bulkCreate([
      { title: 'Song 1', key: 'C', isSingle: true },
      { title: 'Song 2', key: 'D', isSingle: false },
      { title: 'Song 3', key: 'E', isSingle: true },
      { title: 'Song 4', key: 'F', isSingle: false },
      { title: 'Song 5', key: 'G', isSingle: true },
    ], { returning: true });

    // Seed SetLists
    const setLists = await SetLists.bulkCreate([
      { band_id: bands[0].id, name: 'SetList 1', accepted: true, proposed_by: users[0].id },
      { band_id: bands[1].id, name: 'SetList 2', accepted: false, proposed_by: users[1].id },
      { band_id: bands[2].id, name: 'SetList 3', accepted: true, proposed_by: users[2].id },
      { band_id: bands[3].id, name: 'SetList 4', accepted: false, proposed_by: users[3].id },
      { band_id: bands[4].id, name: 'SetList 5', accepted: true, proposed_by: users[4].id },
    ], { returning: true });

    // Seed Lives
    await Lives.bulkCreate([
      { date_time: new Date(), city: 'NYC', location: 'Central Park', venue: 'Main Stage' },
      { date_time: new Date(), city: 'LA', location: 'Hollywood Bowl', venue: 'Stage A' },
      { date_time: new Date(), city: 'Chicago', location: 'Millennium Park', venue: 'Stage B' },
      { date_time: new Date(), city: 'Seattle', location: 'Space Needle', venue: 'Stage C' },
      { date_time: new Date(), city: 'Austin', location: 'Zilker Park', venue: 'Stage D' },
    ]);

    // Seed SetListSongs
    await SetListSongs.bulkCreate([
      { setlist_id: setLists[0].id, song_id: songs[0].id },
      { setlist_id: setLists[0].id, song_id: songs[1].id },
      { setlist_id: setLists[1].id, song_id: songs[2].id },
      { setlist_id: setLists[2].id, song_id: songs[3].id },
      { setlist_id: setLists[3].id, song_id: songs[4].id },
    ]);

    // Seed UserBands
    await UserBands.bulkCreate([
      { user_id: users[0].id || 1, band_id: bands[0].id },
      { user_id: users[1].id || 2, band_id: bands[1].id },
      { user_id: users[2].id || 3, band_id: bands[2].id },
      { user_id: users[3].id || 4, band_id: bands[3].id },
      { user_id: users[4].id || 1, band_id: bands[4].id },
    ]);

    // Seed BandMembers
    await BandMembers.bulkCreate([
      { user_id: users[0].id || 1, band_id: bands[0].id, role: 'Guitarist' },
      { user_id: users[1].id || 2, band_id: bands[0].id, role: 'Drummer' },
      { user_id: users[2].id || 3, band_id: bands[1].id, role: 'Vocalist' },
      { user_id: users[3].id || 2, band_id: bands[2].id, role: 'Bassist' },
      { user_id: users[4].id || 1, band_id: bands[3].id, role: 'Keyboardist' },
      { user_id: users[0].id || 1, band_id: bands[4].id, role: 'Producer' },
    ]);


// Seed MusicianProfiles
await MusicianProfile.bulkCreate([
  {
    user_id: users[0]?.id || 1,
    bio: 'Experienced guitarist with 10 years of experience.',
    instruments: 'Guitar, Bass',
    genres: 'Rock, Jazz',
    experience: '10 years',
    social_links: JSON.stringify({
      instagram: 'https://instagram.com/user1',
      youtube: 'https://youtube.com/user1',
    }),
  },
  {
    user_id: users[1]?.id || 2,
    bio: 'Drummer with a passion for jazz and rock.',
    instruments: 'Drums',
    genres: 'Jazz, Rock',
    experience: '8 years',
    social_links: JSON.stringify({
      instagram: 'https://instagram.com/user2',
    }),
  },
  {
    user_id: users[2]?.id  || 3,
    bio: 'Pop vocalist with a love for live performances.',
    instruments: 'Vocals',
    genres: 'Pop',
    experience: '5 years',
    social_links: JSON.stringify({
      twitter: 'https://twitter.com/user3',
    }),
  },
  {
    user_id: users[3]?.id  || 4,
    bio: 'Metal bassist with a unique playing style.',
    instruments: 'Bass',
    genres: 'Metal',
    experience: '7 years',
    social_links: JSON.stringify({
      facebook: 'https://facebook.com/user4',
    }),
  },
  {
    user_id: users[4]?.id  || 5,
    bio: 'Keyboardist and producer for indie bands.',
    instruments: 'Keyboard',
    genres: 'Indie',
    experience: '6 years',
    social_links: JSON.stringify({
      linkedin: 'https://linkedin.com/in/user5',
    }),
  },
]);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();