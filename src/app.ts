import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route';
import { UserRoutes } from './app/modules/user/users.route';

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1/users/', UserRoutes);
app.use('/api/v1/academic-semesters/', AcademicSemesterRoutes);

// console.log(app.get('env'))

// test error - uncaughtException
// app.get('/', (req: Request, res: Response,) => {
//   console.log(X)
// })

// globalErrorHandler
app.use(globalErrorHandler);

// test error - unhandledRejection
// app.get('/', async (req: Request, res: Response,) => {
//   Promise.reject(new Error('Unhandled promise rejection'))
// })

// test error
// app.get('/', (req: Request, res: Response,) => {
//   res.send('Hello World!')
//   // throw new Error('Error !!!') // default
//   // throw new ApiError(400, "Error from ApiError")// custom
//   // next('Error from Next!!!')
// })

// test
// app.get('/', async (req: Request, res: Response) => {
//   res.send('Hello World!')
// })

// test
// import usersService from './app/modules/users/users.service'
// app.get('/', async (req: Request, res: Response) => {

//   await usersService.createUser({
//     id: '999',
//     password: "1234",
//     role: "student"
//   })

//   res.send('Hello World!')
// })

export default app;
