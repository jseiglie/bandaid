require("dotenv").config();
BandMembersModel = require("../models").BandMembers;

module.exports = class BandMembers {
  constructor() {}


  static async getBandMembers() {
    try {
      const response = await BandMembersModel.findAll();
      if (!response) {
        throw new Error("No band members found");
      }
      return response;
    } catch (error) {
      console.error("Error fetching band members:", error);
      throw error;
    }
  }

  static async getBandMemberById(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await BandMembersModel.findOne({
        where: { id },
        include: [
          {
            model: require("../models").Bands,
            as: "Band",
          },
        ],
      });
      if (!response) {
        throw new Error("No band member found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error fetching band member by ID:", error);
      throw error;
    }
  }

static async getAllUserBands(musician_id) {
    try {
      if (!musician_id) {
        throw new Error("Musician ID is required");
      }
      
      const response = await BandMembersModel.findAll({
        where: { musician_id },
        include: [
          {
            model: require("../models").Bands,
            as: "Band",
          },
        ],
      });
      if (!response) {
        throw new Error("No bands found for this musician");
      }      
      return response;
    } catch (error) {
      console.error("Error fetching user's bands:", error);
      throw error;
    }
  }

  static async getBandMembersByBandId(bandId) {
    try {
      if (!bandId) {
        throw new Error("Band ID is required");
      }
      const response = await BandMembersModel.findAll({
        where: { band_id: bandId },
      });
      if (!response) {
        throw new Error("No band members found for this band ID");
      }
      return response;
    } catch (error) {
      console.error("Error fetching band members by band ID:", error);
      throw error;
    }
  }

  static async createBandMember(bandMemberData) {
    try {
      if (!bandMemberData || !bandMemberData.band_id || !bandMemberData.musician_id) {
        throw new Error("Band ID and Musician ID are required");
      }
      const response = await BandMembersModel.create(bandMemberData);
      return response;
    } catch (error) {
      console.error("Error creating band member:", error);
      throw error;
    }
  }

  static async updateBandMember(id, bandMemberData) {
    try {
      if (!id || !bandMemberData) {
        throw new Error("ID and band member data are required");
      }
      const response = await BandMembersModel.update(bandMemberData, {
        where: { id },
      });
      if (!response[0]) {
        throw new Error("No band member found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error updating band member:", error);
      throw error;
    }
  }

  static async deleteBandMember(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await BandMembersModel.destroy({
        where: { id },
      });
      if (!response) {
        throw new Error("No band member found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error deleting band member:", error);
      throw error;
    }
  }
};