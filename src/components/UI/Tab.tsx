import { ReactElement } from 'react';

const Component: React.FC<{ icon: (fill?: string) => (ReactElement<any, any>), handleClick: () => void, title: string, isActive: boolean }> = ({ icon, handleClick, title, isActive }) => {
  // const isActive = false;
  console.log(isActive)
  return (
    <button id='nav-tab-btn' className={`flex ${isActive && 'bg-purple-100 text-purple-300'} text-grey-300 font-semibold hover:text-purple-300 active:text-purple-300 active:bg-purple-100 w-full px-7 py-3 rounded-md gap-x-3 items-center`} onClick={handleClick}>
      <figure>
        {isActive ? icon('#633CFF') : icon()}
      </figure>
      <span className='hidden md:inline'>
        {title}
      </span>
    </button>
  )
}

export default Component;