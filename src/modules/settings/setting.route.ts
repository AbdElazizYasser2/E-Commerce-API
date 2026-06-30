import { Router } from "express";
import {
  getUserSettings,
  updateUserSettings,
  updateLanguage,
  updateCurrency,
  updateNotifications,
  resetSettings,
} from "./setting.controller.ts";
import { protect } from "../../middlewares/auth.middleware.ts";
import {
  updateSettingsValidator,
  updateLanguageValidator,
  updateCurrencyValidator,
} from "./setting.validation.ts";

const router = Router();

router.get("/", protect, getUserSettings);
router.put("/", protect, updateSettingsValidator, updateUserSettings);
router.put("/language", protect, updateLanguageValidator, updateLanguage);
router.put("/currency", protect, updateCurrencyValidator, updateCurrency);
router.put("/notifications", protect, updateNotifications);
router.post("/reset", protect, resetSettings);

export default router;