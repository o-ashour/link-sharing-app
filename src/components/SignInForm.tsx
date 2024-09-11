'use client'

import Button from '@/components/UI/Button';
import { icons } from '@/config';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast, ToastContainer } from 'react-toastify';
import { signInSchema } from '@/lib/schema';
import { SignInFormData } from '@/types';
import { login } from './actions';

const SignInForm: React.FC = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema)
  });

  const showToast = (messages: string[]) => {
    messages.forEach(message => {
      toast.error(message, {
        hideProgressBar: true,
      });
    })
  }

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    const parse = signInSchema.safeParse(data);
    if (parse.success) {
      try {
        const promise = login(parse.data);
        toast.promise(promise, { pending: 'Logging in' });
        const res = await promise;
        if (res?.errors) {
          const errors = res.errors;
          const messages = ['Failed to login'];

          if (errors.email && errors.email.length > 0) {
            errors.email.forEach(error => {
              messages.push('Email: ' + error)
            })
            setError('email', {
              type: 'server',
              message: errors.email[0],
            })
          }
          if (errors.password && errors.password.length > 0) {
            errors.password.forEach(error => {
              messages.push('Password: ' + error)
            })
            setError('password', {
              type: 'server',
              message: errors.password[0],
            })
          }
          showToast(messages);
        }
      } catch (error) {
        if (error instanceof Error) {
          showToast([error.message]);
        }
      }
    }
    return;
  };
  

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email" className="text-grey-400 text-sm">
          Email address
        </label>
        <div className="w-full relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {icons.email}
          </div>
          {errors.email &&
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-red text-sm bg-white z-50">{errors.email.message}</span>
            </div>
          }
          <input
            className={`block w-full rounded-lg border px-4 py-3 pl-10 ${errors.email ? 'text-red border-red' : 'text-grey-400 border-grey-200'} caret-purple-300 focus:outline-none focus:border-none focus:ring-1 focus:ring-inset focus:ring-purple-300 focus:shadow-[0px_0px_14px_2px_rgba(99,60,255,0.3)] placeholder:text-grey-400 placeholder:opacity-50`}
            type='email'
            placeholder='e.g. 2pac@email.com'
            {...register('email')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="text-grey-400 text-sm">
          Password
        </label>
        <div className="w-full relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {icons.password}
          </div>
          {errors.password &&
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-red text-sm bg-white z-50">{errors.password.message}</span>
            </div>
          }
          <input
            className={`block w-full rounded-lg border px-4 py-3 pl-10 ${errors.password ? 'text-red border-red' : 'text-grey-400 border-grey-200'} caret-purple-300 focus:outline-none focus:border-none focus:ring-1 focus:ring-inset focus:ring-purple-300 focus:shadow-[0px_0px_14px_2px_rgba(99,60,255,0.3)] placeholder:text-grey-400 placeholder:opacity-50`}
            type='password'
            placeholder='At least 8 characters'
            {...register('password')}
          />
        </div>
      </div>

      <Button type='submit' disabled={isSubmitting}>
        Login
      </Button>
      <ToastContainer />
    </form>
  )
}

export default SignInForm;

