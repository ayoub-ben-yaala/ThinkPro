import express from'express';
var router = express.Router();
import {
  getAllCours,
  addCours,
  getCours,
  updateCours,
  deleteCours

} from '../controllers/cours.js';

router
  .route('/')
  .get(getAllCours)
  .post(addCours);




  router
  .route('/:coursId')
  .get(getCours)
  .put(updateCours)
  .delete(deleteCours);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});





export default router;