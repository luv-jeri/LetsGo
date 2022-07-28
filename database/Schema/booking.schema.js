const mongoose = require('mongoose');
const Tour = require('./tours.schema');
const { Schema, model } = mongoose;

const bookingSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },

    bookingDate: {
      type: Date,
    },

    tour: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
    },
    tourist: {
      type: Schema.Types.ObjectId,
      ref: 'Tourist',
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.pre('save', async function (next) {
  const tour = await Tour.findById(this.tour);
  this.bookingDate = tour.date;

  next();
});

const Bookings = model('Bookings', bookingSchema);

module.exports = Bookings;
