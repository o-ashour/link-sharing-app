import { linkSharePlatformsConfigs } from '../../../../config';

// Consider using the native <dialog> HTML element 
// then you can have access to the onClose prop, 
// use it to perform any cleanup that you might want 
// (e.g close the modal, trigger state stc...)
// https://stackoverflow.com/questions/63074577/close-modal-popup-using-esc-key-on-keyboard

// see @components/UI/Modal/
// https://medium.com/@dimterion/modals-with-html-dialog-element-in-javascript-and-react-fb23c885d62e

const Component: React.FC<{menuRef: any}> = ({ menuRef }) => {
  return (
    <div id="dropdown-menu" className={`mt-2 w-full border border-grey-200 rounded-lg shadow-[0px_0px_32px_0px_rgba(0,0,0,0.15)]`} ref={menuRef} aria-labelledby='dropdown-button' role='menu'>
      <ul className="px-4 text-grey-400 divide-y divide-grey-200">
        { Object.entries(linkSharePlatformsConfigs).map(([k, v]) => {
          return (
            <li key={k} id='platforms-dropdown-option'>
              <button className="w-full flex gap-x-3 items-center py-3 cursor-pointer active:text-purple-300">
                <figure>
                  {v.iconComponent}
                </figure>
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