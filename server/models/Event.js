const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mediaURL: {
    type: String,
    required: false,
  },
  mediaType: {
    type: String,
    required: false,
  },
}, {
  timestamps: true, // This adds 'createdAt' and 'updatedAt' fields
});

eventSchema.set('toJSON', {
  virtuals: true,
  // This transform function is called for every document
  transform: (doc, ret) => {
    // It creates a new field 'id' with the value of the '_id' field
    ret.id = ret._id; 
    // Then it deletes the original '_id' and '__v' fields
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model("Event", eventSchema);