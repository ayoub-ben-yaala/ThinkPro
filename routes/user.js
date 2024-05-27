import express from'express';
var router = express.Router();
import {
  // getUserByName,
  getUserByEmail,
  putUser,
  patchUser,
  getAllUsers,
  AddUser,
  deleteUser,
  signin,
  signup,
  forgotPassword,
  resetPassword
} from '../controllers/user.js';

router
  .route('/')
  .get(getAllUsers)
  .post(AddUser);

router.route('/signup')
  .post(signup);

router.route('/signin')
  .post(signin);

// router.get('/:userName',getUserByName);
router.get('/:email',getUserByEmail);

  router
  .route('/:userId')
  .put(putUser)
  .patch(patchUser)
  .delete(deleteUser);

  router.post('/forgot-password',forgotPassword);
router.post('/reset-password/:token',resetPassword);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});





export default router;
