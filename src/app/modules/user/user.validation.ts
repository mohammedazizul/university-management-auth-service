import { z } from 'zod';
import { bloodGroup, gender } from './user.constant';

// request validation
const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        middleName: z
          .string({
            required_error: 'Middle name is required',
          })
          .optional(),
        lastName: z
          .string({
            required_error: 'Last name is required',
          })
          .optional(),
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: 'Blood group is required',
        })
        .optional(),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),
      academicSemester: z.string({
        required_error: 'Academic semester is required',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father name semester is required',
        }),
        fatherOccupation: z.string({
          required_error: 'Father occupation semester is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father contact no semester is required',
        }),
        motherName: z.string({
          required_error: 'Mother name semester is required',
        }),
        motherOccupation: z.string({
          required_error: 'Mother occupation semester is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother contact no semester is required',
        }),
        address: z.string({
          required_error: 'Guardian address semester is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'Local guardian name semester is required',
        }),
        occupation: z.string({
          required_error: 'Local guardian  occupation semester is required',
        }),
        contactNo: z.string({
          required_error: 'Local guardian  contact no semester is required',
        }),
        address: z.string({
          required_error: 'Local guardian  address semester is required',
        }),
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
