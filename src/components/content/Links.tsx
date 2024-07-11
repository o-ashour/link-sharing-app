import DragAndDropIcon from '../icons/DragAndDropIcon';
import Dropdown from '../UI/Dropdown/index';
import TextInputWithIcon from '../UI/TextInputWithIcon';
import { icons } from '../../config/index';
import { useState } from 'react';
import { LinkShareSupportedPlatforms } from '../../config/index';

const Component: React.FC<{
  linksArr: any[], setLinksArr: React.Dispatch<React.SetStateAction<[] | {
    id: number;
    platform: LinkShareSupportedPlatforms;
    url: string;
    status: { isError: boolean, message: string };
  }[]>>, setIsFirstLinkAdded: React.Dispatch<boolean> }> = ({ linksArr, setLinksArr, setIsFirstLinkAdded }) => {

  // shouldn't have styling changed for same slot
  const [isExpand, setIsExpand] = useState(false);
  const [targetId, setTargetId] = useState('');
  const [draggedLinkId, setDraggedLinkId] = useState(0)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btnEL = e.target as HTMLButtonElement;
    const foundLink = linksArr.find(link => link.id === parseInt(btnEL.id));
    const filteredArr: any = linksArr.filter(link => link !== foundLink);
    setLinksArr(filteredArr);
    if (filteredArr.length < 1) {
      setIsFirstLinkAdded(false);
    }
  }

  const handleDragStart = (e: React.DragEvent, linkId: number) => {
    e.dataTransfer.setData("linkId", linkId.toString());
    setDraggedLinkId(linkId);
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropzoneLinkId: number | string) => {
    const draggedLinkId = e.dataTransfer.getData("linkId");

    setLinksArr(prevVal => {
      const arr = [...prevVal];
      const draggedLink = arr.find(link => link.id == parseInt(draggedLinkId));

      if (dropzoneLinkId === 'top-dropzone') {
        draggedLink && arr.splice(0, 0, draggedLink);
        const filteredArr = arr.filter((link, idx) => (link !== draggedLink) || (idx === 0));
        return filteredArr;
      } else {
        const dropzoneLinkIdx = arr.findIndex(link => link.id == dropzoneLinkId);
        draggedLink && arr.splice(dropzoneLinkIdx + 1, 0, draggedLink);
        const filteredArr = arr.filter((link, idx) => (link !== draggedLink) || (idx === dropzoneLinkIdx + 1));
        return filteredArr;
      }
    })
    setIsExpand(false);
  }

  const handleDragOver = (e: any) => {
    e.preventDefault();
    const targetIdx = linksArr.findIndex(link => link.id == e.target.id)
    const draggedLinkIdx = linksArr.findIndex(link => link.id === draggedLinkId);
  
    if (draggedLinkId !== parseInt(e.target.id) && ((draggedLinkIdx - 1) !== targetIdx)) {
      setIsExpand(true);
    } else {
      setIsExpand(false);
    }

    if (targetId !== e.target.id) {
      setTargetId(e.target.id)
    }
  }

  const handleDragLeave = () => {
    setIsExpand(false);
  }

  const handleChange = (e: any) => {
    const linkIdx = linksArr.findIndex(link => link.id == e.target.id) 
    setLinksArr(prevVal => {
      const arr = [...prevVal];
      arr[linkIdx].url = e.target.value;
      arr[linkIdx].status = { isError: false, message: '' };
      return arr;
    })
  }

  return (
    <div id='links' className='mt-6'>
      <ul className='space-y-6'>
        <div id='top-dropzone' onDragOver={handleDragOver} className='w-full h-6 absolute' onDrop={(e, id = 'top-dropzone') => handleDrop(e, id)} onDragLeave={handleDragLeave} />
        {
          targetId == 'top-dropzone' && isExpand &&
          <div className='transition ease-in w-full h-12' />
        }
        {
          linksArr.map((link, idx) => {
            return (
              <div key={link.id} className=''>
                <li className='p-5 space-y-3' draggable onDragStart={(e) => handleDragStart(e, link.id)}>
                  <div className='flex justify-between text-grey-300'>
                    <div className='flex items-center gap-x-2'>
                      <DragAndDropIcon />
                      <span className='font-bold'>Link #{idx + 1}</span>
                    </div>
                    {/* change below to linkId to avoid confusion */}
                    <button id={link.id} onClick={handleClick}>Remove</button>
                  </div>

                  <div>
                    <label htmlFor="platform-selection" className="text-grey-400 text-sm">
                      Platform
                    </label>
                    <Dropdown linkId={link.id} setLinksArr={setLinksArr} />
                  </div>

                  <div>
                    <label htmlFor="link" className="text-grey-400 text-sm">
                      Link
                    </label>
                    <TextInputWithIcon id={link.id.toString()} value={link.url} name='link' type='url' autocomplete='url' isError={link.status.isError} icon={icons.link} handleChange={handleChange} placeholder='e.g https://www.github.com/al-khawarizmi' />
                  </div>
                </li>
                <div id={link.id} onDragOver={handleDragOver} className='w-full h-12 absolute' onDrop={(e, id=link.id) => handleDrop(e, id)} onDragLeave={handleDragLeave}/>
                {
                  targetId == link.id && isExpand &&
                  <div className='w-full h-12' /> 
                }
              </div>
            )
          })
        }
      </ul>
    </div>   
  )
}

export default Component;