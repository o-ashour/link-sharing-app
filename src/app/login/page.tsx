import Link from "next/link";
import AuthHeader from '@/components/layout/AuthHeader';
import SignInForm from "@/components/SignInForm";

export default function Page() {
  return (
    <section className='px-8 py-8'>
      <div className='space-y-16 md:space-y-12 md:mt-48 lg:mt-36'>
        <AuthHeader />
        <main className="md:p-10 md:max-w-lg md:mx-auto">
          <div>
            <h2 className="mb-2 text-grey-400 text-2xl md:mb-4 md:text-3xl font-bold">
              Login
            </h2>
            <p className="text-grey-300">
              Add your details below to get back into the app
            </p>
          </div>

          <div className="mt-10">
            <SignInForm />
            <div className="flex flex-col mt-6 text-center justify-center md:gap-1 md:flex-row">
              <p className='text-grey-300'>
                Don&apos;t have an account?
              </p>
              <Link href="/" className="text-purple-300">
                Create account
              </Link>
            </div>
          </div>
        </main>
      </div>
    </section>
  )
}
