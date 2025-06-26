import express from 'express';
import * as datasetController from '../controllers/datasetController';

const router = express.Router();

router.post('/', datasetController.createDataset);
router.get('/', datasetController.getDatasets);
router.get('/:id', datasetController.getDataset);
router.put('/:id', datasetController.updateDataset);

export default router;
