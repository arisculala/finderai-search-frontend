import express from "express";
import * as tenantController from "../controllers/tenantController";

const router = express.Router();

// GET all tenants
router.get("/", tenantController.getAllTenants);

// POST create tenant
router.post("/", tenantController.createTenant);

// Optional: GET one tenant, PUT update, DELETE
router.get("/:id", tenantController.getTenantById);
router.put("/:id", tenantController.updateTenant);
router.delete("/:id", tenantController.deleteTenant);

export default router;
