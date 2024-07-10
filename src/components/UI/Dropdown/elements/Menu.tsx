import { linkSharePlatformsConfigs } from '../../../../config';
import { LinkShareSupportedPlatforms } from '../../../../config';

// Consider using the native <dialog> HTML element 
// then you can have access to the onClose prop, 
// use it to perform any cleanup that you might want 
// (e.g close the modal, trigger state stc...)
// https://stackoverflow.com/questions/63074577/close-modal-popup-using-esc-key-on-keyboard

// see @components/UI/Modal/
// https://medium.com/@dimterion/modals-with-html-dialog-element-in-javascript-and-react-fb23c885d62e

const Component: React.FC<{
  menuRef: any, selectedPlatform: LinkShareSupportedPlatforms, setSelectedPlatform: React.Dispatch<LinkShareSupportedPlatforms>, setIsOpen: React.Dispatch<boolean>, linkId: number, setLinksArr: React.Dispatch<React.SetStateAction<[] | {
    id: number;
    platform: LinkShareSupportedPlatforms;
  }[]>> }> = ({ menuRef, selectedPlatform, setSelectedPlatform, setIsOpen, linkId, setLinksArr }) => {

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const selectedPlatformId = e.currentTarget.id as LinkShareSupportedPlatforms;
    setSelectedPlatform(selectedPlatformId);

    setLinksArr(prevVal => {
      const arr = [...prevVal];
      const foundIdx = arr.findIndex(link => linkId === link.id);
      arr[foundIdx].platform = selectedPlatformId;
      return arr;
    })

    setIsOpen(false);
  }

  return (
    <div id="dropdown-menu" className='mt-2 w-full border border-grey-200 rounded-lg shadow-[0px_0px_32px_0px_rgba(0,0,0,0.15)] max-h-52 overflow-scroll' ref={menuRef} aria-labelledby='dropdown-button' role='menu'>
      <ul className="px-4 text-grey-400 divide-y divide-grey-200">
        { Object.entries(linkSharePlatformsConfigs).map(([k, v]) => {
          return (
            <li key={k} id='platforms-dropdown-option'>
              <button id={k} onClick={handleClick} className={`w-full flex gap-x-3 items-center py-3 cursor-pointer active:text-purple-300 ${k === selectedPlatform && 'text-purple-300'}`}>
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