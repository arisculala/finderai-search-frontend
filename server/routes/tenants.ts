import express from 'express';
import * as tenantController from '../controllers/tenantController';

const router = express.Router();

router.post('/', tenantController.createTenant);
router.get('/', tenantController.getTenants);
router.get('/:id', tenantController.getTenant);
router.put('/:id', tenantController.updateTenant);
router.put('/:id/active', tenantController.updateTenantActive);
router.get('/:id/users', tenantController.getTenantUsers);
router.post('/:id/users/add', tenantController.addTenantToUsers);
router.get('/:id/users/exclude', tenantController.getTenantExcludeUsers);

export default router;
