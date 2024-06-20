import LinkIcon from '../../../icons/LinkIcon';
import ChevronDownIcon from '../../../icons/ChevronDownIcon';
import ChevronUpIcon from '../../../icons/ChevronUpIcon';

const Component: React.FC<{isOpen: boolean, handleClick: () => void, buttonRef: any}> = ({ isOpen, handleClick, buttonRef }) => {
  return (
    <button id="dropdown-button" className={`flex w-full items-center gap-x-3 px-4 py-3  text-grey-400 border border-grey-200 rounded-lg ${isOpen && 'border-purple-300 shadow-[0px_0px_14px_2px_rgba(99,60,255,0.3)]'}`} onClick={handleClick} ref={buttonRef}>
      <LinkIcon />
      <span className="flex-1 text-start">
        Theme
      </span>
      <div className="pl-3">
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </div>
    </button>
  )
}

export default Component;