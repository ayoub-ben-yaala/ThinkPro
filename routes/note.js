import express from'express';
var router = express.Router();
import {
  getAllnotes,
  addNote,
  getAllnotes,
  updateNote,
  deleteNote,
  getNote,
  updateNote,
  deleteNote

} from '../controllers/note.js';

router
  .route('/')
  .get(getAllnotes)
  .post(addNote);




  router
  .route('/:idNote')
  .get(getNote)
  .put(updateNote)
  .delete(deleteNote);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});





export default router;