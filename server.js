
import express from 'express';
import mongoose from 'mongoose'; 
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';

import produitRoutes from './routes/Produit.js';
import typeRoutes from './routes/typeProduit.js';
import commandeRoutes from './routes/commande.js';
import publicationRoutes from "./routes/publication.routes.js";
import commentRoutes from "./routes/comment.route.js";
import User from "./models/user.js";
import Publication from "./models/publication.js";
import comment from "./models/comment.js";

dotenv.config();
app.use(express.json());


app.use('/user', userRoutes);
app.use('/produit', produitRoutes);
app.use('/type', typeRoutes);
app.use('/commande', commandeRoutes);
app.use("/", publicationRoutes);
app.use("/", commentRoutes);

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
const app = express();
const port = process.env.PORT || 8080;
const databaseName = "ThinkPro";
mongoose
  .connect(`mongodb://127.0.0.1:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });


app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});


console.log('Starting server...');
console.log('Connecting to MongoDB...');



app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});




