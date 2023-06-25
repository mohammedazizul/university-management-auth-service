import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchemaAdmin),
  AuthController.loginUser
);

router.post(
  '/login',
  validateRequest(AuthValidation.refreshTokenZodSchemaAdmin),
  AuthController.refreshToken
);

export const AuthRoutes = router;
