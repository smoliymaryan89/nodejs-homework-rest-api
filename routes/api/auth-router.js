import express from "express";
import authController from "../../controllers/auth-controller.js";
import {
  authenticate,
  isEmptyBody,
  isValidId,
  upload,
} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  userEmailSchema,
  userLoginSchema,
  userRegisterSchema,
  userSubscriptionUpdate,
} from "../../models/User.js";

const userRegisterValidate = validateBody(userRegisterSchema);
const userLoginValidate = validateBody(userLoginSchema);
const userSubscriptionUpdateValidate = validateBody(userSubscriptionUpdate);
const userEmailValidate = validateBody(userEmailSchema);

const router = express.Router();

router.post(
  "/register",
  isEmptyBody,
  userRegisterValidate,
  authController.register
);

router.get("/verify/:verificationToken", authController.verify);

router.post(
  "/verify",
  isEmptyBody,
  userEmailValidate,
  authController.resendVerifyEmail
);

router.post("/login", isEmptyBody, userLoginValidate, authController.login);

router.get("/current", authenticate, authController.getCurrent);

router.post("/logout", authenticate, authController.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  authController.updateUserAvatar
);

router.patch(
  "/:userId",
  authenticate,
  isValidId,
  userSubscriptionUpdateValidate,
  authController.updateUserSubscription
);

export default router;
