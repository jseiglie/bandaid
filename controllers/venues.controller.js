const Venues = require('../class/venues.class');
const db = require('../models');

const venues = new Venues(db);

module.exports = {
    async getAll(req, res) {
        try {
        const all = await venues.getAll();
        res.status(200).json(responseObject(200, true, "Venues fetched successfully", all));
            res.json(all);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async getById(req, res) {
        try {
            const venue = await venues.getById(req.params.id);
            if (!venue) return res.status(404).json({ error: 'Not found' });
            res.json(venue);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async create(req, res) {
        try {
            const venueData = req.body;
            const venue = await venues.create(venueData);
            res.status(201).json(responseObject(201, true, "Venue created successfully", venue));
            res.status(201).json(newVenue);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async update(req, res) {
        try {
            const venueId = req.params.id;
            const venueData = req.body;
            await venues.update(venueId, venueData);
            res.status(200).json(responseObject(200, true, "Venue updated successfully", { message: 'Updated' }));
            res.json({ message: 'Updated' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async delete(req, res) {
        try {
            const venueId = req.params.id;
            await venues.delete(venueId);
            res.status(200).json(responseObject(200, true, "Venue deleted successfully", { message: 'Deleted' }));
            res.json({ message: 'Deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
