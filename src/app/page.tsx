'use client'

import Link from "next/link";
import { icons } from '@/config';
import TextInputWithIcon from '@/components/UI/TextInputWithIcon';
import Button from '@/components/UI/Button';
import AuthHeader from '@/components/layout/AuthHeader';
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storeNewUser } from "@/components/actions";
import { useRouter } from "next/navigation";

export default function Page() {
  // to be integrated into logic
  const isError = false;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /// testing here, assume below to have passed all necessary validation ftm ///
    const uuid = uuidv4();
    // store user info 
    try {
      const res = await storeNewUser(email, uuid);
      console.log(res)
      window.sessionStorage.setItem('email', email);
      window.sessionStorage.setItem('id', uuid);
      router.push('/profile');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className='px-8 py-8'>
      <div className='space-y-14 md:space-y-12 md:mt-28  lg:mt-20'>
        <AuthHeader />
        <main className="md:p-10 md:max-w-lg md:mx-auto">
          <div>
            <h2 className="mb-2 text-grey-400 text-2xl md:text-3xl md:mb-4 font-bold">
              Create account
            </h2>
            <p className="text-grey-300">
              Let&apos;s get you started sharing your links!
            </p>
          </div>

          <div className="mt-10">
            <form className="space-y-6" action='/profile' method="POST" onSubmit={handleSignUp}>
              <div>
                <label htmlFor="email" className="text-grey-400 text-sm">
                  Email address
                </label>
                <div className="mt-1">
                  {/* need to validate */}
                  <TextInputWithIcon id='email' name='email' type='email' autocomplete='email' isError={isError} placeholder='e.g. 2pac@email.com' icon={icons.email} required handleChange={e => setEmail(e.target.value)}/>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="text-grey-400 text-sm">
                  Password
                </label>
                <div className="mt-1">
                  {/* need to validate */}
                  <TextInputWithIcon id='password' name='password' type='password' autocomplete='current-password' isError={isError} icon={icons.password} placeholder='At least 8 characters' min={8} required handleChange={e => setPassword(e.target.value)} />
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className="text-grey-400 text-sm">
                  Confirm Password
                </label>
                <div className="mt-1">
                  {/* need to validate */}
                  <TextInputWithIcon id='confirm-password' name='confirm-password' type='password' autocomplete='current-password' isError={isError} icon={icons.password} placeholder='At least 8 characters' min={8} required handleChange={e => {
                    if (password === e.target.value)
                     setPassword(e.target.value);
                   }} />
                </div>
              </div>
              <p className="text-grey-300 text-sm">
                Password must contain at least 8 characters
              </p>              
              <Button type='submit'>
                Create new account
              </Button>
            </form>

            <div className="flex flex-col mt-6 text-center justify-center md:gap-1 md:flex-row">
              <p className='text-grey-300'>
                Already have an account?
              </p>
              <Link href="/login" className="text-purple-300">
                Login
              </Link>
            </div>
          </div>
        </main>
      </div>
    </section>
  )
}
