'use client'

import { useSignUp } from '@clerk/nextjs'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

// Define validation schema using Zod
const schema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(16, 'Username must be at most 16 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  classroomCode: z.string()
    .max(4, 'Classroom code must be at most 4 characters')
    .regex(/^[a-zA-Z0-9]+$/, 'Classroom code must contain only letters and numbers'),
  sixDigitId: z.string().regex(/^[a-zA-Z0-9]{6}$/, 'Must be a 6-digit alphanumeric ID'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function SignUpForm() {
  const { isLoaded, signUp } = useSignUp()
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Simulated API call to check validity of classroom code & ID
  const validateClassroomAndId = async (classroomCode: string, sixDigitId: string) => {
    // Replace with actual API call to your database
    const validClassroomCodes = ["CLASS123", "CLASS456"];
    const validIds = ["ABC123", "XYZ789"];

    if (!validClassroomCodes.includes(classroomCode)) {
      return { success: false, error: "Invalid classroom code" };
    }
    if (!validIds.includes(sixDigitId)) {
      return { success: false, error: "Invalid 6-digit ID" };
    }
    return { success: true };
  }

  async function onSubmit(data: any) {
    setServerError(null);

    if (!isLoaded) return null;

    // Validate classroom code and ID before submitting
    const validationResponse = await validateClassroomAndId(data.classroomCode, data.sixDigitId);
    if (!validationResponse.success) {
      setError("classroomCode", { type: "manual", message: validationResponse.error });
      return;
    }

    try {
      await signUp.create({
        username: data.username,
        password: data.password,
        unsafeMetadata: {
          classroomCode: data.classroomCode,
          sixDigitId: data.sixDigitId,
        },
      });

      // Redirect or handle post-signup logic
      router.push('/dashboard'); // Change as needed
    } catch (err: any) {
      setServerError(err.message || "Signup failed");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

      {serverError && <p className="text-red-500">{serverError}</p>}

      {/* Username */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Username</label>
        <input {...register("username")} className="w-full p-2 border rounded-md" />
        {errors.username && <p className="text-red-500">{errors.username.message}</p>}
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Password</label>
        <input {...register("password")} type="password" className="w-full p-2 border rounded-md" />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>

      {/* Confirm Password */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Confirm Password</label>
        <input {...register("confirmPassword")} type="password" className="w-full p-2 border rounded-md" />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
      </div>

      {/* Classroom Code */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Classroom Code</label>
        <input {...register("classroomCode")} className="w-full p-2 border rounded-md" />
        {errors.classroomCode && <p className="text-red-500">{errors.classroomCode.message}</p>}
      </div>

      {/* 6-digit ID */}
      <div className="mb-4">
        <label className="block text-sm font-medium">6-Digit Alphanumeric ID</label>
        <input {...register("sixDigitId")} className="w-full p-2 border rounded-md" />
        {errors.sixDigitId && <p className="text-red-500">{errors.sixDigitId.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white p-2 rounded-md">
        {isSubmitting ? "Submitting..." : "Sign Up"}
      </button>
    </form>
  );
}
