const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// Admin routes
router.get('/admin/vehicles/new', vehicleController.getNewVehicle);
router.post('/admin/vehicles', vehicleController.createVehicle);
router.get('/admin/vehicles/:id/edit', vehicleController.getEditVehicle);
router.put('/admin/vehicles/:id', vehicleController.updateVehicle);
router.delete('/admin/vehicles/:id', vehicleController.deleteVehicle);
router.get('/admin/vehicles', vehicleController.getAllVehicles);

// Public route
router.get('/vehicles', vehicleController.getAllVehiclesPublic);

module.exports = router;