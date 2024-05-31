import express from 'express';
import mongoose from 'mongoose'; // Importer Mongoose

import userRoutes from './routes/user.js';
import produitRoutes from './routes/Produit.js';
import typeRoutes from './routes/typeProduit.js';
import commandeRoutes from './routes/commande.js';

const app = express();
const port = process.env.PORT || 8080;
const databaseName = 'ThinkPro';

// Cela affichera les requêtes MongoDB dans le terminal
mongoose.set('debug', true);
// Utilisation des promesses ES6 pour Mongoose, donc aucune callback n'est nécessaire
mongoose.Promise = global.Promise;

console.log('Starting server...');
console.log('Connecting to MongoDB...');

// Se connecter à MongoDB
mongoose
  .connect(`mongodb://127.0.0.1:27017/${databaseName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Une fois connecté, afficher un message de réussite sur la console
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    // Si quelque chose ne va pas, afficher l'erreur sur la console
    console.log('Connection error:', err);
  });

app.use(express.json());

app.use('/user', userRoutes);
app.use('/produit', produitRoutes);
app.use('/type', typeRoutes);
app.use('/commande', commandeRoutes);

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
