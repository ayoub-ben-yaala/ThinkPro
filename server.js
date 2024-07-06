import express from 'express';
import mongoose from 'mongoose'; // Importer Mongoose
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routes/user.js';
import classRoutes from './routes/class.js'
import coursRoutes from './routes/cours.js'
import examenRoutes from './routes/examen.js'
import levelRoutes from './routes/level.js'
import noteRoutes from './routes/note.js'
import Examen from './models/examen.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;
const databaseName = 'ThinkPro';
app.use(cors());
mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://127.0.0.1:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

app.use(express.json());

app.use('/user', userRoutes);
app.use('/class', classRoutes);
app.use('/cours', coursRoutes);
app.use('/examen', examenRoutes);
app.use('/level', levelRoutes);
app.use('/note', noteRoutes);
app.get('/class', (req, res) => {
  res.json({ message: 'CORS-enabled for all origins!' });
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files to the "uploads" directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
  }
});
const upload = multer({ storage: storage }).single('pdfPath');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.post('/examen', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: "File upload failed" });
    }

    const { idTeacher, examen } = req.body;
    const pdfPath = req.file.path; // Path to the uploaded file

    try {
      const newExamen = new Examen({
        idTeacher,
        examen,
        pdfPath: req.file.filename // Save only the filename
      });

      await newExamen.save();

      res.status(201).json({
        message: "Exam created successfully!",
        examen: newExamen
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while creating the exam" });
    }
  });
});
// Serve static files from the "uploads" directory
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});