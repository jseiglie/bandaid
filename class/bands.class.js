const BandMembers = require("./bandMembers.class");

require("dotenv").config();
BandsModel = require("../models").Bands;
UsersBands = require("../models").UserBands;
Rehearsals = require("../models").Rehearsals;
Rehearsal_locals = require("../models").Rehearsal_Locals;
module.exports = class Bands {
  constructor() {}

  static async getBands() {
    try {
      const response = await BandsModel.findAll();
      if (!response) {
        throw new Error("No bands found");
      }
      return response;
    } catch (error) {
      console.error("Error fetching bands:", error);
      throw error;
    }
  }
  static async getBandByBandName(band_name) {
    try {
      if (!band_name) {
        throw new Error("Band name is required");
      }
      const response = await BandsModel.findAll({
        where: { name: band_name },
      });
      if (!response) {
        throw new Error("No band found with this name");
      }
      return response;
    } catch (error) {
      console.error("Error fetching band by name:", error);
      throw error;
    }
  }
  static async getBandById(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await BandsModel.findOne({
        where: { id },
        include: [
          // {
          //   model: UsersBands,
          //   as: "users_bands",
          //   include: [
          //     {
          //       model: require("../models").Users,
          //       as: "user",
          //     },
          //   ],
          // },
          {
            model: Rehearsals,
            as: "Rehearsals",
            include: [
              {
                model: Rehearsal_locals,
                as: "local",
              },
            ],
          },
        ],
      });
      if (!response) {
        throw new Error("No band found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error fetching band by ID:", error);
      throw error;
    }
  }

  static async createBand(bandData) {
    try {
      if (!bandData || !bandData.name || !bandData.genre) {
        throw new Error("Band name and genre are required");
      }
      const response = await BandsModel.create(bandData);
      return response;
    } catch (error) {
      console.error("Error creating band:", error);
      throw error;
    }
  }

  static async updateBand(id, bandData) {
    try {
      if (!id || !bandData) {
        throw new Error("ID and band data are required");
      }
      const response = await BandsModel.update(bandData, {
        where: { id },
      });
      if (!response[0]) {
        throw new Error("No band found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error updating band:", error);
      throw error;
    }
  }

  static async deleteBand(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await BandsModel.destroy({
        where: { id },
      });
      if (!response) {
        throw new Error("No band found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error deleting band:", error);
      throw error;
    }
  }

  static async getBandByName(name) {
    try {
      if (!name) {
        throw new Error("Name is required");
      }
      const response = await BandsModel.findOne({
        where: { name },
      });
      if (!response) {
        throw new Error("No band found with this name");
      }
      return response;
    } catch (error) {
      console.error("Error fetching band by name:", error);
      throw error;
    }
  }
  static async getBandsByGenre(genre) {
    try {
      if (!genre) {
        throw new Error("Genre is required");
      }
      const response = await BandsModel.findAll({
        where: { genre },
      });
      if (!response) {
        throw new Error("No bands found with this genre");
      }
      return response;
    } catch (error) {
      console.error("Error fetching band by genre:", error);
      throw error;
    }
  }

  static async getBandsByCountry(country) {
    try {
      if (!country) {
        throw new Error("Country is required");
      }
      const response = await BandsModel.findAll({
        where: { country },
      });
      if (!response) {
        throw new Error("No bands found with this country");
      }
      return response;
    } catch (error) {
      console.error("Error fetching band by country:", error);
      throw error;
    }
  }


  

  static async getBandsByYear(year) {
    try {
      if (!year) {
        throw new Error("Year is required");
      }
      const response = await BandsModel.findAll({
        where: { year },
      });
      if (!response) {
        throw new Error("No bands found with this year");
      }
      return response;
    } catch (error) {
      console.error("Error fetching band by year:", error);
      throw error;
    }
  }

  static async getBandsByCity(city) {
    try {
      if (!city) {
        throw new Error("City is required");
      }
      const response = await BandsModel.findAll({
        where: { city },
      });
      if (!response) {
        throw new Error("No bands found with this city");
      }
      return response;
    } catch (error) {
      console.error("Error fetching band by city:", error);
      throw error;
    }
  }
  static getBandsByUserId = async (user_id) => {
    try {
      if (!user_id) {
        throw new Error("User ID is required");
      }
      const response = await BandMembers.getBandMemberById(user_id);
      console.log("Response from getBandsByUserId:", response);
      
      if (!response) {
        throw new Error("No bands found with this user ID");
      }
      return response;
    } catch (error) {
      console.error("Error fetching band by user ID:", error);
      throw error;
    }
  };
};
