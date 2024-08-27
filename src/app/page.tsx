import Link from "next/link";
import AuthHeader from '@/components/layout/AuthHeader';
import SignUpForm from "@/components/SignUpForm";

export default async function Page() {
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
            <SignUpForm />
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
