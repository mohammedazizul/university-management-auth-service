// import { RequestHandler } from 'express'
import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

const validateRequest =
  (schema: AnyZodObject) =>
  // returning req, res, next to next controller if no error
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      })
      return next()
    } catch (error) {
      next(error)
    }
  }

export default validateRequest
