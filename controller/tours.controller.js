const Tours = require('../database/Schema/tours.schema');

const addTour = async (req, res) => {
  const { name, duration, maxGroupSize, difficulty } = req.body;
  try {
    const newTour = await Tours.create({
      name,
      duration,
      maxGroupSize,
      difficulty,
    });
    res.status(200).json({
      status: 'success',
      message: 'Tour added successfully',
      data: newTour,
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e._message,
    });
  }
};

const getAllTours = async (req, res) => {
  try {
    const allTours = await Tours.find();
    res.status(200).json({
      status: 'success',
      message: `${allTours.length} tours found`,
      data: allTours,
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e._message,
    });
  }
};

const getTourById = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await Tours.findById(id);
    res.status(200).json({
      status: 'success',
      message: 'Tour found',
      data: tour,
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e._message,
    });
  }
};

module.exports = {
  addTour,
  getAllTours,
  getTourById,
};
