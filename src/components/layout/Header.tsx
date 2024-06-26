import LogoSmall from '../logo/LogoSmall';
import Tab from '../UI/Tab';
import { icons } from '../../config/index';
import Button from '../UI/Button';
import PreviewIconHeader from '../icons/PreviewIconHeader';

const Component: React.FC<{setIsProfileDetailsOpen: React.Dispatch<boolean>}> = ({ setIsProfileDetailsOpen }) => {
  const handleLinksClick = () => {
    setIsProfileDetailsOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileDetailsOpen(true);
  };

  return (
    <header className="flex justify-between items-center p-4 pl-6">
      <div className="flex-none">
        <LogoSmall />
      </div>
      <nav className="flex-2">
        <ul className='flex'>
          <li>
            <Tab handleClick={handleLinksClick} icon={icons.links} />
          </li>
          <li>
            <Tab handleClick={handleProfileClick} icon={icons.profile} />
          </li>
        </ul>
      </nav>
      <Button id='nav-preview-btn' variant='secondary'>
        <PreviewIconHeader />
      </Button>
    </header>
  )
}

export default Component;