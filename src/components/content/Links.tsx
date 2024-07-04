import DragAndDropIcon from '../icons/DragAndDropIcon';
import Dropdown from '../UI/Dropdown/index';
import TextInputWithIcon from '../UI/TextInputWithIcon';
import { icons } from '../../config/index';

const Component: React.FC<{ linksArr: Array<number>, setLinksArr: React.Dispatch<[]>, setIsFirstLinkAdded: React.Dispatch<boolean> }> = ({ linksArr, setLinksArr, setIsFirstLinkAdded }) => {
  const isError = false;
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btnEL = e.target as HTMLButtonElement;
    const foundLink = linksArr.find(linkId => linkId === parseInt(btnEL.id));
    const filteredArr: any = linksArr.filter(linkId => linkId !== foundLink);
    setLinksArr(filteredArr);
    if (filteredArr.length < 1) {
      setIsFirstLinkAdded(false);
    }
  }

  return (
    <div id='links' className='mt-6'>
      <ul className='space-y-6'>
        {
          linksArr.map((linkId, idx) => {
            return (
              <li key={linkId} className='p-5 space-y-3'>
                <div className='flex justify-between text-grey-300'>
                  <div className='flex items-center gap-x-2'>
                    <DragAndDropIcon />
                    <span className='font-bold'>Link #{idx + 1}</span>
                  </div>
                  <button id={linkId.toString()} onClick={handleClick}>Remove</button>
                </div>

                <div>
                  <label htmlFor="platform-selection" className="text-grey-400 text-sm">
                    Platform
                  </label>
                  <Dropdown />
                </div>

                <div>
                  <label htmlFor="link" className="text-grey-400 text-sm">
                    Link
                  </label>
                  <TextInputWithIcon id='link' name='link' type='url' autocomplete='url' isError={isError} icon={icons.link} placeholder='e.g https://www.github.com/al-khawarizmi' />
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>   
  )
}

export default Component;