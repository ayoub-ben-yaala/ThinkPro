import express from'express';
var router = express.Router();
import {
  getOnce,
  putOnce,
  patchOnce,
  getAll,
  AddOnce,
  deleteOnce,
  commandePDF
} from '../controllers/commande.js';

router
  .route('/')
  .get(getAll)
  .post(AddOnce);

  router
  .route('/:idCommande')
  .get(getOnce)
  .put(putOnce)
  .patch(patchOnce)
  .delete(deleteOnce);

  router
  .route('/pdf/:id')
  .get(commandePDF)

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


export default router;