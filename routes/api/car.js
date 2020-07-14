const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const multer = require('multer');
const Car = require('../../models/Car');
const GridFsStorage = require('multer-gridfs-storage');
const config = require('config');
const crypto = require('crypto');
const path = require('path');
const Grid = require('gridfs-stream');
const db = config.get('mongoURI');
const mongoose = require('mongoose');

const conn = mongoose.createConnection(db);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const storage = new GridFsStorage({
  url: config.get('mongoURI'),
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

router.post('/', [auth, upload.array('imagesFiles')], async (req, res) => {
  try {
    let images = [];
    for (let index = 0; index < req.files.length; index++) {
      images.push(req.files[index].filename);
    }

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

router.patch('/:id', [auth, upload.array('imagesFiles')], async (req, res) => {
  try {
    let images = req.body.images.slice();
    console.log(images);
    for (let index = 0; index < req.files.length; index++) {
      images.push(req.files[index].filename);
    }
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { ...req.body, images: images },
      { new: true },
    );
    console.log(req.body.model);
    res.json(car);
  } catch (error) {
    console.log(error);
  }
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

router.post('/test', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    return res.json(files);
  });
});

router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  });
});

router.delete('/image/:filename', (req, res) => {
  gfs.remove({ filename: req.params.filename, root: 'uploads' }, (err, gridStore) => {
    res.send('Success');
  });
});

module.exports = router;
