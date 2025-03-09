'use client';

import { useClerk, useSignUp } from '@clerk/nextjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpVerificationService } from '@/services/auth-service';
import { SignUpType, signUpSchema } from '@/validators/auth-validator';
import { AUTH_MESSAGES } from '@/constants/messages/auth-message';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';

export default function SignUpForm() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const { signOut } = useClerk();

  // Initialize react-hook-form with Zod validation
  const form = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      classroom: '',
      verificationCode: '',
    },
  });

  async function onSubmit(data: SignUpType) {
    setServerError(null);

    // Ensure sign-up service is loaded
    if (!isLoaded) {
      setServerError('The sign-up service is loading. Please try again later.');
      return;
    }

    // Confirm password validation
    if (data.password !== data.confirmPassword) {
      form.setError('confirmPassword', { type: 'manual', message: 'Passwords do not match' });
      return;
    }

    // Validate classroom code and verification ID before proceeding
    const validationResponse = await signUpVerificationService(data.verificationCode, data.classroom);

    // Handle validation response
    switch (validationResponse.message) {
      case 'ERROR.CODE_NOT_FOUND':
        setServerError(AUTH_MESSAGES.ERROR.CODE_NOT_FOUND);
        return;
      case 'ERROR.INVALID_CODE':
        setServerError(AUTH_MESSAGES.ERROR.INVALID_CODE);
        return;
      case 'ERROR.CLASSROOM_NOT_MATCH':
        setServerError(AUTH_MESSAGES.ERROR.CLASSROOM_NOT_MATCH);
        return;
      case 'ERROR.UNKNOWN':
        setServerError(AUTH_MESSAGES.ERROR.UNKNOWN);
        return;
      default:
    }

    try {
      // Avoid single-session problem, sign out before sign-up
      await signOut();
      // Proceed with sign-up if validation is successful
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

      // Redirect user to home page
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
    <div className='flex items-center justify-center h-screen'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-center text-2xl'>Sign Up to Digital Campus</CardTitle>
        </CardHeader>
        <CardContent>
          {serverError && <p className='text-red-500 text-sm text-center mb-3'>{serverError}</p>}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              {/* Username Field */}
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <Label>Username</Label>
                    <Input {...field} placeholder='Enter your username' />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <Label>Password</Label>
                    <Input {...field} type='password' placeholder='Enter your password' />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <Label>Confirm Password</Label>
                    <Input {...field} type='password' placeholder='Confirm your password' />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Classroom Code Field */}
              <FormField
                control={form.control}
                name='classroom'
                render={({ field }) => (
                  <FormItem>
                    <Label>Classroom Code</Label>
                    <Input {...field} placeholder='Enter classroom code' />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Verification Code Field */}
              <FormField
                control={form.control}
                name='verificationCode'
                render={({ field }) => (
                  <FormItem>
                    <Label>VerificationCode Code</Label>
                    <Input {...field} placeholder='Enter verification code' />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CAPTCHA */}
              <div id="clerk-captcha"></div>

              {/* Submit Button */}
              <Button type='submit' className='w-full' disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Submitting...' : 'Sign Up'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}