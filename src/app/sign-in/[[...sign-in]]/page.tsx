'use client';

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import { SignUpButton, useUser } from '@clerk/nextjs';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInPage() {

  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const role = user?.unsafeMetadata.role;
    if (isLoaded && isSignedIn && role !== undefined) {
      router.push(`/`);
    }
  }, [user, router, isLoaded, isSignedIn]);

  return (
    <div className='h-screen flex items-center justify-center bg-CSkyLight'>
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="flex flex-col gap-2 bg-white
          rounded-md shadow-2xl p-12">
          <h1 className='flex items-center gap-2 text-xl font-bold'>
            <Image src='/logo.png' alt='logo' width={24} height={24} />
            Welcome to School! 🎉
          </h1>
          <h2 className='text-gray-400'>Sign in to your account</h2>
          <Clerk.GlobalError className='text-sm text-red-400' />
          <Clerk.Field name="identifier" className='flex flex-col gap-2'>
            <Clerk.Label className='text-xs text-gray-500'>Username</Clerk.Label>
            <Clerk.Input
              className='p-2 rounded-md ring-1 ring-gray-300'
              type='text'
              required />
            <Clerk.FieldError className='text-xs text-red-400' />
          </Clerk.Field>
          <Clerk.Field name="password" className='flex flex-col gap-2'>
            <Clerk.Label className='text-xs text-gray-500'>password</Clerk.Label>
            <Clerk.Input
              className='p-2 rounded-md ring-1 ring-gray-300'
              type='password'
              required />
            <Clerk.FieldError className='text-xs text-red-400' />
          </Clerk.Field>
          <SignIn.Action
            className='bg-blue-500 rounded-sm my-1 p-[10px] text-white font-bold'
            submit>Sign In</SignIn.Action>
          <SignUpButton />
        </SignIn.Step>
      </SignIn.Root>
    </div >
  )
}