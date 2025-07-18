const VenueScores = require('../class/venueScores.class');
const db = require('../models');

const venueScores = new VenueScores(db);

module.exports = {
    async getAll(req, res) {
        try {
            const all = await venueScores.getAll();
            res.json(all);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async getById(req, res) {
        try {
            const score = await venueScores.getById(req.params.id);
            if (!score) return res.status(404).json({ error: 'Not found' });
            res.json(score);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async create(req, res) {
        try {
            const scoreData = req.body;
            const score = await venueScores.create(scoreData);
            res.status(201).send(responseObject(201, true, "Venue score created successfully", score));
        } catch (error) {
            console.error(error);
            res.status(500).send(responseObject(500, false, "Internal server error", null));
        }
    },
    async update(req, res) {
        try {
            const scoreId = req.params.id;
            const scoreData = req.body;
            const score = await venueScores.update(scoreId, scoreData);
            res.status(200).send(responseObject(200, true, "Venue score updated successfully", score));
        } catch (error) {
            console.error(error);
            res.status(500).send(responseObject(500, false, "Internal server error", null));
        }
    },
    async delete(req, res) {
        try {
            const scoreId = req.params.id;
            await venueScores.delete(scoreId);
            res.status(200).send(responseObject(200, true, "Venue score deleted successfully", null));
        } catch (error) {
            console.error(error);
            res.status(500).send(responseObject(500, false, "Internal server error", null));
        }
    }
};
