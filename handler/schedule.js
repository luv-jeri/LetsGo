const Tour = require('../database/Schema/tours.schema');
const Booking = require('../database/Schema/booking.schema');
const sendMail = require('../utils/send_mail');

const reminder = async () => {
  const today = new Date();

  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  const bookings = await Booking.find({
    bookingDate: tomorrow,
  }).populate('tourist');

  bookings.forEach(async (booking) => {
    sendMail({
      to: booking.tourist.email,
      subject: `Hey ${booking.tourist.name}, we are waiting for you!`,
      text: 'We are waiting for you to come back to our tour. Please come back to our tour at the earliest possible time. Thank you for your patience.',
    });
  });
};

const sweeper = async () => {
  const tours = await Tour.find({
    date: {
      $lt: new Date(),
    },
  });

  tours.forEach(async (tour) => {
    await Tour.findByIdAndDelete(tour._id);
  });
};

module.exports = {
  reminder,
  sweeper,
};
