import express from'express';
import upload from '../middlewares/upload.js';
var router = express.Router();
import {
  getAllexamens,
  updateExamen,
  deleteExamen,
  getExamen,

} from '../controllers/examen.js';

router
  .route('/')
  .get(getAllexamens);




  router
  .route('/:idExamen')
  .get(getExamen)
  .put(updateExamen)
  .delete(deleteExamen);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});





export default router;