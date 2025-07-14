const merchModel = require('../models/Merchandise');

module.exports = class Merchandise {
    static async getAllMerchandise() {
        try {
            const merchandise = await merchModel.findAll();
            return merchandise;
        } catch (error) {
            console.error('Error fetching merchandise:', error);
            throw error;
        }
    }
    static async getMerchandiseById(id) {
        try {
            const merchandise = await merchModel.findByPk(id);
            if (!merchandise) {
                throw new Error('Merchandise not found');
            }
            return merchandise;
        } catch (error) {
            console.error('Error fetching merchandise by ID:', error);
            throw error;
        }
    }
    static async createMerchandise(data) {
        try {
            const newMerchandise = await merchModel.create(data);
            return newMerchandise;
        } catch (error) {
            console.error('Error creating merchandise:', error);
            throw error;
        }
    }
    static async updateMerchandise(id, data) {
        try {
            const merchandise = await merchModel.findByPk(id);
            if (!merchandise) {
                throw new Error('Merchandise not found');
            }
            await merchandise.update(data);
            return merchandise;
        } catch (error) {
            console.error('Error updating merchandise:', error);
            throw error;
        }
    }
    static async deleteMerchandise(id) {
        try {
            const merchandise = await merchModel.findByPk(id);
            if (!merchandise) {
                throw new Error('Merchandise not found');
            }
            await merchandise.destroy();
            return { message: 'Merchandise deleted successfully' };
        } catch (error) {
            console.error('Error deleting merchandise:', error);
            throw error;
        }
    }
    static async searchMerchandise(searchTerm) {
        try {
            const merchandise = await merchModel.findAll({
                where: {
                    name: {
                        [Op.like]: `%${searchTerm}%`
                    }
                }
            });
            return merchandise;
        } catch (error) {
            console.error('Error searching merchandise:', error);
            throw error;
        }
    }
    static async getMerchandiseByCategory(categoryId) {
        try {
            const merchandise = await merchModel.findAll({
                where: { categoryId }
            });
            return merchandise;
        } catch (error) {
            console.error('Error fetching merchandise by category:', error);
            throw error;
        }
    }   
    static async getMerchandiseByBand(bandId) {
        try {
            const merchandise = await merchModel.findAll({
                where: { bandId }
            });
            return merchandise;
        } catch (error) {
            console.error('Error fetching merchandise by band:', error);
            throw error;
        }
    }
    static async getMerchandiseByPriceRange(minPrice, maxPrice) {
        try {
            const merchandise = await merchModel.findAll({
                where: {
                    price: {
                        [Op.between]: [minPrice, maxPrice]
                    }
                }
            });
            return merchandise;
        } catch (error) {
            console.error('Error fetching merchandise by price range:', error);
            throw error;
        }
    }
    static async getMerchandiseByAvailability() {
        try {
            const merchandise = await merchModel.findAll({
                where: { isAvailable: true }
            });
            return merchandise;
        } catch (error) {
            console.error('Error fetching merchandise by availability:', error);
            throw error;
        }
    }
};

