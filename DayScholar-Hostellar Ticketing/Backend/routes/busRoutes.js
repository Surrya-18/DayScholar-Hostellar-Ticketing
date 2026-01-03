const express = require("express");
const router = express.Router();
const { createRoute, getAllRoutes } = require("../controllers/routeController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const { getBusById } = require("../controllers/routeController");

router.post("/create", authMiddleware, adminMiddleware, createRoute);
router.get("/:id",authMiddleware, getBusById);
router.get("/", getAllRoutes);

module.exports = router;
