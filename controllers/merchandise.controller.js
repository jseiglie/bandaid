const MerchClass = require("../class/merchandise.class.js");
const responseObject = require("../utils/response.js");
const merchandiseController = {};

merchandiseController.getAllMerchandise = async (req, res) => {
  try {
    const merchandise = await MerchClass.getAllMerchandise();
    return res
      .status(200)
      .send(
        responseObject(
          200,
          true,
          "Merchandise fetched successfully",
          merchandise
        )
      );
  } catch (error) {
    console.error("Error fetching merchandise:", error);
    return res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

merchandiseController.getMerchandiseById = async (req, res) => {
  const { id } = req.params;
  try {
    const merchandise = await MerchClass.getMerchandiseById(id);
    return res
      .status(200)
      .send(
        responseObject(
          200,
          true,
          "Merchandise fetched successfully",
          merchandise
        )
      );
  } catch (error) {
    console.error("Error fetching merchandise by ID:", error);
    return res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};
merchandiseController.createMerchandise = async (req, res) => {
  const data = req.body;
  try {
    const newMerchandise = await MerchClass.createMerchandise(data);
    return res
      .status(201)
      .send(
        responseObject(
          201,
          true,
          "Merchandise created successfully",
          newMerchandise
        )
      );
  } catch (error) {
    console.error("Error creating merchandise:", error);
    return res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

merchandiseController.updateMerchandise = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedMerchandise = await MerchClass.updateMerchandise(id, data);
    return res
      .status(200)
      .send(
        responseObject(
          200,
          true,
          "Merchandise updated successfully",
          updatedMerchandise
        )
      );
  } catch (error) {
    console.error("Error updating merchandise:", error);
    return res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};
merchandiseController.deleteMerchandise = async (req, res) => {
  const { id } = req.params;
  try {
    await MerchClass.deleteMerchandise(id);
    return res
      .status(204)
      .send(
        responseObject(204, true, "Merchandise deleted successfully", null)
      );
  } catch (error) {
    console.error("Error deleting merchandise:", error);
    return res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};
merchandiseController.searchMerchandise = async (req, res) => {
  const { searchTerm } = req.query;
  try {
    const merchandise = await MerchClass.searchMerchandise(searchTerm);
    return res
      .status(200)
      .send(
        responseObject(200, true, "Merchandise search results", merchandise)
      );
  } catch (error) {
    console.error("Error searching merchandise:", error);
    return res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

merchandiseController.getMerchandiseByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const merchandise = await MerchClass.getMerchandiseByCategory(categoryId);
    return res
      .status(200)
      .send(
        responseObject(
          200,
          true,
          "Merchandise by category fetched successfully",
          merchandise
        )
      );
  } catch (error) {
    console.error("Error fetching merchandise by category:", error);
    return res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

merchandiseController.getMerchandiseByBand = async (req, res) => {
  const { bandId } = req.params;
  try {
    const merchandise = await MerchClass.getMerchandiseByBand(bandId);
    return res
      .status(200)
      .send(
        responseObject(
          200,
          true,
          "Merchandise by band fetched successfully",
          merchandise
        )
      );
  } catch (error) {
    console.error("Error fetching merchandise by band:", error);
    return res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

merchandiseController.getMerchandiseByPriceRange = async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  try {
    const merchandise = await MerchClass.getMerchandiseByPriceRange(
      minPrice,
      maxPrice
    );
    return res
      .status(200)
      .send(
        responseObject(
          200,
          true,
          "Merchandise by price range fetched successfully",
          merchandise
        )
      );
  } catch (error) {
    console.error("Error fetching merchandise by price range:", error);
    return res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

merchandiseController.getMerchandiseByAvailability = async (req, res) => {
  try {
    const merchandise = await MerchClass.getMerchandiseByAvailability();
    return res
      .status(200)
      .send(
        responseObject(
          200,
          true,
          "Merchandise by availability fetched successfully",
          merchandise
        )
      );
  } catch (error) {
    console.error("Error fetching merchandise by availability:", error);
    return res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

module.exports = merchandiseController;
