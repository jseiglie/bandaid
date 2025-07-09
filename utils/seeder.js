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
  
} = require('../models');
const Users = require('../class/users.class.js');

const seedDatabase = async () => {
  try {
    console.log('Seeding database...');

    // Seed Users
    const users = [];
    const userData = [
      { email: 'user1@example.com', password: 'User123!', username: 'rockstar1', role: 'user', admin: false, avatar: null },
      { email: 'user2@example.com', password: 'User223!', username: 'drumking2', role: 'user', admin: false, avatar: null },
      { email: 'user3@example.com', password: 'User323!', username: 'popvoice3', role: 'user', admin: false, avatar: null },
      { email: 'user4@example.com', password: 'User423!', username: 'bassboss4', role: 'user', admin: false, avatar: null },
      { email: 'user5@example.com', password: 'User523!', username: 'keyboarder5', role: 'admin', admin: true, avatar: null },
    ];
    for (const user of userData) {
      const registeredUser = await Users.register(user.email, user.password);
      users.push(registeredUser);
    }

    // Seed Bands
    const bands = await Bands.bulkCreate([
      {
        name: 'Band A',
        description: 'Rock band',
        genre: 'Rock',
        location: 'NYC',
        social_media: JSON.stringify([{ id: 1, name: 'Instagram', link: 'https://instagram.com/bandA' }]),
      },
      {
        name: 'Band B',
        description: 'Jazz band',
        genre: 'Jazz',
        location: 'LA',
        social_media: JSON.stringify([{ id: 1, name: 'Facebook', link: 'https://facebook.com/bandB' }]),
      },
      {
        name: 'Band C',
        description: 'Pop band',
        genre: 'Pop',
        location: 'Chicago',
        social_media: JSON.stringify([{ id: 1, name: 'YouTube', link: 'https://youtube.com/bandC' }]),
      },
      {
        name: 'Band D',
        description: 'Metal band',
        genre: 'Metal',
        location: 'Seattle',
        social_media: JSON.stringify([{ id: 1, name: 'LinkedIn', link: 'https://linkedin.com/in/bandD' }]),
      },
      {
        name: 'Band E',
        description: 'Indie band',
        genre: 'Indie',
        location: 'Austin',
        social_media: JSON.stringify([{ id: 1, name: 'Instagram', link: 'https://instagram.com/bandE' }]),
      },
    ], { returning: true });

    // Seed Rehearsal Locals
    const locals = await Rehearsal_Locals.bulkCreate([
      { name: 101, address: '123 Main St', city: 'NYC', state: 'NY', zip_code: '10001', phone: '123-456-7890', email: 'local1@example.com' },
      { name: 202, address: '456 Maple Ave', city: 'LA', state: 'CA', zip_code: '90001', phone: '234-567-8901', email: 'local2@example.com' },
      { name: 303, address: '789 Oak Blvd', city: 'Chicago', state: 'IL', zip_code: '60601', phone: '345-678-9012', email: 'local3@example.com' },
    ], { returning: true });

    // Seed Rehearsals
    await Rehearsals.bulkCreate([
      {
        band_id: bands[0].id,
        local_id: locals[0].id,
        date: '2025-07-15',
        time: '18:00:00',
        location: 'Studio A - NYC',
        notes: 'Warm-up rehearsal for upcoming gig.',
      },
      {
        band_id: bands[1].id,
        local_id: locals[1].id,
        date: '2025-07-18',
        time: '20:00:00',
        location: 'Jazz Room - LA',
        notes: 'Focus on improvisation pieces.',
      },
    ]);

    // Seed Songs
    const songs = await Songs.bulkCreate([
      { title: 'Song 1', key: 'C', isSingle: true, band_id: bands[0].id, proposed_by: users[0].id },
      { title: 'Song 2', key: 'D', isSingle: false, band_id: bands[1].id, proposed_by: users[1].id },
      { title: 'Song 3', key: 'E', isSingle: true, band_id: bands[2].id, proposed_by: users[2].id },
      { title: 'Song 4', key: 'F', isSingle: false, band_id: bands[3].id, proposed_by: users[3].id },
      { title: 'Song 5', key: 'G', isSingle: true, band_id: bands[4].id, proposed_by: users[4].id },
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
      { date_time: new Date(), city: 'NYC', location: 'Central Park', venue: 'Main Stage', band_id: bands[0].id, setlist_id: setLists[0].id },
      { date_time: new Date(), city: 'LA', location: 'Hollywood Bowl', venue: 'Stage A', band_id: bands[1].id, setlist_id: setLists[1].id },
    ]);

    // Seed SetListSongs
    await SetListSongs.bulkCreate([
      { setlist_id: setLists[0].id, song_id: songs[0].id },
      { setlist_id: setLists[0].id, song_id: songs[1].id },
      { setlist_id: setLists[1].id, song_id: songs[2].id },
    ]);

    // Seed UserBands
    await UserBands.bulkCreate([
      { user_id: users[0].id, band_id: bands[0].id },
      { user_id: users[1].id, band_id: bands[1].id },
    ]);

    // Seed BandMembers
    await BandMembers.bulkCreate([
      { user_id: users[0].id, band_id: bands[0].id, role: 'Guitarist' },
      { user_id: users[1].id, band_id: bands[0].id, role: 'Drummer' },
    ]);

    // Seed MusicianProfiles
    await MusicianProfile.bulkCreate([
      {
        user_id: users[0].id,
        bio: 'Experienced guitarist.',
        instruments: 'Guitar',
        genres: 'Rock',
        experience: '10 years',
        social_links: JSON.stringify({ instagram: 'https://instagram.com/user1' }),
      },
      {
        user_id: users[1].id,
        bio: 'Jazz drummer.',
        instruments: 'Drums',
        genres: 'Jazz',
        experience: '8 years',
        social_links: JSON.stringify({ twitter: 'https://twitter.com/user2' }),
      },
    ]);

await BandDefaultSchedules.bulkCreate([
  {
    band_id: bands[0].id,
    local_id: locals[0].id,
    day: 'Tuesday',
    start_time: '18:30:00',
    end_time: '21:30:00',
  },
  {
    band_id: bands[0].id,
    local_id: locals[0].id,
    day: 'Thursday',
    start_time: '18:30:00',
    end_time: '21:30:00',
  },
]);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();
