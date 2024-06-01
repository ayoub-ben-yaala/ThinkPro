import express from 'express';
import mongoose from 'mongoose';

import userRoutes from "./routes/user.js";
import publicationRoutes from "./routes/publication.routes.js";
import commentRoutes from "./routes/comment.route.js";
//importing models
import User from "./models/user.js";
import Publication from "./models/publication.js";
import comment from "./models/comment.js";
import mongoose from 'mongoose'; 
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const databaseName = "ThinkPro";

// Cela afichera les requêtes MongoDB dans le terminal
mongoose.set("debug", true);
// Utilisation des promesses ES6 pour Mongoose, donc aucune callback n'est nécessaire
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

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});


app.use("/user", userRoutes);
app.use("/", publicationRoutes);
app.use("/", commentRoutes);