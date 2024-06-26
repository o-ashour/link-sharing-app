'use client'

import Link from "next/link";
import { icons } from '../../config';
import TextInputWithIcon from '../../components/UI/TextInputWithIcon';
import Button from '../../components/UI/Button';
import LogoSmall from '../../components/logo/LogoSmall';

export default function Page() {
  // to be integrated into logic
  const isError = false;

  return (
    <section className='flex min-h-full flex-1 flex-col justify-center px-8 py-8 space-y-16 md:px-40 md:py-56 md:space-y-12 lg:px-8'>
      <header className="flex items-center md:justify-center gap-1.5 sm:w-full">
        <figure>
          <LogoSmall width={40} height={40} />
        </figure>
        <h1 className="text-3xl md:text-4xl font-semibold">
          devlinks
        </h1>
      </header>

      <main className="md:p-10">
        <div>
          <h2 className="mb-2 text-grey-400 text-2xl md:mb-4 md:text-3xl font-bold">
            Login
          </h2>
          <p className="text-grey-300">
            Add your details below to get back into the app
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
                <TextInputWithIcon id='password' name='password' type='password' autocomplete='current-password' isError={isError} icon={icons.password} placeholder='Enter your password' />
              </div>
            </div>

            <div>
              <Button type='submit'>Login</Button>
            </div>
          </form>

          <div className="flex flex-col mt-6 text-center justify-center md:gap-1 md:flex-row">
            <p className='text-grey-300'>
              Don&apos;t have an account?
            </p>
            <Link href="/signup" className="text-purple-300">
              Create account
            </Link>
          </div>
        </div>
      </main>
    </section>
  )
}
