const express = require('express');
const router = express.Router();
const Record = require('../models/record');

// Get all records
router.get('/', async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single record by ID
router.get('/:id', getRecord, (req, res) => {
  res.json(res.record);
});

// Create a new record
router.post('/', async (req, res) => {
  const record = new Record({
    name: req.body.name,
    date: req.body.date,
    image: req.body.image,
    time: req.body.time
  });

  try {
    const newRecord = await record.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a record
router.put('/:id', getRecord, async (req, res) => {
  if (req.body.name != null) {
    res.record.name = req.body.name;
  }
  if (req.body.date != null) {
    res.record.date = req.body.date;
  }
  if (req.body.image != null) {
    res.record.image = req.body.image;
  }
  if (req.body.time != null) {
    res.record.time = req.body.time;
  }

  try {
    const updatedRecord = await res.record.save();
    res.json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a record
router.delete('/:id', getRecord, async (req, res) => {
  try {
    await res.record.remove();
    res.json({ message: 'Record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get a record by ID
async function getRecord(req, res, next) {
  let record;
  try {
    record = await Record.findById(req.params.id);
    if (record == null) {
      return res.status(404).json({ message: 'Record not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.record = record;
  next();
}

module.exports = router;
