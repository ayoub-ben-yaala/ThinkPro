import express from 'express';
import mongoose from 'mongoose'; 
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import eventRoutes from './routes/event.js';
import eventCategory from './routes/eventCategory.js';
import mapRoutes  from'./routes/geocode.js';
import paymentRoutes  from'./routes/payment.js';
import publicationRoutes from "./routes/publication.routes.js";
import commentRoutes from "./routes/comment.route.js";

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
app.use('/event', eventRoutes);
app.use('/eventCategory', eventCategory);
app.use('/payment', paymentRoutes);
app.use('/map', mapRoutes);
app.use("/", publicationRoutes);
app.use("/", commentRoutes);



app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
