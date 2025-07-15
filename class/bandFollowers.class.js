const BandFollowersModel = require('../models/').BandFollowers;

module.exports = class BandFollowers {
    static async getFollowersByBandId(band_id) {
        try {
            if (!band_id) {
                throw new Error('Band ID is required');
            }
            const followers = await BandFollowersModel.findAll({
                where: { band_id },
            });
            return followers;
        } catch (error) {
            console.error('Error fetching followers:', error);
            throw error;
        }
    }
    static async addFollower(band_id, follower_id) {
        try {
            if (!band_id || !follower_id) {
                throw new Error('Band ID and Follower ID are required');
            }
            const newFollower = await BandFollowersModel.create({
                band_id,
                follower_id,
            });
            return newFollower;
        } catch (error) {
            console.error('Error adding follower:', error);
            throw error;
        }
    };
    static async removeFollower(id) {
        try {
            if (!id) {
                throw new Error('Follower ID is required');
            }
            const result = await BandFollowersModel.destroy({
                where: { id },
            });
            return result > 0; 
        } catch (error) {
            console.error('Error removing follower:', error);
            throw error;
        }
    };
    static async getBandsFollowersCount(band_id) {
        try {
            if (!band_id) {
                throw new Error('Band ID is required');
            }
            const count = await BandFollowersModel.count({
                where: { band_id },
            });
            return count;
        } catch (error) {
            console.error('Error counting followers:', error);
            throw error;
        }
    }
    static async getBandsUserFollows(band_id, user_id) {
        try {
            if (!band_id || !user_id) {
                throw new Error('Band ID and User ID are required');
            }
            const follow = await BandFollowersModel.findAll({
                where: { band_id, follower_id: user_id },
            });
            return follow;
        } catch (error) {
            console.error('Error checking user follow:', error);
            throw error;
        }
    }
};
