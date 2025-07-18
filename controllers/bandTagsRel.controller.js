const BandTagsRel = require('../class/bandTagsRel.class');
const db = require('../models');

const bandTagsRel = new BandTagsRel(db);

const responseObject = require("../utils/response.js");
const bandTagsRelController = {};

bandTagsRelController.getAll = async (req, res) => {
  try {
    const rels = await bandTagsRel.getAll();
    res.status(200).send(responseObject(200, true, "Band tags relations fetched successfully", rels));
  } catch (error) {
    console.error(error);
    res.status(500).send(responseObject(500, false, "Internal server error", null));
  }
};

bandTagsRelController.create = async (req, res) => {
  try {
    const relData = req.body;
    const rel = await bandTagsRel.create(relData);
    res.status(201).send(responseObject(201, true, "Band tags relation created successfully", rel));
  } catch (error) {
    console.error(error);
    res.status(500).send(responseObject(500, false, "Internal server error", null));
  }
};

bandTagsRelController.update = async (req, res) => {
  try {
    await bandTagsRel.update(req.params.id, req.body);
    res.status(200).send(responseObject(200, true, "Band tags relation updated successfully", null));
  } catch (error) {
    console.error(error);
    res.status(500).send(responseObject(500, false, "Internal server error", null));
  }
};

bandTagsRelController.delete = async (req, res) => {
  try {
    await bandTagsRel.delete(req.params.id);
    res.status(200).send(responseObject(200, true, "Band tags relation deleted successfully", null));
  } catch (error) {
    console.error(error);
    res.status(500).send(responseObject(500, false, "Internal server error", null));
  }
};

module.exports = bandTagsRelController;

module.exports = {
    async getAll(req, res) {
        try {
            const rels = await bandTagsRel.getAll();
            res.json(rels);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async getById(req, res) {
        try {
            const rel = await bandTagsRel.getById(req.params.id);
            if (!rel) return res.status(404).json({ error: 'Not found' });
            res.json(rel);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async create(req, res) {
        try {
            const newRel = await bandTagsRel.create(req.body);
            res.status(201).json(newRel);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async update(req, res) {
        try {
            await bandTagsRel.update(req.params.id, req.body);
            res.json({ message: 'Updated' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async delete(req, res) {
        try {
            await bandTagsRel.delete(req.params.id);
            res.json({ message: 'Deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
