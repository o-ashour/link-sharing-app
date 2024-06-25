import { ReactElement } from 'react';

const Component: React.FC<{ icon: ReactElement<any, any>}> = ({ icon }) => {
  return (
    <button id='nav-tab-btn' className='flex text-grey-300 font-semibold hover:text-purple-300 active:text-purple-300 active:bg-purple-100 w-full px-7 py-3 rounded-md gap-x-3 items-center'>
      <figure>
        {icon}
      </figure>
      <span className='hidden md:inline'>
        Title
      </span>
    </button>
  )
}

export default Component;