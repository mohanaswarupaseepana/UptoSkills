const express = require("express");
const router = express.Router();
const Event = require("../models/event"); // ✅ Correct import
const multer = require("multer"); // ⭐️ Import multer

// ⭐️ Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

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
// ⭐️ Apply multer middleware here. 'media' must match the key in your FormData.
router.post("/", upload.single('media'), async (req, res) => {
  try {
    // ⭐️ Multer adds text fields to req.body and the file to req.file
    console.log("📥 POST request body:", req.body);
    console.log("📄 POST request file:", req.file);

    const { title, description } = req.body;
    
    // You'll need to handle the file upload to a service like Cloudinary or S3
    // and get a URL. For now, let's assume a placeholder.
    // In a real app, you would upload req.file.buffer to your cloud storage.
    
    const newEventData = {
        title,
        description,
        // mediaURL: 'placeholder_url_from_your_storage_service', // Replace with actual URL
        // mediaType: req.file ? req.file.mimetype.split('/')[0] : undefined
    };
    
    const newEvent = new Event(newEventData); // ✅ Renamed
    const savedEvent = await newEvent.save(); // ✅ Renamed
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("❌ Error saving event:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Update an event by id
// ⭐️ Also apply multer middleware to the PUT route
router.put("/:id", upload.single('media'), async (req, res, next) => {
  try {
    const { title, description } = req.body;
    
    // Again, handle the file if it exists (req.file)
    // and update the mediaURL and mediaType accordingly.
    
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description /*, updated media fields */ },
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