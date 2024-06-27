import LogoSmall from '../logo/LogoSmall';
import Tab from '../UI/Tab';
import { icons } from '../../config/index';
import Button from '../UI/Button';
import PreviewIconHeader from '../icons/PreviewIconHeader';

const Component: React.FC<{ setIsProfileDetailsOpen: React.Dispatch<boolean>, handlePreviewClick: () => void, isProfileDetailsOpen: boolean }> = ({ setIsProfileDetailsOpen, handlePreviewClick, isProfileDetailsOpen }) => {
  const handleLinksClick = () => {
    setIsProfileDetailsOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileDetailsOpen(true);
  };

  return (
    <header className="md:p-6">
      <div className='flex justify-between items-center p-4 pl-6'>
        <div className="flex-none md:flex md:items-center md:space-x-1">
          <LogoSmall />
          <blockquote className='hidden md:block md:text-3xl md:font-semibold'>devlinks</blockquote>
        </div>
        <nav className="flex-2">
          <ul className='flex'>
            <li>
              <Tab title='Links' handleClick={handleLinksClick} icon={icons.links} isActive={!isProfileDetailsOpen} />
            </li>
            <li>
              <Tab title='Profile Details' handleClick={handleProfileClick} icon={icons.profile} isActive={isProfileDetailsOpen} />
            </li>
          </ul>
        </nav>
        <Button id='nav-preview-btn' variant='secondary' handleClick={handlePreviewClick}>
          <span className='hidden md:inline'>Preview</span>
          <PreviewIconHeader className='md:hidden' />
        </Button>
      </div>
    </header>
  )
}

export default Component;