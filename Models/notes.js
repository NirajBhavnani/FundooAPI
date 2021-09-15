const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      isArchived: {
        type: Boolean,
        default: false,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
      author: {
        type: String,
        required: true,
      }
});

module.exports = mongoose.model('Notes', notesSchema);