import express from'express';
var router = express.Router();
import {
  getAlllevel,
  addLevel,
  getLevel,
  updateLevel,
  deleteLevel

} from '../controllers/level.js';

router
  .route('/')
  .get(getAlllevel)
  .post(addLevel);




  router
  .route('/:levelId')
  .get(getLevel)
  .put(updateLevel)
  .delete(deleteLevel);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});





export default router;