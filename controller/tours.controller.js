const Tours = require('../database/Schema/tours.schema');

const addTour = async (req, res) => {
  const { name, duration, maxGroupSize, difficulty, price } = req.body;
  try {
    const newTour = await Tours.create({
      name,
      duration,
      maxGroupSize,
      difficulty,
      price,
    });
    res.status(200).json({
      status: 'success',
      message: 'Tour added successfully',
      data: newTour,
    });
  } catch (e) {
    __(e);
    res.status(400).json({
      status: 'fail',
      message: e._message,
    });
  }
};

const getTours = async (req, res) => {
  let { query } = req; // query is an object

  query = JSON.stringify(query); // convert query to string

  query = query.replace(/\b(gt|gte|lt|lte)\b/g, (match) => {
    return `$${match}`;
  }); // find all the gt|gte|lt|lte and replace them with $gt|$gte|$lt|$lte

  query = JSON.parse(query); // convert query string to object

  try {
    const allTours = await Tours.find(query).select({
      __v: 0,
    });

    res.status(200).json({
      status: 'success',
      message: `${allTours.length} tours found`,
      data: allTours,
    });
  } catch (e) {
    // __(e);
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

const updateTour = async (req, res) => {
  const { id } = req.params;

  const updateTour = await Tours.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: 'success',
    message: 'Tour updated successfully',
    data: updateTour,
  });
};

module.exports = {
  addTour,
  getTours,
  getTourById,
  updateTour,
};
