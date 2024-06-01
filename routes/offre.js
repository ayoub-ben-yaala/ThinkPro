/*import express from 'express';
//import multer from "../middlewares/multer-config.js";

const router = express.Router();
import {
    getAll,
    AddOnce,
    getOnce,
    patchOnce,
    deleteOnce,
    
} from '../controllers/offre.js';


router.route('/')
    .get(getAll)
    .post(//multer,
        AddOnce);
router.route('/:id')
    .get(getOnce)
    .patch(patchOnce)
    .delete(deleteOnce);
    

export default router;*/


import express from 'express';
import multerConfig from "../middlewares/multer-config.js";

const router = express.Router();
import {
    getAll,
    AddOnce,
    getOnce,
    patchOnce,
    deleteOnce,
} from '../controllers/offre.js';

router.route('/')
    .get(getAll)
    .post(multerConfig("image",5* 1024* 1024),AddOnce);

router.route('/:id')
    .get(getOnce)
    .patch(patchOnce)
    .delete(deleteOnce);

export default router;