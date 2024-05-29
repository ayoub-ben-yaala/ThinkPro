import express from'express';
var router = express.Router();
import {
  getAllexamens,
  addExamen,
  updateExamen,
  deleteExamen,
  getExamen,

} from '../controllers/examen.js';

router
  .route('/')
  .get(getAllexamens)
  .post(addExamen);




  router
  .route('/:idExamen')
  .get(getExamen)
  .put(updateExamen)
  .delete(deleteExamen);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});





export default router;