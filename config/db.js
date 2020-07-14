const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const Grid = require('gridfs-stream');

let gfs;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    const conn = mongoose.createConnection(db);

    // Init gfs
    let gfs;

    conn.once('open', () => {
      // Init stream
      gfs = Grid(conn.db, mongoose.mongo);
      gfs.collection('uploads');
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
