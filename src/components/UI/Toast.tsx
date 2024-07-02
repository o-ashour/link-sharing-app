import { ReactNode } from "react";

const Component: React.FC<{ iconComponent?: ReactNode,message?: string }> = ({ iconComponent, message}) => {
  return (
    <button className='flex w-full px-6 py-4 gap-x-2 rounded-xl items-center bg-grey-400 text-grey-100 font-semibold'>
      <figure>
        {iconComponent}
      </figure>
      <span>{message}</span>
    </button>
  )
}

export default Component;