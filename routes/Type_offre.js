import express from 'express';
const router = express.Router();
import {
    getAll,
    AddOnce,
    getOnce,
    patchOnce,
    deleteOnce
} from '../controllers/Type_offre.js';
router.route('/')
    .get(getAll)
    .post(AddOnce)

router.route('/:id')
    .get(getOnce)
    .patch(patchOnce)
    .delete(deleteOnce);

export default router;
