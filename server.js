import express from 'express';
import mongoose from 'mongoose'; // Importer Mongoose
import nodemailer from 'nodemailer';
import userRoutes from './routes/user.js';
import inscriptionRoutes from './routes/inscription.js'
import offreRoutes from './routes/offre.js'
import paymentRoutes  from'./routes/payment.js';
import Type_offreRoutes  from'./routes/Type_offre.js';
import cors from 'cors';


const app = express();
app.use(cors({
  origin: 'http://localhost:4200'}));
const port = process.env.PORT || 8080;
const databaseName = 'ThinkPro';

// Cela afichera les requêtes MongoDB dans le terminal
mongoose.set('debug', true);
// Utilisation des promesses ES6 pour Mongoose, donc aucune callback n'est nécessaire
mongoose.Promise = global.Promise;

// Se connecter à MongoDB
mongoose
  .connect(`mongodb://127.0.0.1:27017/${databaseName}`)
  .then(() => {
    // Une fois connecté, afficher un message de réussite sur la console
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    // Si quelque chose ne va pas, afficher l'erreur sur la console
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/img', express.static('public/images'));

app.use('/user', userRoutes);
app.use('/inscription', inscriptionRoutes);
app.use('/offre', offreRoutes);
app.use('/payment', paymentRoutes);
app.use('/Type_offre', Type_offreRoutes);



app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});