import express from "express";
import PreferenceController from "../controller/preferencesController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .get("/preferences", authMiddleware, PreferenceController.getPreferences)
  .post("/preferences", authMiddleware, PreferenceController.postPreferences)
  .put("/preferences/:id", authMiddleware, PreferenceController.updatePreference)

export default router; 