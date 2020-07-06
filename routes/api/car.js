const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const multer = require('multer');
const Car = require('../../models/Car');
const mongoose = require('mongoose');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post('/', [auth, upload.array('images')], async (req, res) => {
  try {
    let images = [];

    const url = req.protocol + '://' + req.get('host');

    req.files.map((image) => {
      images.push(url + '/uploads/' + image.filename);
    });

    const {
      model,
      price,
      year,
      pass,
      kpp,
      engine,
      fuel,
      color,
      state,
      status,
      location,
      desc,
    } = req.body;

    const car = new Car({
      model,
      price,
      year,
      pass,
      kpp,
      engine,
      fuel,
      color,
      state,
      status,
      location,
      images: images,
      desc,
    });

    await car.save();

    res.json(car);
  } catch (error) {
    console.log(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const cars = await Car.find().sort('-date');
    res.json(cars);
  } catch (error) {}
});

router.put('/:id', [auth], async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(req.body);
  } catch (error) {}
});
router.delete('/:id', [auth], async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    res.json(car);
  } catch (error) {}
});

router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.json(car);
  } catch (error) {}
});

module.exports = router;
