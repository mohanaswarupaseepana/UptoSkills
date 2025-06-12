const express = require("express");
const router = express.Router();
const Event = require("../models/event"); // ✅ Correct import

// Get all events
router.get("/", async (req, res, next) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 }); // ✅ Renamed
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
});

// Get a single event by id
router.get("/:id", async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id); // ✅ Renamed
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
});

// Create a new event
router.post("/", async (req, res) => {
  try {
    console.log("📥 POST request body:", req.body);
    const newEvent = new Event(req.body); // ✅ Renamed
    const savedEvent = await newEvent.save(); // ✅ Renamed
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("❌ Error saving event:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Update an event by id
router.put("/:id", async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    next(error);
  }
});

// Delete an event by id
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
