import express from'express';
var router = express.Router();
import {
  getAlllevel,
  addLevel,
  updateLevel,
  deleteLevel,
  getLevel,
  getLevelByName

} from '../controllers/level.js';

router
  .route('/')
  .get(getAlllevel)
  .post(addLevel);




  router
  .route('/:levelId')
  .get(getLevelByName)
  .put(updateLevel)
  .delete(deleteLevel);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});





export default router;