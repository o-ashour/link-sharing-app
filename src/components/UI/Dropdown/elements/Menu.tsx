import { 
  linkSharePlatformsConfigs, 
  LinkShareSupportedPlatforms } from '@/config';
import { State, Action } from '@/lib/definitions';
import { Dispatch } from 'react';

const Component: React.FC<{
  menuRef: any, setIsOpen: React.Dispatch<boolean>, linkId: number, dispatch: Dispatch<Action>, state: State
}> = ({ menuRef, setIsOpen, linkId, dispatch, state }) => {

  const handlePlatformSelect = (e: React.MouseEvent<HTMLElement>) => {
    const selectedPlatformId = e.currentTarget.id as LinkShareSupportedPlatforms;
    dispatch({ type: 'selected_platform', linkId, selectedPlatformId })
    setIsOpen(false);
  }

  const foundLink = state.links.find(link => link.id == linkId);
  const selectedPlatform = foundLink?.platform;

  return (
    <div id="dropdown-menu" className='mt-2 w-full border border-grey-200 rounded-lg shadow-[0px_0px_32px_0px_rgba(0,0,0,0.15)] max-h-52 overflow-scroll' ref={menuRef} aria-labelledby='dropdown-button' role='menu'>
      <ul className="px-4 text-grey-400 divide-y divide-grey-200">
        {Object.entries(linkSharePlatformsConfigs).map(([k, v]) => {
          return (
            <li key={k} id='platforms-dropdown-option'>
              <button id={k} onClick={handlePlatformSelect} className={`w-full flex gap-x-3 items-center py-3 cursor-pointer active:text-purple-300 ${k === selectedPlatform && 'text-purple-300'}`}>
                {k === selectedPlatform ? (
                  <figure id='selected-platform-icon'>
                    {v.iconComponent}
                  </figure>
                ) :
                  <figure>
                    {v.iconComponent}
                  </figure>
                }
                <span>
                  {v.readableName}
                </span>
              </button>
            </li>
          )
        })
        }
      </ul>
    </div>
  )
}

export default Component;