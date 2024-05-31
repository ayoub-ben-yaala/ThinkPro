import express from 'express';
import mongoose from 'mongoose'; // Importer Mongoose
import dotenv from 'dotenv';

import userRoutes from './routes/user.js';
import classRoutes from './routes/class.js'
import coursRoutes from './routes/cours.js'
import examenRoutes from './routes/examen.js'
import levelRoutes from './routes/level.js'
import noteRoutes from './routes/note.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const databaseName = 'ThinkPro';

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

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});