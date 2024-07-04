'use client'

import Link from "next/link";
import { icons } from '../../config';
import TextInputWithIcon from '../../components/UI/TextInputWithIcon';
import Button from '../../components/UI/Button';
import AuthHeader from '../../components/layout/AuthHeader';

export default function Page() {
  // to be integrated into logic
  const isError = false;

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
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="text-grey-400 text-sm">
                  Email address
                </label>
                <div className="mt-1">
                  <TextInputWithIcon id='email' name='email' type='email' autocomplete='email' isError={isError} placeholder='e.g. 2pac@email.com' icon={icons.email} />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="text-grey-400 text-sm">
                  Password
                </label>
                <div className="mt-1">
                  <TextInputWithIcon id='password' name='password' type='password' autocomplete='current-password' isError={isError} icon={icons.password} placeholder='At least 8 characters' />
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className="text-grey-400 text-sm">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <TextInputWithIcon id='confirm-password' name='confirm-password' type='password' autocomplete='current-password' isError={isError} icon={icons.password} placeholder='At least 8 characters' />
                </div>
              </div>

              <p className="text-grey-300 text-sm">
                Password must contain at least 8 characters
              </p>

              <div>
                <Button type='submit'>
                  Create new account
                </Button>
              </div>
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
