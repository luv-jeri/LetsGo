const express = require('express');
const controller = require('../controller/tours.controller');

const tourRoute = express.Router();

tourRoute.route('/').post(controller.addTour).get(controller.getAllTours);

tourRoute.route('/:id').get(controller.getTourById);

module.exports = tourRoute;