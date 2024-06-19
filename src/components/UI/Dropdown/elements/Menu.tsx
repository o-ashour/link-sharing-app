import { linkSharePlatformsConfigs } from '@/app/config';

const Component: React.FC<{isOpen: boolean}> = ({ isOpen }) => {
  return (
    <div id="dropdown-menu" className={`mt-2 w-full border border-grey-200 rounded-lg shadow-[0px_0px_32px_0px_rgba(0,0,0,0.15)] ${!isOpen && 'invisible'}`}>
      <ul className="px-4 text-grey-400 divide-y divide-grey-200" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
        { Object.entries(linkSharePlatformsConfigs).map(([k, v]) => {
          return (
            <li key={k} id='platforms-dropdown-option' className="flex gap-x-3 items-center py-3 cursor-pointer active:text-purple-300" role="menuitem">
              <figure>
                {v.iconComponent}
              </figure>
              <span>
                {v.readableName}
              </span>
            </li>
          )
        })
        }
      </ul>
    </div>
  )
}

export default Component;