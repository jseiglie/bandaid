const BandTags = require('../class/bandTags.class');
const db = require('../models');

const bandTags = new BandTags(db);

module.exports = {
    async getAll(req, res) {
        try {
        const tags = await bandTags.getAll(); // Fetch all tags
        res.status(200).send(responseObject(200, true, "Band tags fetched successfully", tags));
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async getById(req, res) {
        try {
            const tag = await bandTags.getById(req.params.id);
            if (!tag) return res.status(404).json({ error: 'Not found' });
            res.json(tag);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async create(req, res) {
        try {
        const tagData = req.body; // Get tag data from request
        const tag = await bandTags.create(tagData);
        res.status(201).send(responseObject(201, true, "Band tag created successfully", tag));
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async update(req, res) {
        try {
        const tagId = req.params.id; // Get tag ID from request parameters
        const tagData = req.body; // Get updated tag data
        const tag = await bandTags.update(tagId, tagData);
        res.status(200).send(responseObject(200, true, "Band tag updated successfully", tag));
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async delete(req, res) {
        try {
        const tagId = req.params.id; // Get tag ID from request parameters
        await bandTags.delete(tagId);
        res.status(200).send(responseObject(200, true, "Band tag deleted successfully", null));
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
