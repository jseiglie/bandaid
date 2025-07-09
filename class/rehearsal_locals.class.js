require('dot_env').config();
const RehearsalLocals = require("../models").Rehearsal_Locals;

module.exports = class RehearsalLocals {
  constructor() {}

  static async getRehearsalLocals() {
    try {
      const response = await RehearsalLocals.findAll();
      if (!response) {
        throw new Error("No rehearsal locals found");
      }
      return response;
    } catch (error) {
      console.error("Error fetching rehearsal locals:", error);
      throw error;
    }
  }

  static async getRehearsalLocalById(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await RehearsalLocals.findOne({
        where: { id },
      });
      if (!response) {
        throw new Error("No rehearsal local found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error fetching rehearsal local by ID:", error);
      throw error;
    }
  }

  static async createRehearsalLocal(rehearsalLocalData) {
    try {
      const response = await RehearsalLocals.create(rehearsalLocalData);
      if (!response) {
        throw new Error("Failed to create rehearsal local");
      }
      return response;
    } catch (error) {
      console.error("Error creating rehearsal local:", error);
      throw error;
    }
  }

    static async updateRehearsalLocal(id, rehearsalLocalData) {
        try {
        if (!id) {
            throw new Error("ID is required");
        }
        const response = await RehearsalLocals.update(rehearsalLocalData, {
            where: { id },
        });
        if (!response[0]) {
            throw new Error("Failed to update rehearsal local");
        }
        return response;
        } catch (error) {
        console.error("Error updating rehearsal local:", error);
        throw error;
        }
    }
    static async deleteRehearsalLocal(id) {
        try {
        if (!id) {
            throw new Error("ID is required");
        }
        const response = await RehearsalLocals.destroy({
            where: { id },
        });
        if (!response) {
            throw new Error("No rehearsal local found with this ID");
        }
        return response;
        } catch (error) {
        console.error("Error deleting rehearsal local:", error);
        throw error;
        }
    }
    
}