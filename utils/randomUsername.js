
  
  const bandWords = [
    "roadie", "gig", "encore", "backstage", "tour", "soundcheck", "setlist",
    "session", "rhythm", "mosh", "anthem", "crew", "jamhouse", "studio", "fanfare"
  ];
  
  const adjectives = [
    "loud", "funky", "electric", "wild", "smooth", "heavy", "acoustic",
    "dynamic", "blazing", "mellow", "roaring", "vibrant", "sonic", "catchy", "thunderous"
  ];

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

const randomUsername = (email) => {

        const emailName = email.split('@')[0];
        const word = getRandomElement(bandWords);
        const adjective = getRandomElement(adjectives);
        
        // You can choose how to combine — here I'll use adjective + word + email name
        const username = `${adjective}${word}_${emailName}`;
        
        return username.toLowerCase();
      }
      
     


module.exports = randomUsername