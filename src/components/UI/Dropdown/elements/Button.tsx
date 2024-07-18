import ChevronDownIcon from '../../../icons/ChevronDownIcon';
import ChevronUpIcon from '../../../icons/ChevronUpIcon';
import { linkSharePlatformsConfigs } from '../../../../config/index';
import { State } from '@/userReducer';

const Component: React.FC<{ isOpen: boolean, buttonRef: any, linkId: number, state: State, setIsOpen: React.Dispatch<boolean> }> = ({ isOpen, buttonRef, linkId, state, setIsOpen }) => {
  const foundLink = state.links.find(link => link.id == linkId);
  const selectedPlatform = foundLink?.platform || 'GitHub';

  return (
    <button type='button' id="dropdown-button" className={`flex w-full items-center gap-x-3 px-4 py-3  text-grey-400 border border-grey-200 rounded-lg ${isOpen && 'border-purple-300 shadow-[0px_0px_14px_2px_rgba(99,60,255,0.3)]'}`} onClick={() => setIsOpen(!isOpen)} ref={buttonRef}>
      {linkSharePlatformsConfigs[selectedPlatform].iconComponent}
      <span className="flex-1 text-start">
        {linkSharePlatformsConfigs[selectedPlatform].readableName}
      </span>
      <div className="pl-3">
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </div>
    </button>
  )
}

export default Component;