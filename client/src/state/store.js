export const initialStore = () => {
  return {
    user: JSON.parse(localStorage.getItem("user")) || {
      user: {
        id: 1,
        username: "blazingsession_user1",
        email: "user1@example.com",
        admin: false,
        role: "user",
        avatar:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreepngimg.com%2Fthumb%2Fband%2F26223-1-band-photos.png&f=1&nofb=1&ipt=4d20faa39f989336905b6721f7dba99b693a340d1df470aed77958d3f02a72ef",
        createdAt: "2025-04-27T19:22:37.000Z",
        updatedAt: "2025-04-27T19:22:37.000Z",
        bands: [
          {
            id: 1,
            name: "Band A",
            description: "Rock band",
            genre: "Rock",
            location: "NYC",
            website: null,
            logo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreepngimg.com%2Fthumb%2Fband%2F26223-1-band-photos.png&f=1&nofb=1&ipt=4d20faa39f989336905b6721f7dba99b693a340d1df470aed77958d3f02a72ef",
            createdAt: "2025-04-27T19:22:37.000Z",
            updatedAt: "2025-04-27T19:22:37.000Z",
            bandMembers: [
              {
                id: 1,
                username: "blazingsession_user1",
                email: "user1@example.com",
                admin: false,
                role: "Guitarist",
                avatar:
                  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreepngimg.com%2Fthumb%2Fband%2F26223-1-band-photos.png&f=1&nofb=1&ipt=4d20faa39f989336905b6721f7dba99b693a340d1df470aed77958d3f02a72ef",
                createdAt: "2025-04-27T19:22:37.000Z",
                updatedAt: "2025-04-27T19:22:37.000Z",
                profile: {
                  id: 1,
                  user_id: 1,
                  bio: "Experienced guitarist with 10 years of experience.",
                  instruments: "Guitar, Bass",
                  genres: "Rock, Jazz",
                  experience: "10 years",
                  social_links: {
                    instagram: "https://instagram.com/user1",
                    youtube: "https://youtube.com/user1",
                  },
                  createdAt: "2025-04-27T19:22:37.000Z",
                  updatedAt: "2025-04-27T19:22:37.000Z",
                },
              },
              {
                id: 2,
                username: "thunderousanthem_user2",
                email: "user2@example.com",
                admin: false,
                role: "Drummer",
                avatar:
                  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreepngimg.com%2Fthumb%2Fband%2F26223-1-band-photos.png&f=1&nofb=1&ipt=4d20faa39f989336905b6721f7dba99b693a340d1df470aed77958d3f02a72ef",
                createdAt: "2025-04-27T19:22:37.000Z",
                updatedAt: "2025-04-27T19:22:37.000Z",
                profile: {
                  id: 2,
                  user_id: 2,
                  bio: "Drummer with a passion for jazz and rock.",
                  instruments: "Drums",
                  genres: "Jazz, Rock",
                  experience: "8 years",
                  social_links: {
                    instagram: "https://instagram.com/user2",
                  },
                  createdAt: "2025-04-27T19:22:37.000Z",
                  updatedAt: "2025-04-27T19:22:37.000Z",
                },
              },
            ],
            nextLive: {
              id: 2,
              date_time: "2025-05-02T19:22:37.000Z",
              city: "LA",
              location: "Hollywood Bowl",
              venue: "Stage A",
              notes: null,
              price: null,
              tickets_link: null,
              promoted: false,
              createdAt: "2025-04-27T19:22:37.000Z",
              updatedAt: "2025-04-27T19:22:37.000Z",
              band_id: 1,
              setlist_id: null,
            },
          },
        ],
        profile: {
          id: 1,
          user_id: 1,
          bio: "Experienced guitarist with 10 years of experience.",
          instruments: "Guitar, Bass",
          genres: "Rock, Jazz",
          experience: "10 years",
          social_links: {
            instagram: "https://instagram.com/user1",
            youtube: "https://youtube.com/user1",
          },
          createdAt: "2025-04-27T19:22:37.000Z",
          updatedAt: "2025-04-27T19:22:37.000Z",
        },
      },
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ2MTI5MjI1fQ.8n_OT3l2-Ymcc1s9l0besstQN6kBivQr69oL68AKy80",
    },
    auth: !!localStorage.getItem("token"),
    token: localStorage.getItem("token") || null,
    ok: false,
    features: [
      {
        feature: "Set List",
        img: "missing img",
        description:
          "Create your set lists easily, stage ready and share with the band.",
        link: "missing link",
        buttonText: "Start now",
      },
      {
        feature: "Band",
        img: "missing img",
        description:
          "Have all your band members, songs, lives  in one place and manage them easily.",
        link: "missing link",
        buttonText: "Start now",
      },
      {
        feature: "Lives",
        img: "missing img",
        description:
          "Create and manage your lives and share them with your bandmates and your fans.",
        link: "missing link",
        buttonText: "Start now",
      },
    ],
  };
};
//  NO PUEDE SER ASYNC!!!!
export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "store":
      return {
        ...store,
        [action.payload.key]: action.payload.data,
      };
    case "test":
      console.log("test ok", action.payload);
      return {
        ...store,
        ok: action.payload.ok,
      };
    default:
      throw Error("Unknown action.");
  }
}
