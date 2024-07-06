import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'; // Importer Mongoose
import nodemailer from 'nodemailer';
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



const app = express();  // Initialize the express app
app.use(cors({
  origin: 'http://localhost:4200'}));
const port = process.env.PORT || 8080;
const databaseName = 'ThinkPro';

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

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});