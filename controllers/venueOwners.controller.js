const VenueOwners = require('../class/venueOwners.class');
const db = require('../models');

const venueOwners = new VenueOwners(db);

module.exports = {
    async getAll(req, res) {
        try {
            const all = await venueOwners.getAll();
            res.json(all);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async getById(req, res) {
        try {
            const owner = await venueOwners.getById(req.params.id);
            if (!owner) return res.status(404).json({ error: 'Not found' });
            res.json(owner);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async create(req, res) {
        try {
            const ownerData = req.body;
            const owner = await venueOwners.create(ownerData);
            res.status(201).send(responseObject(201, true, "Venue owner created successfully", owner));
        } catch (error) {
            console.error(error);
            res.status(500).send(responseObject(500, false, "Internal server error", null));
        }
    },
    async update(req, res) {
        try {
            await venueOwners.update(req.params.id, req.body);
            res.json({ message: 'Updated' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async update(req, res) {
        try {
            const ownerId = req.params.id;
            const ownerData = req.body;
            const owner = await venueOwners.update(ownerId, ownerData);
            res.status(200).send(responseObject(200, true, "Venue owner updated successfully", owner));
        } catch (error) {
            console.error(error);
            res.status(500).send(responseObject(500, false, "Internal server error", null));
        }
    },
    async delete(req, res) {
        try {
            await venueOwners.delete(req.params.id);
            res.json({ message: 'Deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async delete(req, res) {
        try {
            const ownerId = req.params.id;
            const owner = await venueOwners.delete(ownerId);
            res.status(200).send(responseObject(200, true, "Venue owner deleted successfully", owner));
        } catch (error) {
            console.error(error);
            res.status(500).send(responseObject(500, false, "Internal server error", null));
        }
    }
};
