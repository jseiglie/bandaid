export const extractUsernameSocialMedia = (socialMedia) => {
    const aux = socialMedia.split("/");
    const socialMediaArrayMapped = {
        name: aux.find(el=> el.includes("facebook") || el.includes("instagram") || el.includes("twitter") || el.includes("tiktok") || el.includes("youtube")).split('.')[0],
        url: socialMedia,
        username: aux[aux.length - 1],
    };
    console.log(socialMediaArrayMapped);
    
  return socialMediaArrayMapped;
}