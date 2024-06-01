import express from 'express';
import mongoose from 'mongoose'; // Importer Mongoose
import nodemailer from 'nodemailer';
import userRoutes from './routes/user.js';
import inscriptionRoutes from './routes/inscription.js'
import offreRoutes from './routes/offre.js'
import paymentRoutes  from'./routes/payment.js';
import Type_offreRoutes  from'./routes/Type_offre.js';
import publicationRoutes from "./routes/publication.routes.js";
import commentRoutes from "./routes/comment.route.js";
import eventRoutes from "./routes/event.js";
import eventCategoryRoutes from "./routes/eventCategory.js";
import geocode from './routes/geocode.js';
import produitRoutes from './routes/Produit.js';
import commandeRoutes from './routes/commande.js';
import typeProduitRoutes from './routes/typeProduit.js';


const app = express();  // Initialize the express app
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


app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});