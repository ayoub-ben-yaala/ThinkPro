import express from'express';
var router = express.Router();
import {
  getOnce,
  putOnce,
  patchOnce,
  getAll,
  AddOnce,
  deleteOnce
} from '../controllers/Produit.js';

router
  .route('/')
  .get(getAll)
  .post(AddOnce);

  router
  .route('/:idProduit')
  .get(getOnce)
  .put(putOnce)
  .patch(patchOnce)
  .delete(deleteOnce);
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});





export default router;