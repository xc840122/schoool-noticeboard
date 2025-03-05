'use client'

import { useSignUp } from '@clerk/nextjs'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpVerificationService } from '@/services/auth-service'
import { SignUpType, SignUpValidator } from '@/validators/auth-validator'
import { AUTH_MESSAGES } from '@/constants/messages/auth-message'
import { useRouter } from 'next/navigation'

const SignUpForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
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
      setServerError('The sign-up service is loading. Please try again later.');
      return;
    }

    // Confirm password validation
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', { type: 'manual', message: 'Passwords do not match' });
      return;
    }

    // Validate classroom code and ID before submitting
    const validationResponse = await signUpVerificationService(data.verificationCode, data.classroom);
    if (!validationResponse) {
      setError('classroom', { type: 'manual', message: AUTH_MESSAGES.ERROR.CODE_NOT_FOUND });
      return;
    }
    // Handle validation response
    switch (validationResponse.messageKey) {
      case 'ERROR.CODE_NOT_FOUND':
        setError('verificationCode', { type: 'manual', message: AUTH_MESSAGES.ERROR.CODE_NOT_FOUND });
        return;
      case 'ERROR.INVALID_CODE':
        setError('verificationCode', { type: 'manual', message: AUTH_MESSAGES.ERROR.INVALID_CODE });
        return;
      case 'ERROR.CLASSROOM_NOT_MATCH':
        setError('classroom', { type: 'manual', message: AUTH_MESSAGES.ERROR.CLASSROOM_NOT_MATCH });
        return;
      case 'ERROR.UNKNOWN':
        setServerError(AUTH_MESSAGES.ERROR.UNKNOWN);
        return;
      default:
    }

    try {
      // Proceed with sign-up once the role is properly set
      const signUpResponse = await signUp.create({
        username: data.username,
        password: data.password,
        unsafeMetadata: {
          role: validationResponse.data?.role,
          classroom: data.classroom,
        },
      });

      if (signUpResponse.status !== 'complete') {
        setServerError('Signup failed');
        return;
      }
      // Auto login after successful sign-up
      if (signUpResponse.createdSessionId) {
        await setActive({ session: signUpResponse.createdSessionId });
      }

      if (!isLoaded) {
        // Handle loading state
        return null;
      }
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message || 'Signup failed');
      } else {
        setServerError('Signup failed');
      }
    }
  }

  return (
    <div
      id='clerk-captcha'
      className='mt-16 max-w-md mx-auto bg-slate-200 rounded-md shadow-md'>
      <form onSubmit={handleSubmit(onSubmit)} className='rounded-md shadow-md p-6'>
        <h2 className='text-2xl font-bold mb-4'>Sign Up</h2>

        {serverError && <p className='text-red-500'>{serverError}</p>}

        {/* Username */}
        <div className='mb-4'>
          <label className='block text-sm font-medium'>Username</label>
          <input {...register('username')} className='w-full p-2 border rounded-md' />
          {errors.username && <p className='text-red-500'>{errors.username.message}</p>}
        </div>

        {/* Password */}
        <div className='mb-4'>
          <label className='block text-sm font-medium'>Password</label>
          <input {...register('password')} type='password' className='w-full p-2 border rounded-md' />
          {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className='mb-4'>
          <label className='block text-sm font-medium'>Confirm Password</label>
          <input {...register('confirmPassword')} type='password' className='w-full p-2 border rounded-md' />
          {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
        </div>

        {/* Classroom Code */}
        <div className='mb-4'>
          <label className='block text-sm font-medium'>Classroom Code</label>
          <input {...register('classroom')} className='w-full p-2 border rounded-md' />
          {errors.classroom && <p className='text-red-500'>{errors.classroom.message}</p>}
        </div>

        {/* 6-digit ID */}
        <div className='mb-4'>
          <label className='block text-sm font-medium'>6-Digit Alphanumeric ID</label>
          <input {...register('verificationCode')} className='w-full p-2 border rounded-md' />
          {errors.verificationCode && <p className='text-red-500'>{errors.verificationCode.message}</p>}
        </div>

        <button type='submit' disabled={isSubmitting} className='w-full bg-blue-500 text-white p-2 rounded-md'>
          {isSubmitting ? 'Submitting...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;