import { JwtPayload } from 'jsonwebtoken';

// defination file for express
declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Request {
      user: JwtPayload | null;
    }
  }
}
