import LogoSmall from '../logo/LogoSmall';
import Tab from '../UI/Tab';
import { icons } from '../../config/index';
import Button from '../UI/Button';
import PreviewIconHeader from '../icons/PreviewIconHeader';

const Component: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 pl-6">
      <div className="flex-none">
        <LogoSmall />
      </div>
      <nav className="flex-2">
        <ul className='flex'>
          <li>
            <Tab icon={icons.links} />
          </li>
          <li>
            <Tab icon={icons.profile} />
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