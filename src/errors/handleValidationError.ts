import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleValidationError = (err: mongoose.Error.ValidationError) : IGenericErrorResponse => {
  //
  const statusCode = 400;
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    // (element: mongoose.Error.ValidationError | mongoose.Error.CastError)  => {
    (element)  => {
      return {
        path: element?.path,
        message: element?.message,
      }
    }
  )
  return {
    statusCode,
    message: 'ValidationError',
    errorMessages: errors,
  }
}

export default handleValidationError
