'use client'

import { useSignUp } from '@clerk/nextjs'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { signUpVerificationService } from '@/services/auth-service'
import { SignUpType, SignUpValidator } from '@/validators/auth-validator'

export default function SignUpForm() {
  const { isLoaded, signUp } = useSignUp()
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignUpValidator),
  });

  async function onSubmit(data: SignUpType) {
    setServerError(null);

    if (!isLoaded) {
      setServerError("The sign-up service is loading. Please try again later.");
      return;
    }

    // Confirm password validation
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { type: "manual", message: "Passwords do not match" });
      return;
    }

    // Validate classroom code and ID before submitting
    const validationResponse = await signUpVerificationService(data.verificationCode, data.classroom);

    if (!validationResponse || !validationResponse.data?.role) {
      setError("classroom", { type: "manual", message: "Invalid classroom code or verification code" });
      return;
    }

    try {
      // Proceed with sign-up once the role is properly set
      await signUp.create({
        username: data.username,
        password: data.password,
        unsafeMetadata: {
          role: validationResponse.data.role, // Ensure role is sent in metadata
          classroom: data.classroom,
        },
      });

      // Redirect after successful sign-up
      router.push('/'); // Change as needed
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message || "Signup failed");
      } else {
        setServerError("Signup failed");
      }
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
        <input {...register("classroom")} className="w-full p-2 border rounded-md" />
        {errors.classroom && <p className="text-red-500">{errors.classroom.message}</p>}
      </div>

      {/* 6-digit ID */}
      <div className="mb-4">
        <label className="block text-sm font-medium">6-Digit Alphanumeric ID</label>
        <input {...register("verificationCode")} className="w-full p-2 border rounded-md" />
        {errors.verificationCode && <p className="text-red-500">{errors.verificationCode.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white p-2 rounded-md">
        {isSubmitting ? "Submitting..." : "Sign Up"}
      </button>
    </form>
  );
}