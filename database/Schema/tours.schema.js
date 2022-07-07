const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a max group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: ['easy', 'medium', 'difficult'],
    },
    ratingsAverage: {
      type: Number,
      default: 0,
      min: [0, 'A rating must be at least 1'],
      max: [5, 'A rating must be at most 5'],
    },
    ratingNumber: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    photo: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Tour = model('Tour', tourSchema);

module.exports = Tour;
