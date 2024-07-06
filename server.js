import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'; // Importer Mongoose
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import classRoutes from './routes/class.js'
import coursRoutes from './routes/cours.js'
import examenRoutes from './routes/examen.js'
import levelRoutes from './routes/level.js'
import noteRoutes from './routes/note.js'
import inscriptionRoutes from './routes/inscription.js'
import offreRoutes from './routes/offre.js'
import paymentRoutes  from'./routes/payment.js';
import Type_offreRoutes  from'./routes/Type_offre.js';
import publicationRoutes from "./routes/publication.js";
import commentRoutes from "./routes/comment.js";
import eventRoutes from "./routes/event.js";
import eventCategoryRoutes from "./routes/eventCategory.js";
import geocode from './routes/geocode.js';
import produitRoutes from './routes/Produit.js';
import commandeRoutes from './routes/commande.js';
import typeProduitRoutes from './routes/typeProduit.js';
import multer from 'multer';
import Examen from './models/examen.js';



const app = express();  // Initialize the express app
app.use(cors({
  origin: 'http://localhost:4200'}));
const port = process.env.PORT || 8080;
const databaseName = 'ThinkPro';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose
  .connect(`mongodb://127.0.0.1:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch((err) => {
    // Si quelque chose ne va pas, afficher l'erreur sur la console
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/img', express.static('public/images'));





app.use('/user', userRoutes);
app.use('/inscription', inscriptionRoutes);
app.use('/offre', offreRoutes);
app.use('/Type_offre', Type_offreRoutes);
app.use("/", publicationRoutes);
app.use("/", commentRoutes);
app.use("/event", eventRoutes);
app.use("/eventCategory", eventCategoryRoutes);
app.use("/", geocode);
app.use("/produit", produitRoutes);
app.use("/commande", commandeRoutes);
app.use("/typeProduit", typeProduitRoutes);
app.use("/payment", paymentRoutes);

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
