'use client'

import Button from '@/components/UI/Button';
import { icons } from '@/config';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast, ToastContainer } from 'react-toastify';
import { SignInFormData, signInSchema } from '@/lib/definitions';
import { login } from '../lib/actions';

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
      const promise = login(parse.data);
      toast.promise(promise, { pending: 'Logging in' });
      const res = await promise;
      if (res?.errors) {
        const errors = res.errors;
        const messages = ['Failed to login'];

        if (errors.email && errors.email.length > 0) {
          if (errors.email.some(message => message === 'Invalid credentials')) {
            showToast(['Invalid credentials'])
          } else {
            errors.email.forEach(error => {
              messages.push('Email: ' + error)
            })
            setError('email', {
              type: 'server',
              message: errors.email[0],
            })
          }            
        }
        if (errors.password && errors.password.length > 0) {
          if (errors.password.some(message => message === 'Invalid credentials')) {
            showToast(['Invalid credentials'])
          } else {
            errors.password.forEach(error => {
              messages.push('Password: ' + error)
            })
            setError('password', {
              type: 'server',
              message: errors.password[0],
            })
          }
        }
        showToast(messages);
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
        {errors.email &&
          <p className="text-red text-sm mt-1 mb-1.5">
            {errors.email.message}
          </p>
        }
        <div className="w-full relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {icons.email}
          </div>
          <input
            id='email'
            className={`block w-full rounded-lg border px-4 py-3 pl-10 ${errors.email ? 'text-red border-red' : 'text-grey-400 border-grey-200'} caret-purple-300 focus:outline-none focus:border-none focus:ring-1 focus:ring-inset focus:ring-purple-300 focus:shadow-[0px_0px_14px_2px_rgba(99,60,255,0.3)] placeholder:text-grey-400 placeholder:opacity-50`}
            type='email'
            placeholder='e.g. 2pac@email.com'
            autoComplete='email'
            {...register('email')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="text-grey-400 text-sm">
          Password
        </label>
        {errors.password &&
          <p className="text-red text-sm mt-1 mb-1.5">
            {errors.password.message}
          </p>
        }
        <div className="w-full relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {icons.password}
          </div>
          <input
            id='password'
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

