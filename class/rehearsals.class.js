module.exports = class RehearsalLocals {
  constructor() {}

  static async getBandRehearsals(band_id) {
    try {
      const response = await RehearsalsModel.findAll({
        where: { band_id: band_id },
      });
      if (!response) {
        throw new Error("No rehearsals found");
      }
      return response;
    } catch (error) {
      console.error("Error fetching rehearsals:", error);
      throw error;
    }
  }

  static async getLocalRehearsals(local_id) {
    try {
      const response = await RehearsalsModel.findAll({
        where: { local_id: local_id }, // Assuming local_id is 1 for demonstration
      });
      if (!response) {
        throw new Error("No rehearsals found for this local ID");
      }
      return response;
    } catch (error) {
      console.error("Error fetching local rehearsals:", error);
      throw error;
    }
  }

  static async getRehearsalById(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await RehearsalsModel.findOne({
        where: { id },
        include: [
          {
            model: RehearsalLocalsModel,
            as: "local",
          },
        ],
      });
      if (!response) {
        throw new Error("No rehearsal found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error fetching rehearsal by ID:", error);
      throw error;
    }
  }
  static async createRehearsal(rehearsalData) {
    try {
      const response = await RehearsalsModel.create(rehearsalData);
      if (!response) {
        throw new Error("Failed to create rehearsal");
      }
      return response;
    } catch (error) {
      console.error("Error creating rehearsal:", error);
      throw error;
    }
  }

  static async getRehearsalsByBandAndLocal(band_id, local_id) {
    try {
        if (!band_id ||!local_id) {
        throw new Error("Band ID and local ID are required");
      }
      const response = await RehearsalsModel.findAll({
        where: { band_id: band_id, local_id: local_id },
      });
        if (!response) {
            throw new Error("No rehearsals found for this band and local ID");
        }
        return response;
    }
    catch (error) {
      console.error("Error fetching rehearsals by band and local:", error);
      throw error;
    }
    }

    static async newBandRehearsal(band_id, rehearsalData) {
    try {
        if (!band_id) {
        throw new Error("Band ID is required");
      }
        const response = await RehearsalsModel.create({
            ...rehearsalData,
            band_id: band_id,
        });
        if (!response) {
            throw new Error("Failed to create rehearsal");
        }
        return response;
    } catch (error) {
      console.error("Error creating new band rehearsal:", error);
      throw error;
    }
  }

  static async updateRehearsal(id, rehearsalData) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await RehearsalsModel.update(rehearsalData, {
        where: { id },
      });
      if (!response[0]) {
        throw new Error("No rehearsal found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error updating rehearsal:", error);
      throw error;
    }
  }
  static async deleteRehearsal(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await RehearsalsModel.destroy({
        where: { id },
      });
      if (!response) {
        throw new Error("No rehearsal found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error deleting rehearsal:", error);
      throw error;
    }
  }
};
