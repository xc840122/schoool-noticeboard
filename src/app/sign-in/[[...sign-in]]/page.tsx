'use client';

import { SignUpButton, useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, SignInType } from '@/validators/auth-validator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';

export const SignInPage = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  async function onSubmit(data: SignInType) {
    setServerError(null);

    if (!isLoaded) {
      setServerError('The sign-in service is loading. Please try again later.');
      return;
    }

    try {
      // Sign in with Clerk
      const signInResponse = await signIn.create({
        identifier: data.identifier,
        password: data.password,
      });

      // Handle sign-in response,check if sign-in is complete
      if (signInResponse.status !== 'complete') {
        setServerError('Signin failed');
        return;
      }

      // Sign in action
      if (signInResponse.createdSessionId) {
        await setActive({ session: signInResponse.createdSessionId });
      }

      // Handle loading state
      if (!isLoaded) {
        return null;
      }
      // Redirect to home page
      router.push('/');

    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message || 'Signin failed');
      } else {
        setServerError('Signin failed');
      }
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Welcome to Digital Campus!</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-gray-500 text-center mb-4">Sign in to your account</h2>

          {/* Display server-side error messages */}
          {serverError && <p className="text-red-500 text-sm text-center mb-3">{serverError}</p>}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Username Field */}
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <Label>Username</Label>
                    <Input {...field} placeholder="Enter your username" />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label>Password</Label>
                    <Input {...field} type="password" placeholder="Enter your password" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* CAPTCHA */}
              <div id="clerk-captcha"></div>

              {/* Sign-In Button */}
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Submitting...' : 'Sign In'}
              </Button>

              {/* Sign-Up Link */}
              <div className="flex justify-center items-center mt-2">
                <span>Not a user yet?&nbsp;&nbsp;</span>
                <SignUpButton >
                  <span className='text-xs text-gray-500 cursor-pointer'>Sign up</span>
                </SignUpButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;