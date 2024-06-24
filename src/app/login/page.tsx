'use client'

import Image from "next/image";
import Link from "next/link";
import { icons } from '../../config';
import TextInputWithIcon from '../../components/UI/TextInputWithIcon';
import Button from '../../components/UI/Button';

export default function Page() {
  // to be integrated into logic
  const isError = false;

  return (
    <section className='flex min-h-full flex-1 flex-col justify-center px-8 py-8 space-y-16 lg:px-8'>
      <header className="flex items-center gap-1.5 sm:w-full">
        <figure>
          <Image src='/logo/logo-devlinks-small.svg' alt='logo' width={32} height={32} />
        </figure>
        <h1 className="text-3xl font-semibold">
          devlinks
        </h1>
      </header>

      <main>
        <div>
          <h2 className="mb-2 text-grey-400 text-2xl font-bold">
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

          <div className="mt-6 text-center">
            <p className='text-grey-300 mb-0.5 '>
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
