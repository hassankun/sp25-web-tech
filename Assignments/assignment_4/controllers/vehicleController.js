const Vehicle = require('../models/Vehicle');
const multer = require('multer');
const path = require('path');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Middleware to check admin authentication
const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    req.flash('error', 'Access denied. Admins only.');
    res.redirect('/login');
  }
};

exports.getNewVehicle = [isAdmin, (req, res) => {
  res.render('vehicles/new');
}];

exports.createVehicle = [isAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, brand, price, type } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';
    const vehicle = new Vehicle({ name, brand, price, type, image });
    await vehicle.save();
    req.flash('success', 'Vehicle added successfully!');
    res.redirect('/admin/vehicles');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/admin/vehicles/new');
  }
}];

exports.getEditVehicle = [isAdmin, async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    res.render('vehicles/edit', { vehicle });
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/admin/vehicles');
  }
}];

exports.updateVehicle = [isAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, brand, price, type } = req.body;
    const updateData = { name, brand, price, type };
    if (req.file) updateData.image = `/uploads/${req.file.filename}`;
    await Vehicle.findByIdAndUpdate(req.params.id, updateData);
    req.flash('success', 'Vehicle updated successfully!');
    res.redirect('/admin/vehicles');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect(`/admin/vehicles/${req.params.id}/edit`);
  }
}];

exports.deleteVehicle = [isAdmin, async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    req.flash('success', 'Vehicle deleted successfully!');
    res.redirect('/admin/vehicles');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/admin/vehicles');
  }
}];

exports.getAllVehicles = [isAdmin, async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.render('vehicles/index', { vehicles });
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/');
  }
}];

exports.getAllVehiclesPublic = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.render('vehicles/index-public', { vehicles });
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/');
  }
};